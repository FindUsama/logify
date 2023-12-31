/**
 * jquery.cbpQTRotator.min.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function(c, b, e) {
    var d = b.Modernizr;
    c.CBPQTRotator = function(f, g) {
        this.$el = c(g);
        this._init(f)
    };
    c.CBPQTRotator.defaults = {
        speed: 700,
        easing: "ease",
        interval: 8000
    };
    c.CBPQTRotator.prototype = {
        _init: function(f) {
            this.options = c.extend(true, {}, c.CBPQTRotator.defaults, f);
            this._config();
            this.$items.eq(this.current).addClass("cbp-qtcurrent");
            if (this.support) {
                this._setTransition()
            }
            this._startRotator()
        },
        _config: function() {
            this.$items = this.$el.children("div.cbp-qtcontent");
            this.itemsCount = this.$items.length;
            this.current = 0;
            this.support = d.csstransitions;
            if (this.support) {
                this.$progress = c('<span class="cbp-qtprogress"></span>').appendTo(this.$el)
            }
        },
        _setTransition: function() {
            setTimeout(c.proxy(function() {
                this.$items.css("transition", "opacity " + this.options.speed + "ms " + this.options.easing)
            }, this), 25)
        },
        _startRotator: function() {
            if (this.support) {
                this._startProgress()
            }
            setTimeout(c.proxy(function() {
                if (this.support) {
                    this._resetProgress()
                }
                this._next();
                this._startRotator()
            }, this), this.options.interval)
        },
        _next: function() {
            this.$items.eq(this.current).removeClass("cbp-qtcurrent");
            this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
            this.$items.eq(this.current).addClass("cbp-qtcurrent")
        },
        _startProgress: function() {
            setTimeout(c.proxy(function() {
                this.$progress.css({
                    transition: "width " + this.options.interval + "ms linear",
                    width: "100%"
                })
            }, this), 25)
        },
        _resetProgress: function() {
            this.$progress.css({
                transition: "none",
                width: "0%"
            })
        },
        destroy: function() {
            if (this.support) {
                this.$items.css("transition", "none");
                this.$progress.remove()
            }
            this.$items.removeClass("cbp-qtcurrent").css({
                position: "relative",
                "z-index": 100,
                "pointer-events": "auto",
                opacity: 1
            })
        }
    };
    var a = function(f) {
        if (b.console) {
            b.console.error(f)
        }
    };
    c.fn.cbpQTRotator = function(g) {
        if (typeof g === "string") {
            var f = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var h = c.data(this, "cbpQTRotator");
                if (!h) {
                    a("cannot call methods on cbpQTRotator prior to initialization; attempted to call method '" + g + "'");
                    return
                }
                if (!c.isFunction(h[g]) || g.charAt(0) === "_") {
                    a("no such method '" + g + "' for cbpQTRotator instance");
                    return
                }
                h[g].apply(h, f)
            })
        } else {
            this.each(function() {
                var h = c.data(this, "cbpQTRotator");
                if (h) {
                    h._init()
                } else {
                    h = c.data(this, "cbpQTRotator", new c.CBPQTRotator(g, this))
                }
            })
        }
        return this
    }
})(jQuery, window);