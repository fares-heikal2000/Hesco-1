 (function ($) {
    'use strict';

    // :: 1.0 Owl Carousel Active Code
    if ($.fn.owlCarousel) {
        $(".welcome_slides").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 1500,
            nav: true,
            navText: ["<i class='pe-7s-angle-left'</i>", "<i class='pe-7s-angle-right'</i>"]
        });
        $(".app_screenshots_slides").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 800,
            margin: 30,
            center: true,
            dots: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 3
                },
                992: {
                    items: 5
                }
            }
        });
    }
     // :: 2.0 Slick Active Code
    if ($.fn.slick) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,
            asNavFor: '.slider-for',
            dots: true,
            centerMode: true,
            focusOnSelect: true,
            slide: 'div',
            autoplay: true,
            centerMode: true,
            centerPadding: '30px',
            mobileFirst: true,
            prevArrow: '<i class="fa fa-angle-left"></i>',
            nextArrow: '<i class="fa fa-angle-right"></i>'
        });
    }


    // Smooth scrolling using jQuery easing
	  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function() {
	    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: (target.offset().top - 54)
	        }, 1000, "easeInOutExpo");
	        return false;
	      }
	    }
	});

	// :: 7.0 Magnific-popup Video Active Code
    if ($.fn.magnificPopup) {
        $('.video_btn').magnificPopup({
            disableOn: 0,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    }

	// :: Testimonial Code


    var $window = $(window);
    // if ($window.width() > 767) {
    //     new WOW().init();
    // }
 	// :: 8.0 Sticky Active Code
    $window.on('scroll', function () {
        if ($window.scrollTop() > 20) {
            $('.main-header').addClass('sticky slideInDown');
        } else {
            $('.main-header').removeClass('sticky slideInDown');
        }
    });

    // :: 9.0 Preloader Active code
    $window.on('load', function () {
        $('.main-wrapper').fadeIn('slow');
        $('.ozient-folding-cube').fadeOut(3000, function () {
            $('#preloader').remove();
        });
    });

})(jQuery); 

let btn = document.getElementById("btn0");

btn.addEventListener("click", function (e) {
    e.preventDefault()
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    let body = 'name: '+name +'<br> email: '+ email +'<br> subject: ' + subject + '<br> message: ' + message

    Email.send({
    Host : "smtp.gmail.com",
    Username : "e2xhcompany@gmail.com",
    Password : "asnflybfaizacntk",
    To : 'e2xhcompany@gmail.com',
    From : email,
    Subject : subject,
    Body : body
    }).then(
     message => alert(message)
    );
})



document.addEventListener("DOMContentLoaded", function () {

    // Initialize every partners section independently
    const sections = document.querySelectorAll(".success-partners");

    sections.forEach(function (section) {

        const track = section.querySelector(".partners-track");
        const prevButton = section.querySelector(".partners-prev");
        const nextButton = section.querySelector(".partners-next");
        const dotsContainer = section.querySelector(".partners-dots");
        const carousel = section.querySelector(".partners-carousel");

        // Prevent errors if a section is missing required elements
        if (!track || !prevButton || !nextButton || !dotsContainer || !carousel) {
            return;
        }

        const originalCards = Array.from(
            track.querySelectorAll(".partner-card")
        );

        const totalPartners = originalCards.length;

        if (totalPartners === 0) return;

        let currentIndex = 0;
        let autoSlide = null;
        let isTransitioning = false;

        // Clone the first 5 cards for continuous movement
        const cloneCount = Math.min(5, totalPartners);

        originalCards.slice(0, cloneCount).forEach(function (card) {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
        });

        // Calculate one card's movement distance
        function getSlideSize() {
            const card = track.querySelector(".partner-card");

            if (!card) return 0;

            const cardWidth = card.getBoundingClientRect().width;
            const trackStyle = window.getComputedStyle(track);
            const gap = parseFloat(trackStyle.columnGap) ||
                        parseFloat(trackStyle.gap) || 0;

            return cardWidth + gap;
        }

        // Move this section's carousel
        function moveCarousel(animate = true) {
            const slideSize = getSlideSize();

            if (!slideSize) return;

            track.style.transition = animate
                ? "transform 0.7s ease"
                : "none";

            track.style.transform =
                `translateX(-${currentIndex * slideSize}px)`;

            updateDots();
        }

        // Create navigation dots for original cards only
        dotsContainer.innerHTML = "";

        originalCards.forEach(function (_, index) {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.classList.add("partner-dot");
            dot.setAttribute(
                "aria-label",
                "Go to partner " + (index + 1)
            );

            dot.addEventListener("click", function () {
                currentIndex = index;
                isTransitioning = false;
                moveCarousel(true);
                restartAutoSlide();
            });

            dotsContainer.appendChild(dot);
        });

        function updateDots() {
            const dots = dotsContainer.querySelectorAll(".partner-dot");
            const activeIndex = currentIndex % totalPartners;

            dots.forEach(function (dot, index) {
                dot.classList.toggle("active", index === activeIndex);
            });
        }

        // Next slide
        function nextSlide() {
            if (isTransitioning) return;

            isTransitioning = true;
            currentIndex++;

            moveCarousel(true);
        }

        // Previous slide
        function previousSlide() {
            if (isTransitioning) return;

            if (currentIndex <= 0) {
                // Jump to the matching cloned position without animation
                currentIndex = totalPartners;
                moveCarousel(false);

                // Force the browser to apply the reset before moving
                track.offsetHeight;

                currentIndex--;
                isTransitioning = true;
                moveCarousel(true);
            } else {
                currentIndex--;
                isTransitioning = true;
                moveCarousel(true);
            }
        }

        // Handle the end of an animated movement
        track.addEventListener("transitionend", function (event) {
            if (event.propertyName !== "transform") return;

            if (currentIndex >= totalPartners) {
                currentIndex = 0;
                moveCarousel(false);
            }

            isTransitioning = false;
        });

        // Navigation buttons
        nextButton.addEventListener("click", function () {
            nextSlide();
            restartAutoSlide();
        });

        prevButton.addEventListener("click", function () {
            previousSlide();
            restartAutoSlide();
        });

        // Automatic movement
        function startAutoSlide() {
            clearInterval(autoSlide);

            autoSlide = setInterval(function () {
                nextSlide();
            }, 2000);
        }

        function restartAutoSlide() {
            startAutoSlide();
        }

        // Pause when the pointer is over this carousel
        carousel.addEventListener("mouseenter", function () {
            clearInterval(autoSlide);
        });

        carousel.addEventListener("mouseleave", function () {
            startAutoSlide();
        });

        // Recalculate after resizing
        window.addEventListener("resize", function () {
            moveCarousel(false);
        });

        // Initialize this section
        moveCarousel(false);
        startAutoSlide();

    });

});



