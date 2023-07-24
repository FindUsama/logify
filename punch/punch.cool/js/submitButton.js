(function() {
    //provides an external interface to control one or more animated submit
    //buttons
    // include button via metalmesh {{>shared/animated_submit_button}}
    //JS Usage: punchAnimatedSubmit(timerCheck) =>
    // {clicked: func(contractedWidth), complete: func}
    // contractedWidth is used to determine when the contraction is complete.
    //this width defaults to 60px;
    // Timer may be changed defaults to 30ms

    var contractedWidth = 60;
    var widthCheckTime = 30;
    var widthChecker = function() {};

    var els = {
        'button': '#punchButtonAnimated',
        'spinner': '#punchSpinnerAnimated'
    };

    var classes = {
        clicked: 'clicked',
        completed: 'completed'
    };

    function PunchAnimatedSubmit(checkTime) {
        if (checkTime !== undefined) {
            widthCheckTime = checkTime;
        }
    }

    PunchAnimatedSubmit.clicked = function(width) {
        document.querySelector(els.button).classList.remove(classes.complete);
        document.querySelector(els.button).classList.add(classes.clicked);
        showSpinner(width || contractedWidth);
    };

    PunchAnimatedSubmit.complete = function() {
        var spinner = document.querySelector(els.spinner);
        spinner.style.opacity = '0';
        spinner.style.zIndex = '1';
        document.querySelector(els.button).classList.add(classes.completed);
    };

    function showSpinner(thisWidth) {
        var button = document.querySelector(els.button);
        var spinner = document.querySelector(els.spinner);

        widthChecker = setTimeout(function(width) {
            //if element has width
            if (button.offsetWidth === width) {
                spinner.style.zIndex = '3';
                spinner.style.opacity = '1';
                button = null;
                spinner = null;
            } else {
                showSpinner(thisWidth);
            }
        }.bind(undefined, thisWidth), widthCheckTime);
    }

    window.PunchAnimatedSubmit = PunchAnimatedSubmit;

})();