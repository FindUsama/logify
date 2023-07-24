"use strict";

(function() {
    var pot = {};
    //bind document ready
    var windowLoad = window.onload;
    window.onload = function(e) {
        windowLoad();
        console.log("booting request candidate form");
    };

    var els = {
        submitButton: ".requestCandidate-btn",
        form: ".j-request-candidates-form",
    };

    $(".requestCandidate-btn").on("click", function(e) {
        e.preventDefault();
        // Validation Logic of Form
        var formElements = $("input.form-control");
        if (!formElements[0].checkValidity()) {
            // formElements[0].setCustomValidity("This field is required");
            formElements[0].reportValidity();
            formElements[0].focus();
            return;
        }
        if (!formElements[1].checkValidity()) {
            formElements[1].reportValidity();
            formElements[1].focus();
            return;
        }

        $(this).addClass("sending");
        onContactFormSubmit(els.form);
    });

    /**
     * Handles contact form submission
     *
     */
    function onContactFormSubmit(form) {
        var request = new XMLHttpRequest();
        var form = $(form);
        var submitUrl = form[0].action;
        var elements = form[0].elements;

        request.onreadystatechange = function() {
            if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
                $(".requestCandidate-btn").removeClass("sending");
                $(".requestCandidate-btn").html("&#10004;");
                var currentURL = window.location.pathname;
                if (currentURL.indexOf("landing") >= 0) {
                    currentURL = currentURL.split("/");
                    currentURL = currentURL
                        .filter(function(v) {
                            return v !== "" && v !== "landing";
                        })
                        .join("+");
                    window.location.replace("/contact/exit/success/?landing=" + currentURL + "&source=requestCandidateCTA");
                } else if (currentURL.indexOf("/design") >= 0) {
                    currentURL = currentURL.split("/");
                    currentURL = currentURL
                        .filter(function(v) {
                            return v !== "";
                        })
                        .join("+");
                    window.location.replace("/contact/exit/success/?landing=" + currentURL + "&source=getAQuote");
                } else {
                    window.location.replace("/contact/exit/success/?utm_source=punch-staffing");
                }
                // window.location.replace('/contact/exit/success/');
            }
        };

        var params = [].filter
            .call(elements, function(el) {
                return el.type !== "radio" || el.checked;
            })
            .filter(function(el) {
                return !!el.name || !!el.value;
            })
            .map(function(el) {
                return encodeURIComponent(el.name) + "=" + encodeURIComponent(el.value);
            })
            .join("&");

        request.open("POST", submitUrl);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(params);
    }
})();