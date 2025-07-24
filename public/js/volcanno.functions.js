"use strict";
/*
 * PIXEL INDUSTRY FUNCTIONS FILE
 * 
 * Includes functions necessary for proper theme work and some helper functions.
 * 
 */


var VolcannoFunctions = {
    /**
     * Function to check is user is on touch device
     * 
     * @returns {Boolean} true/false
     */
    isTouchDevice: function () {
        if (Modernizr) {
            return Modernizr.touch || ((navigator.userAgent.match(/iPad/i)) && (navigator.userAgent.match(/iPad/i) != null)
                    || (navigator.userAgent.match(/Android/i)) && (navigator.userAgent.match(/Android/i) != null)
                    || (navigator.userAgent.match(/BlackBerry/i)) && (navigator.userAgent.match(/BlackBerry/i) != null)
                    || (navigator.userAgent.match(/iemobile/i)) && (navigator.userAgent.match(/iemobile/i) != null));
        } else {
            // first part for most browsers, second for ie10
            return (!!('ontouchstart' in window) || !!(window.navigator.msMaxTouchPoints) || ((navigator.userAgent.match(/iPad/i)) && (navigator.userAgent.match(/iPad/i) != null)
                    || (navigator.userAgent.match(/Android/i)) && (navigator.userAgent.match(/Android/i) != null)
                    || (navigator.userAgent.match(/BlackBerry/i)) && (navigator.userAgent.match(/BlackBerry/i) != null)
                    || (navigator.userAgent.match(/iemobile/i)) && (navigator.userAgent.match(/iemobile/i) != null)));
        }

    },
    /**
     * Function that animates static header
     * 
     * @param {int} position current position e.g. is menu static = 1, or not = 0
     * @returns void
     */
    set_static_header: function (position) {
        if (VolcannoConfig.staticHeader == '0')
            return;

        if (position > 0) {
            if (!(jQuery("#header-wrapper").hasClass("static"))) {
                jQuery("#header-wrapper").addClass("static");
                header_height = jQuery("#header-wrapper").height();
                if (jQuery('body').hasClass('home')) {
                    jQuery('.tp-wrapper').css("margin-top", header_height + "px");
                } else {
                    jQuery("#page-title").eq(0).css("margin-top", header_height + "px");
                }
            }

        } else {
            if ((jQuery("#header-wrapper").hasClass("static"))) {
                jQuery("#header-wrapper").removeClass("static");
                if (jQuery('body').hasClass('home')) {
                    jQuery('.tp-wrapper').css("margin-top", "");
                } else {
                    jQuery("#page-title").eq(0).css("margin-top", "");
                }
                jQuery("#header-wrapper").css("top", 0);
            }
        }
    },
    /**
     * Set static footer when there isn't enough content on page
     * 
     * @returns void
     */
    setStaticFooter: function () {
        if (jQuery(window).height() > jQuery('body').height()) {
            jQuery('.footer-wrapper').addClass('static');
        }
    },
    /**
     * Function that initialize jPlayer
     * 
     * @param {string} encoded Urls object with encoded urls to audio files
     * @param {string} swfPath Path to SWF file
     * @returns void
     */
    audioPostInit: function (encodedUrls, swfPath) {
        jQuery("#jquery_jplayer_1").jPlayer({
            ready: function () {
                jQuery(this).jPlayer("setMedia", encodedUrls);
            },
            swfPath: swfPath,
            supplied: "m4a, oga",
            wmode: "window"
        });
    },
    /**
     * Function that initialize slider on Gallery post format
     * 
     * @param {Boolean} manualAdvance Manual advance
     * @param {int} pauseTime Pause time in milisecond
     * @returns void
     */
    gallery_post_slider: function (manualAdvance, pauseTime, controlNav, directionNav) {

        // default values
        manualAdvance = typeof manualAdvance !== 'undefined' ? manualAdvance : false;
        pauseTime = typeof pauseTime !== 'undefined' ? pauseTime : 3000;
        controlNav = typeof controlNav !== 'undefined' ? controlNav : false;
        directionNav = typeof directionNav !== 'undefined' ? directionNav : false;

        jQuery('.blog-slider').nivoSlider({
            manualAdvance: manualAdvance,
            pauseTime: pauseTime,
            controlNav: controlNav,
            directionNav: directionNav,
            afterLoad: function () {
                if (jQuery('.blog-posts.masonry').length > 0) {
                    var $blogmasonry = jQuery('.blog-posts.masonry');
                    // initialize isotope
                    $blogmasonry.isotope({
                        masonry: {
                            columnWidth: 1,
                            isResizable: true
                        }
                    });
                }
            }
        });
    },
    /*
     * Helper functions for creating cookies
     * 
     * @param {string} name
     * @param {string} value
     * @param {int} days
     * @returns {void}
     */

    createCookie: function (name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    /*
     * Helper functions for reading cookies
     * 
     * @param {string} name 
     * @returns {null}
     */
    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    },
    /*
     * 
     * @param {string} name
     * @returns {void}
     */
    eraseCookie: function (name) {
        this.createCookie(name, "", -1);
    },
    retinaTest: function (cookieName) {

        // check if device pixel ratio cookie is set
        if (!VolcannoFunctions.readCookie(cookieName)
                && 'devicePixelRatio' in window
                && window.devicePixelRatio > 1
                && VolcannoConfig.retina == '1') {

            // create cookie
            VolcannoFunctions.createCookie(cookieName, '2', 7);

            // reload the page
            window.location.reload();

        } else if (VolcannoFunctions.readCookie(cookieName) && window.devicePixelRatio == 1) {

            // remove the cookie
            VolcannoFunctions.eraseCookie(cookieName);

            // reload the page
            window.location.reload();
        }
    }
}