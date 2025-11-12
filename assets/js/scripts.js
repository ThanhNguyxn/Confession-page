/**
 * Main JavaScript for [YOUR_SITE_NAME] Confession Page
 * 
 * NOTE: The current implementation has inline JavaScript in the HTML files.
 * For production use, move all JavaScript initialization code here.
 * 
 * Load order requirements:
 * 1. Facebook SDK (keep minimal inline loader in HTML)
 * 2. jQuery (3.5.1)
 * 3. Bootstrap (4.6.2)
 * 4. Plugins (Slick, Magnific Popup, WOW.js)
 * 5. This file (custom initialization)
 */

(function($) {
    'use strict';

    // Document Ready
    $(document).ready(function() {
        
        // Initialize WOW.js for animations
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }

        // Preloader
        $(window).on('load', function() {
            $('.preloader').fadeOut('slow');
        });

        // Smooth scroll for page navigation
        $('a.page-scroll').on('click', function(event) {
            var $anchor = $(this);
            var href = $anchor.attr('href');
            
            // Check if it's an anchor link on the same page
            if (href.indexOf('#') !== -1) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: ($(href).offset().top - 80)
                }, 1250, 'easeInOutExpo');
            }
        });

        // Navbar scroll effect
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 200) {
                $('.navbar-area').addClass('sticky');
            } else {
                $('.navbar-area').removeClass('sticky');
            }
        });

        // Mobile menu toggle
        $('.navbar-toggler').on('click', function() {
            $(this).toggleClass('active');
        });

        // Close mobile menu on click
        $('.navbar-nav a').on('click', function() {
            $('.navbar-toggler').removeClass('active');
            $('.navbar-collapse').collapse('hide');
        });

        // Initialize Magnific Popup for images (if present)
        if ($.fn.magnificPopup) {
            $('.image-popup').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        }

        // Initialize Slick Slider (if present)
        if ($.fn.slick) {
            $('.confession-slider').slick({
                dots: true,
                arrows: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }

        // Form validation (confession submission)
        $('#confession-form').on('submit', function(e) {
            // Add custom validation logic here
            // e.preventDefault(); // Uncomment to prevent default submission for AJAX
        });

        // Track confession by code
        $('#track-form').on('submit', function(e) {
            // Add tracking logic here
            // e.preventDefault(); // Uncomment to prevent default submission for AJAX
        });

    });

    // Scroll to top button (if implemented)
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    $('.scroll-to-top').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

})(jQuery);
