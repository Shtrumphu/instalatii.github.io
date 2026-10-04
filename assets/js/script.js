(function ($) {
    "use strict";
    // Whole Page scroll Aniamtion
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
            target.classList.toggle('show', isIntersecting);
        });
    });
    const hiddenElements = document.querySelectorAll('.fade_up, .fade_down, .zoom_in, .zoom_out, .fade_right, .fade_left, .flip_left, .flip_right, .flip_up, .flip_down');
    document.addEventListener('DOMContentLoaded', () => {
        hiddenElements.forEach((el) => observer.observe(el));
    });
    // make sticky navbar section
    $(function () {
        const $navbar = $(".top-navbar");
        $(window).on("scroll", function () {
            $navbar.toggleClass("sticky", $(this).scrollTop() > 100);
        });
    });
    // header section
    const $doc = $(document);
    const $win = $(window);
    const $nav = $(".mobile-nav");
    $doc.on("click", ".menu-toggle", () =>
        $nav.addClass("active")
    );
    $doc.on("click", ".close-icon", () => {
        $nav.removeClass("active");
        $(".dropdown-li").removeClass("open");
        $(".dropdown-link").removeClass("active-link");
        $(".active-sublink")
            .closest(".dropdown-li")
            .find(".dropdown-link")
            .addClass("active-link");
    });
    $doc.on("click", ".dropdown-link", function (e) {
        if ($win.width() >= 1199) return;
        const $parent = $(this).closest(".dropdown-li");
        const hasSubmenu = $parent.children("ul").length;
        if (!hasSubmenu) return;
        e.preventDefault();
        $(".dropdown-li").not($parent).removeClass("open");
        $(".dropdown-link").not(this).removeClass("active-link");
        $parent.toggleClass("open");
        $(this).toggleClass("active-link");
    });
    // header section menu overlay functionality
    const $d = $(document),
        $b = $("body"),
        $menuLayer = $(".menu-overlay"),
        $sideMenu = $(".mobile-nav");
    $d.on("click", ".menu-toggle", function () {
        $menuLayer.addClass("active");
        $b.addClass("no-scroll");
    });
    $d.on("click", ".close-icon, .menu-overlay", function () {
        $sideMenu.removeClass("active");
        $menuLayer.removeClass("active");
        $b.removeClass("no-scroll");
    });
    // hero-1 slider section, hero-2 slider section
    $(function () {
        $('.hero-1-slider-wrapper, .hero-2-slider-wrapper').on('init', function () {
            $(this).find('.slick-current').addClass('slick-active');
        }).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            fade: true,
            autoplaySpeed: 8000,
            speed: 8000,
            arrows: false,
            dots: false,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false
        });
    });
    // bottom to top button section
    $(function () {
        const $btn = $("#scrollToTop");
        const $text = $("#scrollPercent");
        const $circle = $(".progress-ring__circle");
        if (!$btn.length || !$circle.length) return;
        const radius = $circle[0].r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        $circle.css({
            strokeDasharray: circumference,
            strokeDashoffset: circumference
        });
        $(window).on("scroll", function () {
            const scrollTop = $(this).scrollTop();
            const docHeight = $(document).height() - $(window).height();
            const percent = Math.round((scrollTop / docHeight) * 100);
            const offset = circumference - (percent / 100) * circumference;
            $circle.css("stroke-dashoffset", offset);
            $text.text(`${percent}%`);
            $btn.toggleClass("show", scrollTop > 100);
        });
        $btn.on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 600);
        });
    });
    // preloader section
    $(window).on("load", function () {
        $("#preloader").fadeOut(300, function () {
            $(this).remove();
        });
    });
    // coming soon countdown section
    $(function () {
        const $days = $("#days"),
            $hours = $("#hours"),
            $minutes = $("#minutes"),
            $seconds = $("#seconds"),
            launch = new Date("2026-05-17T10:00:00").getTime();
        const pad = (num) => String(num).padStart(2, "0");
        const updateCountdown = () => {
            const diff = launch - Date.now();
            if (diff <= 0) {
                $days.add($hours).add($minutes).add($seconds).text("00");
                return;
            }
            $days.text(pad(Math.floor(diff / 86400000)));
            $hours.text(pad(Math.floor((diff % 86400000) / 3600000)));
            $minutes.text(pad(Math.floor((diff % 3600000) / 60000)));
            $seconds.text(pad(Math.floor((diff % 60000) / 1000)));
        };
        setInterval(updateCountdown, 1000);
        updateCountdown();
    });
    // our blogs slider section
    $('.our-blogs-bottom-container').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 2000,
        arrows: false,
        dots: false,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    });
    // infinite scroll section
    $(function () {
        const $slider = $(".infinite-scrolling-logos");
        const $box = $(".logo-slider");
        if (!$slider.length || !$box.length) return;
        $slider.append($slider.html());
        let pos = 0;
        let paused = false;
        const speed = 0.5;
        $box.on("mouseenter", () => paused = true).on("mouseleave", () => paused = false);
        function loop() {
            if (!paused) {
                pos = (pos + speed) % ($slider[0].scrollWidth / 2);
                $slider.css("transform", `translateX(-${pos}px)`);
            }
            requestAnimationFrame(loop);
        }
        loop();
    });
    // our testimonial section
    $('.testimonial-slider-wrapper').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 2000,
        arrows: true,
        prevArrow: $('.testimonial-prev-arrow'),
        nextArrow: $('.testimonial-next-arrow'),
        dots: false,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false
    });
    // counter section
    $(function () {
        const counters = document.querySelectorAll('.counter-per');
        counters.forEach(counter => {
            new IntersectionObserver(([entry], observer) => {
                if (!entry.isIntersecting) return;
                let $t = $(counter), n = +$t.data('target'), d = $t.data('decimal') || 0;
                $({ c: 0 }).animate({ c: n }, {
                    duration: 2000,
                    step() {
                        $t.contents().first()[0].textContent = d ? this.c.toFixed(d) : Math.floor(this.c);
                    },
                    complete() {
                        $t.contents().first()[0].textContent = n.toFixed(d);
                    }
                });
                observer.unobserve(counter);
            }, { threshold: 0.5 }).observe(counter);
        });
    });
    // seo pop up box section
    jQuery(function ($) {
        var popup = $("#seoPopup");
        var seoCloseBtn = $("#seoCloseBtn");
        if (!popup.length) return;
        if (!localStorage.getItem("seoPopupClosed")) {
            setTimeout(function () {
                popup.addClass("active");
            }, 5000);
        }
        function closePopup() {
            popup.removeClass("active");
            localStorage.setItem("seoPopupClosed", "true");
        }
        seoCloseBtn.on("click", closePopup);
        popup.on("click", function (e) {
            if ($(e.target).is(popup)) {
                closePopup();
            }
        });
    });
    // testimonials load more button section
    $(".testimonials-load-more-btn").on("click", function (e) {
        e.preventDefault();
        $(".testimonials-card.hidden").removeClass("hidden");
        $(this).addClass("hide");
    });
    // blog1 load more button section
    $(".blog1-load-more-btn").on("click", function (e) {
        e.preventDefault();
        $(".our-blogs-box.hidden").removeClass("hidden");
        $(this).addClass("hide");
    });
    // team details process bar section
    $(function () {
        function progressBar() {
            $('.progress_bar_item').each(function () {
                let $item = $(this);
                let $progress = $item.find('.progress');
                let value = $progress.data('progress');
                let i = 0;
                let interval = setInterval(function () {
                    if (i <= value) {
                        $progress.css('width', i + '%');
                        $item.find('.item_value').text(i + '%');
                        i++;
                    } else {
                        clearInterval(interval);
                    }
                }, 30);
            });
        }
        let target = document.querySelector('.ce_ixelgen_progress_bar');
        if (target) {
            let observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    progressBar();
                    observer.disconnect();
                }
            }, { threshold: 0.3 });

            observer.observe(target);
        }
    });

})(jQuery);

