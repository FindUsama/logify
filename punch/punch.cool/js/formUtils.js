'use strict';
(function() {
    var context = {}; //maintain context for handlers

    /**
   }
   * Manages events on the page.
   * @constructor
   *
   * Usage: handlerConfig = [{selector: "someSelector",
 *  event: "mousedown",
  * func: handlerFunction}]
   *
   * validationConfig = [{
 * selector: "inputSelector",
 * validator: validatorFunction,
 * errorSelector: "selectorForErrorTarget", <- optional
 * errorClass: "", <- optional
 * errorMessage: "Error Message" <- optional
 * }]
   */
    function FormUtils(nameSpace, validationConfig, handlerConfig) {
        var isValid = true;

        if (nameSpace === '') {
            isValid = false;
        }

        //must have one or both
        if (validationConfig === undefined && handlerConfig === undefined) {
            isValid = false;
        } else if (handlerConfig !== undefined &&
            !isValidHandlers(handlerConfig)) {
            isValid = false;
        } else if (validationConfig !== undefined &&
            !isValidValidators(validationConfig)) {
            isValid = false;
        }

        if (isValid) {
            context[nameSpace] = {
                validators: validationConfig,
                handlerConfig: handlerConfig,
            };
        } else {
            errorLog('FormUtils Config rejected.');
        }
    }

    function isValidHandlers(handlerConfig) {
        var i = 0;
        var result = true;
        for (; i < handlerConfig.length; i++) {

            if (handlerConfig[i].selector === undefined ||
                handlerConfig[i].event === undefined ||
                handlerConfig[i].func === undefined) {
                result = false;
                break;
            }
        }
        return result;
    }

    function isValidValidators(validatorConfig) {
        var i = 0;
        var result = true;
        for (; i < validatorConfig.length; i++) {

            if (validatorConfig[i].selector === undefined ||
                validatorConfig[i].validator === undefined) {
                result = false;
                break;
            }
        }
        return result;
    }

    /**
     * Reads handlerConfig and binds events
     */
    FormUtils.bindEvents = function(nameSpace) {
        var i = 0;
        var tempEl = {};
        var handlerConfig = context[nameSpace] && context[nameSpace].handlerConfig;

        if (!handlerConfig) {
            errorLog('NameSpace ' + nameSpace + ' not found. Bindings aborted');
            return;
        }

        for (; i < handlerConfig.length; i++) {

            tempEl = document.querySelector(handlerConfig[i].selector);

            if (tempEl && tempEl.addEventListener) {
                tempEl.addEventListener(handlerConfig[i].event,
                    handlerConfig[i].func);
            } else {
                errorLog('Bind failed for ' + handlerConfig[i].selector);
            }

        }
        tempEl = null;
    };

    /**
     * @param nameSpace of the form to be validated
     *
     * Finds the selector in the validators and runs the validation.
     */
    FormUtils.releaseEvents = function(nameSpace) {
        var i = 0;
        var tempEl = {};
        var handlerConfig = context[nameSpace] && context[nameSpace].handlerConfig;

        if (!handlerConfig) {
            errorLog('NameSpace ' + nameSpace + ' not found. Bindings aborted');
            return;
        }

        for (; i < handlerConfig.length; i++) {

            tempEl = document.querySelector(handlerConfig[i].selector);
            tempEl.removeEventListener(handlerConfig[i].event,
                handlerConfig[i].func);
        }
        errorLog('Event Listeners removed for nameSpace ' + nameSpace);
        tempEl = null;
    };

    FormUtils.validateOne = function(nameSpace, selector) {
        if (selector === '' || selector === undefined) {
            errorLog('ValidateOne nees a selector');
            return null;
        }

        var validatorConfig = getValidatorByNameSpace(nameSpace);
        if (validatorConfig === undefined) {
            return;
        }

        var i = 0;
        var isValid;
        for (; i < validatorConfig.length; i++) {

            if (validatorConfig[i].selector === selector) {
                isValid = validatorConfig[i].validator(
                    document.querySelector(validatorConfig[i].selector));
                if (!isValid) {
                    addErrorWarning(validatorConfig[i]);
                } else {
                    removeErrorWarning(validatorConfig[i]);
                }
                break;
            }
        }
        return isValid;
    };

    FormUtils.validateAll = function(nameSpace) {
        var validatorConfig = getValidatorByNameSpace(nameSpace);
        if (validatorConfig === undefined) {
            return;
        }

        var i = 0;
        var isValid = true;
        var isFormValid = true;
        for (; i < validatorConfig.length; i++) {
            isValid = validatorConfig[i].validator(
                document.querySelector(validatorConfig[i].selector));
            if (!isValid) {
                addErrorWarning(validatorConfig[i]);
            } else {
                removeErrorWarning(validatorConfig[i]);
            }
            isFormValid = isFormValid && isValid;
        }
        return isFormValid;
    };

    FormUtils.isValidForm = function(nameSpace) {
        var validatorConfig = getValidatorByNameSpace(nameSpace);
        if (validatorConfig === undefined) {
            return;
        }
        var i = 0;
        var isValid = true;
        var isFormValid = true;
        for (; i < validatorConfig.length; i++) {
            isValid = validatorConfig[i].validator(
                document.querySelector(validatorConfig[i].selector));
            isFormValid = isFormValid && isValid;
        }
        return isFormValid;
    };

    FormUtils.resetFormErrors = function(nameSpace) {
        var validatorConfig = getValidatorByNameSpace(nameSpace);
        if (validatorConfig === undefined) {
            return;
        }
        var i = 0;
        var tempEl = {};
        for (; i < validatorConfig.length; i++) {
            tempEl = document.querySelector(validatorConfig[i].errorSelector);
            tempEl.innerHTML = '';
            tempEl.className = tempEl.replace ?
                tempEl.replace(validatorConfig[i].errorClass, '') : '';
            tempEl = document.querySelector(validatorConfig[i].selector);
            tempEl.className = tempEl.replace ?
                tempEl.replace(validatorConfig[i].errorClass, '') : '';
        }
        tempEl = null;
    };

    function getValidatorByNameSpace(nameSpace) {
        var validatorConfig = context[nameSpace] &&
            context[nameSpace].validators;

        if (!validatorConfig) {
            errorLog('NameSpace ' + nameSpace + ' not found. Validation aborted');
            return undefined;
        }
        return validatorConfig;
    }

    /**
     *
     * @param validator config object
     *
     * Adds a warning message to the error Element and adds a class
     * to that element if errorSelector exists
     * otherwise if no selector and errorClass exists
     * it adds the errorClass to the input target
     */
    function addErrorWarning(validator) {
        var tempEl = {};

        if (validator.errorSelector) {
            tempEl = document.querySelector(validator.errorSelector);

            if (validator.errorMessage) {
                tempEl.innerHTML = validator.errorMessage;
            }

            if (validator.errorClass) {
                tempEl.className = tempEl.replace ?
                    tempEl.replace(validator.errorClass, '') : '';
                tempEl.className = tempEl.className + ' ' + validator.errorClass;
            }
        } else if (!validator.errorSelector && validator.errorClass) {
            tempEl = document.querySelector(validator.selector);
            tempEl.className = tempEl.replace ?
                tempEl.replace(validator.errorClass, '') : '';
            tempEl.className = tempEl.className + ' ' + validator.errorClass;
        }
        tempEl = null;
    }

    function removeErrorWarning(validator) {
        var tempEl = {};
        if (validator.errorSelector) {
            tempEl = document.querySelector(validator.errorSelector);
            tempEl.innerHTML = '';
        }

        if (validator.errorClass) {
            tempEl.className = tempEl.replace ?
                tempEl.replace(validator.errorClass, '') : '';
            tempEl = document.querySelector(validator.selector);
            tempEl.className = tempEl.replace ?
                tempEl.replace(validator.errorClass, '') : '';
        }
        tempEl = null;
    }

    function errorLog(msg) {
        if (window.debugFormValidator) {
            console.log(msg);
        }
    }

    window.FormUtils = FormUtils;
})();