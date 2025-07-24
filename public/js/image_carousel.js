(jQuery)(function ($) {
    //  Responsive layout, resizing the items
    $('.image-carousel').each(function () {
        var dots = false;
        var auto = $(this).data('play') == '1';
        var timeoutDuration = $(this).data('timeout');
        var navigation = $(this).data('navigation') == '1';
        var nav_type = $(this).data('nav-type');
        
        if(nav_type == 'bullets'){
            navigation = false;
            dots = true;
        }

        $(this).owlCarousel({
            items: 6,
            loop: true,
            margin: 30,
            responsiveClass: true,
            mouseDrag: true,
            dots: dots,
            responsive: {
                0: {
                    items: 2,
                    nav: navigation,
                    loop: true,
                    autoplay: auto,
                    autoplayTimeout: timeoutDuration,
                    autoplayHoverPause: true,
                    responsiveClass: true,
                    dots: dots
                },
                600: {
                    items: 3,
                    nav: navigation,
                    loop: true,
                    autoplay: auto,
                    autoplayTimeout: timeoutDuration,
                    autoplayHoverPause: true,
                    responsiveClass: true,
                    dots: dots
                },
                1000: {
                    items: 6,
                    nav: navigation,
                    loop: true,
                    autoplay: auto,
                    autoplayTimeout: timeoutDuration,
                    autoplayHoverPause: true,
                    responsiveClass: true,
                    mouseDrag: true,
                    dots: dots
                }
            }
        });
        
    });
});