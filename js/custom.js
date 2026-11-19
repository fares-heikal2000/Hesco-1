
console.log("SUCCESS PARTNERS JS IS RUNNING");

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



document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll(".success-partners");

    sections.forEach(function (section) {

        const track = section.querySelector(".partners-track");
        const prevButton = section.querySelector(".partners-prev");
        const nextButton = section.querySelector(".partners-next");
        const dotsContainer = section.querySelector(".partners-dots");
        const carousel = section.querySelector(".partners-carousel");

        if (!track || !prevButton || !nextButton ||
            !dotsContainer || !carousel) return;

        const originalCards = Array.from(
            track.querySelectorAll(".partner-card")
        );

        const totalPartners = originalCards.length;

        if (totalPartners <= 1) return;

        const visibleCards = 5;
        const cloneCount = Math.min(visibleCards, totalPartners);

        let currentIndex = cloneCount;
        let autoSlide;
        let isTransitioning = false;

        // Clone last cards and add them before originals
        const lastClones = originalCards
            .slice(-cloneCount)
            .map(card => {
                const clone = card.cloneNode(true);
                clone.setAttribute("aria-hidden", "true");
                return clone;
            });

        lastClones.forEach(clone => {
            track.insertBefore(clone, track.firstChild);
        });

        // Clone first cards and add them after originals
        originalCards.slice(0, cloneCount).forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
        });

        // Calculate card width + gap
        function getSlideSize() {
            const card = track.querySelector(".partner-card");

            if (!card) return 0;

            const cardWidth = card.getBoundingClientRect().width;
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.columnGap) || 0;

            return cardWidth + gap;
        }

        // Update dots
        function updateDots() {
            const dots = dotsContainer.querySelectorAll(".partner-dot");

            const activeIndex =
                ((currentIndex - cloneCount) % totalPartners
                + totalPartners) % totalPartners;

            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === activeIndex);
            });
        }

        // Move carousel
        function moveCarousel(animate = true) {

            const slideSize = getSlideSize();

            if (!slideSize) return;

            track.style.transition = animate
                ? "transform 0.7s ease"
                : "none";

            track.style.transform =
                `translate3d(-${currentIndex * slideSize}px, 0, 0)`;

            updateDots();
        }

        // Create navigation dots
        dotsContainer.innerHTML = "";

        originalCards.forEach((_, index) => {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "partner-dot";

            dot.setAttribute(
                "aria-label",
                "Go to partner " + (index + 1)
            );

            dot.addEventListener("click", function () {

                if (isTransitioning) return;

                currentIndex = index + cloneCount;

                moveCarousel(true);
                restartAutoSlide();
            });

            dotsContainer.appendChild(dot);
        });

        // Next button
        function nextSlide() {

            if (isTransitioning) return;

            isTransitioning = true;
            currentIndex++;

            moveCarousel(true);
        }

        // Previous button
        function previousSlide() {

            if (isTransitioning) return;

            isTransitioning = true;
            currentIndex--;

            moveCarousel(true);
        }

        // Handle infinite loop
        track.addEventListener("transitionend", function (event) {

            if (event.propertyName !== "transform") return;

            // Reached first cloned card
            if (currentIndex >= totalPartners + cloneCount) {

                currentIndex = cloneCount;
                moveCarousel(false);
            }

            // Reached last cloned card while moving backwards
            else if (currentIndex < cloneCount) {

                currentIndex = totalPartners + cloneCount - 1;
                moveCarousel(false);
            }

            isTransitioning = false;
        });

        // Buttons
        nextButton.type = "button";
        prevButton.type = "button";

        nextButton.addEventListener("click", function () {
            nextSlide();
            restartAutoSlide();
        });

        prevButton.addEventListener("click", function () {
            previousSlide();
            restartAutoSlide();
        });

        // Automatic sliding
        function startAutoSlide() {

            clearInterval(autoSlide);

            autoSlide = setInterval(function () {
                nextSlide();
            }, 3000);
        }

        function restartAutoSlide() {
            startAutoSlide();
        }

        // Pause on hover
        carousel.addEventListener("mouseenter", function () {
            clearInterval(autoSlide);
        });

        carousel.addEventListener("mouseleave", function () {
            startAutoSlide();
        });

        // Resize
        window.addEventListener("resize", function () {

            isTransitioning = false;
            moveCarousel(false);

        });

        // Initialize
        moveCarousel(false);
        startAutoSlide();

    });

});




function sendMail(){
    let parms = {
        name : document.getElementById("inputEmail4").value,
        email : document.getElementById("inputPassword4").value,
        subject : document.getElementById("inputAddress").value,
        massage : document.getElementById("inputmassage").value,
    }
    emailjs.send("service_6278eiz","template_yhtqoqo",parms).then(alert("Your email has sent"))
}


