(jQuery)(function ($) {
    "use strict";

    // MAIN NAVIGATION
    $('.nav .dropdown').hover(function () {
        $(this).find('ul:first').css({
            visibility: "visible",
            display: "none"
        }).fadeIn(300);
    }, function () {
        $(this).find('ul:first').css({
            display: "none"
        });
    });

    // RESPONSIVE NAVIGATION
    $(function () {
        var backLabel = VolcannoConfig.mobileMenuBackLabel;

        $('#dl-menu').dlmenu({
            animationClasses: {
                classin: 'dl-animate-in-2',
                classout: 'dl-animate-out-2'
            },
            backLabel : backLabel
        });
    });

    // SEARCH ANIMATION
    $('#header').on('click', '#search', function (e) {
        e.preventDefault();

        $(this).find('#m_search').fadeIn().focus();
    });

    $('#m_search').focusout(function (e) {
        $(e.target).fadeOut();
    });

    // SOLID HEADER  - TRANSPARENT HEADER
    function set_static_header(position) {

        var adminBarHeight = 0;

        if ($('#header').hasClass('header-style01')) {
            var header_height = $(".header-wrapper.header-transparent").height();

            if ($('body').hasClass('admin-bar')) {
                adminBarHeight = 32;
            }

            var mainNavMargin = adminBarHeight + 10;

            if (position > header_height) {
                $(".header-wrapper.header-transparent").addClass("solid-color").find('.header-style01 .main-nav').css('margin-top', mainNavMargin + 'px');
                $(".header-wrapper.header-transparent02").addClass("solid-color").find('.header-style01 .main-nav').css('margin-top', mainNavMargin + 'px');
            } else {
                $(".header-wrapper.header-transparent").removeClass("solid-color").find('.header-style01 .main-nav').css('margin-top', '35px');
                $(".header-wrapper.header-transparent02").removeClass("solid-color").find('.header-style01 .main-nav').css('margin-top', '35px');
            }

            var top_bar_height = $('#top-bar-wrapper').height();

            if (position > header_height) {
                $('.header-wrapper').css(
                        'top', -top_bar_height - 20
                        );
            } else {
                if ($('body').hasClass('admin-bar')) {
                    $('.header-wrapper').css('top', "32px");
                } else {
                    $('.header-wrapper').css('top', "0");
                }
            }
        }

        if ($('#header').hasClass('header-style02')) {
            var header_height = $(".header-style02").height();
            var top_bar_height = $('#top-bar-wrapper').height();

            if (position > header_height) {
                if ($('body').hasClass('admin-bar')) {
                    adminBarHeight = 32;
                }

                $('.header-wrapper').css(
                        'top', -top_bar_height - 20 + adminBarHeight
                        );
            } else {
                if ($('body').hasClass('admin-bar')) {
                    $('.header-wrapper').css('top', "32px");
                } else {
                    $('.header-wrapper').css('top', "0");
                }
            }
        }

        if ($('#header').hasClass('header-style03')) {
            var header_height = $(".header-wrapper").height();

            if ($('body').hasClass('admin-bar')) {
                adminBarHeight = 32;
            }

            if (position > header_height) {
                $('.header-wrapper').css(
                        'top', adminBarHeight
                        );
            } else {
                if ($('body').hasClass('admin-bar')) {
                    $('.header-wrapper').css('top', adminBarHeight);
                } else {
                    $('.header-wrapper').css('top', "0");
                }
            }
        }

    }

    if (!VolcannoFunctions.isTouchDevice() && VolcannoConfig.staticHeader == '1') {

        (function () {
            var window_y = $(document).scrollTop();
            if (window_y > 0) {
                set_static_header(1);
            } else {
                // HEADER POSITION ADJUSTMENT
                if ($('body').hasClass('admin-bar')) {
                    $('#header-wrapper').css('top', '30px');
                }
            }
        })();

        $(window).scroll(function () {
            var position = $(this).scrollTop();
            set_static_header(position);
        });

        $(window).resize(function () {
            var position = $(this).scrollTop();
            set_static_header(position);
        });

        var headerWrapperHeight = $('.header-wrapper').height();
        $('.header-wrapper').not('.header-transparent').next().css('margin-top', headerWrapperHeight);
        if ($('.header-wrapper').next('div[class^=page-title]').hasClass('page-title-style01') && $('.header-wrapper').hasClass('header-with-tb')){
            $('.header-wrapper').next('div[class^=page-title]').css('marginTop', 0).css('paddingTop', '235px');
        }else if ($('.header-wrapper').next('[class^=page-title]').hasClass('page-title-style01')) {
            $('.header-wrapper').next('div[class^=page-title]').css('marginTop', 0).css('paddingTop', '185px');
        }

    } else if (VolcannoConfig.staticHeader == '0') {

        if ($('.header-wrapper').next().hasClass('page-title-style01')) {
            $('.header-wrapper').addClass('solid-color not-static');
        }
    } else if (VolcannoFunctions.isTouchDevice() && VolcannoConfig.staticHeader == '1') {
        $('.header-wrapper').addClass('solid-color not-static');

    }


    // SCROLL TO TOP
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-up').fadeIn();
        } else {
            $('.scroll-up').fadeOut();
        }
    });

    $('.scroll-up').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


    // function to check is user is on touch device
    if (!VolcannoFunctions.isTouchDevice()) {

        // ANIMATED CONTENT
        if ($(".animated")[0]) {
            jQuery('.animated').css('opacity', '0');
        }

        var currentRow = -1;
        var counter = 1;

        if (VolcannoConfig.cmaActive == '1') {
            $('.triggerAnimation').waypoint(function () {
                var $this = $(this);
                var rowIndex = $('.row').index($(this).closest('.row'));
                if (rowIndex !== currentRow) {
                    currentRow = rowIndex;
                    $('.row').eq(rowIndex).find('.triggerAnimation').each(function (i, val) {
                        var element = $(this);
                        setTimeout(function () {
                            var animation = element.attr('data-animate');
                            element.css('opacity', '1');
                            element.addClass("animated " + animation);
                        }, (i * 250));
                    });

                }

                //counter++;

            },
                    {
                        offset: '80%',
                        triggerOnce: true
                    }
            );

            $('.post-timeline-item').waypoint(function () {
                var timeline_animation = $(this).attr('data-animate');
                $(this).css('opacity', '');
                $(this).addClass("animated " + timeline_animation);
            },
                    {
                        offset: '80%',
                        triggerOnce: true
                    }
            );
        }

    }

    // Static footer - when there isn't enough text on page
    VolcannoFunctions.setStaticFooter();

});

// retina test
(function () {
    var cookieName = VolcannoConfig.themeName + '_device_pixel_ratio';

    VolcannoFunctions.retinaTest(cookieName);
})();
