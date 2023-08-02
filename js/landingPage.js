'use strict';

(function() {
    var pot = {};
    //bind document ready
    var windowLoad = window.onload;
    window.onload = function(e) {
        windowLoad();
        bootContactForm();
        console.log('booting contact form');
        // chat with us form 
        // $('a.j-show-modal[data-target="#request-candidates"]').on('click',function(e){
        //   e.preventDefault();
        //   $('.content>.cta>.chat-group .chat[type=button]').trigger("click");
        // });
        var current_url = window.location.pathname;
        if (current_url.includes('landing')) {
            $('.announcement').hide();
            $('.header').css('margin-top', '0');
        }

        function chatText() {
            if ($(window).width() <= 560) {
                $('.content>.cta>.chat-group .chat[type=button]').text('');
            } else {
                $('.content>.cta>.chat-group .chat[type=button]').text('Chat with us');
            }
        }
        $(window).on('resize', function() {
            chatText();
        });
        chatText();
        $('.content>.cta.fixed>.primary').prepend('<span class="cwu_close_btn">&#10006;</span>');
        $('.content>.cta>.chat-group .chat[type=button]').on('click', function() {
            var window_width = window.innerWidth;
            // if(window_width >= 880){
            $(this).addClass('hide_chat_btn');
            $('.content>.cta.fixed>.primary').fadeIn();
            // }  
        });
        $('.cwu_close_btn').on('click', function() {
            var window_width = window.innerWidth;
            // if(window_width >= 880){
            $('.content>.cta.fixed>.primary').fadeOut();
            $('.content>.cta>.chat-group .chat[type=button]').removeClass('hide_chat_btn');
            // }
        });
    };
    var nameSpace = 'landingForm';

    var els = {
        submitButton: '.button-animated',
        form: '.form.crushed form'
    };

    //binding config
    var bindings = [{
        selector: els.submitButton,
        event: 'click',
        func: function(ev) {
            //on the fly validation
            var button = window.PunchAnimatedSubmit;
            var isValid = document.querySelector(els.form).reportValidity();
            isValid = isValid && pot.valid();

            if (isValid) {
                button.clicked(60);
                setTimeout(function() {
                    PunchAnimatedSubmit.complete();
                    setTimeout(function() {
                        onContactFormSubmit(document.querySelector(els.form));
                    }, 1000);
                }, 2500);
            }

        }
    }];

    function bootContactForm() {
        // window.debugFormValidator = true;
        FormUtils(nameSpace, undefined, bindings);
        FormUtils.bindEvents(nameSpace);
        pot = honey(document.querySelector(els.form))
    }

    /**
     * Handles contact form submission
     *
     */
    function onContactFormSubmit(form) {

        var request = new XMLHttpRequest();
        var submitUrl = form.action;
        var elements = form.elements;

        request.onreadystatechange = function() {
            if (request.readyState === 4 &&
                (request.status === 200 || request.status === 0)) {
                var currentURL = window.location.pathname;
                if (currentURL.indexOf("landing")) {
                    currentURL = currentURL.split('/');
                    currentURL = currentURL.filter(function(v) {
                        return v !== '' && v !== 'landing'
                    }).join("+");
                    window.location.replace('/contact/exit/success/?landing=' + currentURL + '&source=bottomRightChatBox');
                } else {
                    window.location.replace('/contact/exit/success/');
                }
            }
        };

        var params = [].filter.call(elements, function(el) {
            return el.type !== 'radio' || el.checked;
        }).filter(function(el) {
            return !!el.name || !!el.value;
        }).map(function(el) {
            return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
        }).join('&');

        request.open('POST', submitUrl);
        request.setRequestHeader('Content-type',
            'application/x-www-form-urlencoded');
        request.send(params);
    }
})();