jQuery(document).ready(function ($) {
    /* WINDOW RESIZE FUNCTIONS */

    base_url = $(".base_url").text();

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    let player = null;
    let playerID = null;

    if (windowWidth < 769) {
        /* MOBILE RESIZE */

        setTimeout(function () {
            const slider = document.querySelector(
                ".page-homepage .slider-home, .single-lp .slider-home"
            );
            const lottieContainers = slider.querySelectorAll("lottie-player");
            lottieContainers.forEach((container, index) => {
                // Access the SVG element inside the Lottie container
                const svgElement = container.shadowRoot.querySelector("svg");

                // Modify the preserveAspectRatio attribute for each player
                svgElement.setAttribute(
                    "style",
                    "width: auto; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"
                );
            });
        }, 500);

        player = document.getElementById("video-lottie-mobile");
        playerID = "#video-lottie-mobile";

        $(".case-block").each(function () {
            $(this).removeClass("disabled");
        });
        $(".case-block").each(function () {
            $(this).addClass("active");
        });

        $(".slider-home .slide-item .arrow-next").click(function () {
            checkDirection("click");
        });

        let touchstartX = 0;
        let touchendX = 0;

        setTimeout(function () {
            if ($("body").hasClass("page-homepage")) {
                $(".slider-home .slide-item.current")
                    .find("lottie-player")
                    .get(0)
                    .play();
            }
        }, 200);
        function checkDirection(type) {
            if (
                (type === "direction" && touchendX < touchstartX) ||
                type === "click"
            ) {
                // find index of current slide item and add class to next slide item and next-next slide item (if have) and remove class from others slide items

                // if dont have next slide item (last slide) and first slide has class .next remove class from first slide and add class .current
                if (!$(".slider-home .slide-item.current").next().length) {
                    var index = -1;
                } else {
                    var index = $(".slider-home .slide-item.current").index();
                }
                $(".slider-home .slide-item").removeClass("current");
                $(".slider-home .slide-item").removeClass("prev");
                $(".slider-home .slide-item").removeClass("next");
                $(".slider-home .slide-item").removeClass("next-next");
                $(".slider-home .slide-item .slide-info").removeClass("active");

                $(
                    ".slider-home .slide-item:nth-child(" + (index + 2) + ")"
                ).addClass(
                    "current" // current slide item
                );
                $(
                    ".slider-home .slide-item:nth-child(" + (index + 1) + ")"
                ).addClass(
                    "prev" // prev slide item
                );
                $(
                    ".slider-home .slide-item:nth-child(" + (index + 3) + ")"
                ).addClass(
                    "next" // next slide item
                );
                $(
                    ".slider-home .slide-item:nth-child(" + (index + 4) + ")"
                ).addClass(
                    "next-next" // next-next slide item
                );

                setTimeout(function () {
                    $(".slider-home .slide-item.current .slide-info").addClass(
                        "active"
                    );
                }, 700);

                // if dont have next-next slide item (last slide) add class to first slide item
                if (
                    !$(".slider-home .slide-item.current").next().next()
                        .length &&
                    $(".slider-home .slide-item.current").next().length
                ) {
                    $(".slider-home .slide-item:first-child").addClass(
                        "next-next"
                    );
                }
                // if dont have prev slide item (first slide) add class to last slide item
                if (!$(".slider-home .slide-item.current").prev().length) {
                    $(".slider-home .slide-item:last-child").addClass("prev");
                }
                // if dont have next slide item (last slide) add class to first slide item and next-next to second slide item
                if (
                    !$(".slider-home .slide-item.current").next().length &&
                    !$(".slider-home .slide-item:first-child").hasClass(
                        "next"
                    ) &&
                    !$(".slider-home .slide-item:nth-child(2)").hasClass(
                        "next-next"
                    )
                ) {
                    $(".slider-home .slide-item:first-child").addClass("next");
                    $(".slider-home .slide-item:nth-child(2)").addClass(
                        "next-next"
                    );
                }

                // play current slide item video
                var video = $(".slider-home .slide-item.current video").get(0);
                video.play();

                // rewind all slides except current item video
                setTimeout(function () {
                    $(".slider-home .slide-item:not(.current) video").each(
                        function () {
                            var videoPrev = $(this).get(0);
                            videoPrev.playbackRate = 1.0;
                            videoPrev.currentTime = 0;
                            videoPrev.pause();
                        }
                    );
                }, 500);

                setTimeout(function () {
                    $(".slider-home .slide-item.current")
                        .find("lottie-player")
                        .get(0)
                        .play();
                }, 600);

                setTimeout(function () {
                    $(
                        ".slider-home .slide-item:not(.current) lottie-player"
                    ).each(function () {
                        var videoPrev = $(this).get(0);
                        videoPrev.playbackRate = 1.0;
                        videoPrev.currentTime = 0;
                        videoPrev.stop();
                    });
                }, 500);

                // remove prev class from prev slide item
                setTimeout(function () {
                    $(".slider-home .slide-item.prev").removeClass("prev");
                }, 600);
            }
        }

        // verify if the direction of swipe is left or right
        $(".slider-home .slide-item").on("touchstart", function (event) {
            touchstartX = event.changedTouches[0].screenX;
        });

        $(".slider-home .slide-item").on("touchend", function (event) {
            touchendX = event.changedTouches[0].screenX;
            checkDirection("direction");
        });

        $(".feature-items").slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 1500,
            fade: true,
            cssEase: "ease",
        });

        $(".team-block-mobile").slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            autoplay: false,
            cssEase: "ease",
            nextArrow: $(".arrow-next"),
            prevArrow: $(".prev"),
        });
        $(".team-block-mobile").slick("refresh");

        // $(window).on("touchmove", function () {
        //     var scrollPos = $(window).scrollTop();
        //     var titleBlock = $(".page-lab .title-block");

        //     if (scrollPos <= 20) {
        //         var scale = 1 - scrollPos / 100;
        //         var topPos = 13.1 - scrollPos * 0.43; // 6.1vw descendo até -2.5vw

        //         titleBlock.css({
        //             transform: "translateX(-50%) scale(" + scale + ")",
        //             top: topPos + "vw",
        //         });
        //     } else {
        //         titleBlock.css({
        //             transform: "translateX(-50%) scale(0.2)",
        //             top: "-2.5vw",
        //         });
        //     }
        // });
    } else {
        /* DESKTOP RESIZE */
        if ($("body").hasClass("page-homepage")) {
            $(".slider-home .slide-item:first-child .slide-info")
                .find("lottie-player")
                .get(0)
                .play();
        }
        $(".slider-home .slide-item").click(function () {
            const $this = $(this);
            if (!$this.hasClass("current")) {
                var index = $(".slider-home .slide-item").index(this);
                $(".slider-home .slide-item").removeClass("current");
                $(".slider-home .slide-item").removeClass("prev");
                $(".slider-home .slide-item").removeClass("next");
                $(".slider-home .slide-item").removeClass("next-next");
                $(".slider-home .slide-item .slide-info").removeClass("active");

                $(
                    ".slider-home .slide-item:nth-child(" + (index + 1) + ")"
                ).addClass(
                    "current" // current slide item
                );
                $(".slider-home .slide-item:nth-child(" + index + ")").addClass(
                    "prev" // prev slide item
                );
                $(
                    ".slider-home .slide-item:nth-child(" + (index + 2) + ")"
                ).addClass(
                    "next" // next slide item
                );
                $(
                    ".slider-home .slide-item:nth-child(" + (index + 3) + ")"
                ).addClass(
                    "next-next" // next-next slide item
                );

                setTimeout(function () {
                    $(".slider-home .slide-item.current .slide-info").addClass(
                        "active"
                    );
                }, 700);

                // if dont have next-next slide item (last slide) add class to first slide item
                if (!$this.next().next().length && $this.next().length) {
                    $(".slider-home .slide-item:first-child").addClass(
                        "next-next"
                    );
                }
                // if dont have prev slide item (first slide) add class to last slide item
                if (!$this.prev().length) {
                    $(".slider-home .slide-item:last-child").addClass("prev");
                }
                // if dont have next slide item (last slide) add class to first slide item and next-next to second slide item
                if (!$this.next().length) {
                    $(".slider-home .slide-item:first-child").addClass("next");
                    $(".slider-home .slide-item:nth-child(2)").addClass(
                        "next-next"
                    );
                }

                // play current slide item video
                var video = $(".slider-home .slide-item.current video").get(0);
                video.play();

                // rewind all slides except current item video
                setTimeout(function () {
                    $(".slider-home .slide-item:not(.current) video").each(
                        function () {
                            var videoPrev = $(this).get(0);
                            videoPrev.playbackRate = 1.0;
                            videoPrev.currentTime = 0;
                            videoPrev.pause();
                        }
                    );
                }, 500);

                var el = $(this);
                setTimeout(function () {
                    if (el.find("lottie-player").length) {
                        el.find("lottie-player").get(0).play();
                    }
                }, 600);

                setTimeout(function () {
                    $(
                        ".slider-home .slide-item:not(.current) lottie-player"
                    ).each(function () {
                        var videoPrev = $(this).get(0);
                        videoPrev.playbackRate = 1.0;
                        videoPrev.currentTime = 0;
                        videoPrev.stop();
                    });
                }, 500);

                // remove prev class from prev slide item
                setTimeout(function () {
                    $(".slider-home .slide-item.prev").removeClass("prev");
                }, 600);
            }
        });

        player = document.getElementById("video-lottie-desktop");
        playerID = "#video-lottie-desktop";

        $(".work-section .work-block").mouseenter(function () {
            $(".work-section .work-block").removeClass("active");
            $(".work-section .work-block").addClass("inactive");
            $(".work-section .work-block.inactive")
                .find(".video-work")
                .get(0)
                .pause();

            $(this).addClass("active");
            $(this).removeClass("inactive");

            var video = $(this).find(".video-work").get(0);

            if (video) video.play();
        });
        $(".work-section").mouseleave(function () {
            $(".work-section .work-block").removeClass("active");
            $(".work-section .work-block").removeClass("inactive");

            var video = $(this).find(".video-work").get(0);
            if (video) video.pause();
        });

        $(".work-section .work-block .title").each(function () {
            var width = $(this).width();
            $(this).attr("style", "width:" + width + "px");
        });

        // $(window).on("scroll", function () {
        //     var scrollPos = $(window).scrollTop();
        //     var titleBlock = $(".page-lab .title-block");

        //     if (scrollPos <= 60) {
        //         var scale = 1 - scrollPos / 300;
        //         var topPos = 6.1 - scrollPos * 0.43; // 6.1vw descendo até -2.5vw

        //         titleBlock.css({
        //             transform: "translateX(-50%) scale(" + scale + ")",
        //             top: topPos + "vw",
        //         });
        //     } else {
        //         titleBlock.css({
        //             transform: "translateX(-50%) scale(0.2)",
        //             top: "-2.5vw",
        //         });
        //     }
        // });
    }

    $(window).resize(function () {
        setTimeout(function () {
            var resizeWidth = $(window).width();
            if (windowWidth < 769 && resizeWidth > 768) {
                location.reload();
            }
            if (windowWidth > 768 && resizeWidth < 769) {
                location.reload();
            }
            windowWidth = $(window).width();
        }, 500);
    });

    /* SCROLL FUNCTIONS */

    /* ENTRY ANIMATION */

    $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top + 50;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on("resize scroll", function () {
        $st = $(this).scrollTop();
        $wh = $(document).height();
        $perc = ($st * 100) / $wh;

        $(".animate_trigger").each(function () {
            if ($(this).isInViewport()) {
                $(this).addClass("animate_in");
            }
        });
    });
    $(window).scroll();

    $('a[href*="#"]:not([href="#"])').click(function () {
        if (windowWidth < 769) {
            var offset = -100; // <-- change the value here
        } else {
            var offset = windowWidth * (-0.0333 * 2.5); // <-- change the value here
        }
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top + offset,
                    },
                    900
                );
                return false;
            }
        }
    });

    /* HEADER */

    $(".case-block:not(.all):first-child").addClass("active");
    $(".case-block").click(function () {
        const $this = $(this);

        if (!$this.hasClass("all")) {
            $(".case-block.active").removeClass("active");
            $(".case-block:not(.disabled)").addClass("disabled");
            $this.addClass("active");
            $this.removeClass("disabled");

            var offsetInVw = 0.3;
            var offsetInPixels = (offsetInVw * $(window).width()) / 100;

            setTimeout(function () {
                $("html, body").animate(
                    {
                        scrollTop: $($this).offset().top - offsetInPixels,
                    },
                    800
                );
            }, 350);
        }
    });

    $(".marquee_text.first").marquee({
        direction: "left",
        duration: 60000,
        gap: 10,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true,
    });

    $(".marquee_text.second").marquee({
        direction: "right",
        duration: 70000,
        gap: 10,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true,
    });

    $(".marquee-header-info.brazil").marquee({
        direction: "left",
        duration: 80000,
        gap: 100,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true,
    });

    setInterval(function () {
        var count = $(".marquee_text.first div.text").length / 2;
        var random = Math.floor(Math.random() * count) + 1;
        $(".marquee_text.first div.text").removeClass("underline");
        $(".marquee_text.first div.text:nth-child(" + random + ")").addClass(
            "underline"
        );

        var count2 = $(".marquee_text.second div.text").length / 2;
        var random2 = Math.floor(Math.random() * count2) + 1;
        $(".marquee_text.second div.text").removeClass("underline");
        $(".marquee_text.second div.text:nth-child(" + random2 + ")").addClass(
            "underline"
        );
    }, 5000);

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var height = $(window).height();
        if (scroll >= height / 2) {
            $("header.fixed").addClass("active");
            if ($("body").hasClass("page-lab")) {
                $(".small-lab-logo").addClass("active");
            }
        } else {
            $("header.fixed").removeClass("active");
            if ($("body").hasClass("page-lab")) {
                $(".small-lab-logo").removeClass("active");
            }
        }
    });

    setTimeout(function () {
        $(".page-homepage .first-section .small-text").addClass("show");
    }, 1500);
    setTimeout(function () {
        $(".page-homepage .video-js").addClass("active");
    }, 2000);
    setTimeout(function () {
        $(".page-homepage header.static").addClass("active");
        // $(".page-homepage .red-circle").addClass("active");
        $(".page-homepage .arrow-down").addClass("active");
    }, 2400);

    $(".arrow-down").click(function () {
        $("html, body").animate(
            {
                scrollTop: $(".second-section, .create-section").offset().top,
            },
            1000
        );
    });

    $(".second-section .clickDivToPlay").click(function () {
        const video = document.getElementById("video_reel");

        if (video.paused || video.ended) {
            $(".second-section").addClass("active");
            video.play();
        } else {
            $(".second-section").removeClass("active");
            video.playbackRate = 1.0;
            video.currentTime = 0;
            video.pause();
        }
    });

    $(".content-grid .video").click(function () {
        $(this).addClass("active");
        $iframe = $(this).parent().find("iframe");
        $($iframe).attr("src", $($iframe).attr("src") + "&autoplay=1");
    });

    // menu hamburger
    $(".menu-icon").click(function () {
        $(".big-menu").toggleClass("active");
        $("body").toggleClass("menu-open");

        if ($(".big-menu").hasClass("active")) {
            $(".case-block .top-buttons").css("z-index", "3");
            $(".background-mobile").addClass("active");
        } else {
            $(".case-block .top-buttons").css("z-index", "5");
            $(".background-mobile").removeClass("active");
        }
    });

    $(".page-about .team-block .team-member").click(function () {
        // if ($(".page-about .team-block .team-member").hasClass("inactive")) {
        //   $(".page-about .team-block .team-member").removeClass("inactive");
        // } else {
        //   $(".page-about .team-block .team-member").removeClass("active");
        //   $(".page-about .team-block .team-member").addClass("inactive");
        // }
        // if ($(this).hasClass("active")) {
        //   $(this).removeClass("active");
        // } else {
        //   $(".page-about .team-block .team-member").removeClass("active");
        //   $(".page-about .team-block .team-member").addClass("inactive");
        //   $(this).addClass("active");
        //   $(this).removeClass("inactive");
        // }

        if ($(".page-about .team-block .team-member").hasClass("active")) {
            $(".page-about .team-block .team-member").removeClass("active");
            $(".page-about .team-block .team-member").removeClass("inactive");
        } else {
            $(".page-about .team-block .team-member").removeClass("active");
            $(".page-about .team-block .team-member").addClass("inactive");
            $(this).addClass("active");
            $(this).removeClass("inactive");
        }
    });
    $(".page-about .team-block").mouseleave(function () {
        $(".page-about .team-block .team-member").removeClass("active");
        $(".page-about .team-block .team-member").removeClass("inactive");
    });

    var container = document.getElementById("first-section");

    let mouseX = 0;
    let mouseY = 0;

    let elementX = 0;
    let elementY = 0;

    let speed = 0.08;

    function animate() {
        let distX = mouseX - elementX - 250;
        let distY = mouseY - elementY - 250;

        elementX = elementX + distX * speed;
        elementY = elementY + distY * speed;

        $(".video-on").css("mask-position", elementX + "px " + elementY + "px");
        $(".video-on").css(
            "-webkit-mask-position",
            elementX + "px " + elementY + "px"
        );

        requestAnimationFrame(animate);
    }
    animate();
    if (container)
        container.addEventListener("mousemove", function (event) {
            mouseX = event.pageX;
            mouseY = event.pageY;
        });

    $(".footer-white .countries .country-info").click(function () {
        $(".footer-white .countries .country-info").removeClass("active");
        $(".footer-white .infos.brazil").removeClass("active");
        $(".footer-white .infos.berlin").removeClass("active");
        $(this).addClass("active");

        if ($(this).hasClass("brazil")) {
            $(".footer-white .infos.brazil").addClass("active");
        }
        if ($(this).hasClass("berlin")) {
            $(".footer-white .infos.berlin").addClass("active");
        }
    });

    $(".big-menu .header-infos .countries .country-info").click(function () {
        $(".big-menu .header-infos .countries .country-info").removeClass(
            "active"
        );
        $(".big-menu .header-infos .marquee-header-info.brazil").removeClass(
            "active"
        );
        $(".big-menu .header-infos .marquee-header-info.berlin").removeClass(
            "active"
        );
        $(".marquee-header-info.brazil").marquee("destroy");
        $(".marquee-header-info.berlin").marquee("destroy");
        $(this).addClass("active");

        if ($(this).hasClass("brazil")) {
            $(".big-menu .header-infos .marquee-header-info.brazil").addClass(
                "active"
            );
            $(".marquee-header-info.brazil").marquee({
                direction: "left",
                duration: 80000,
                gap: 100,
                delayBeforeStart: 0,
                duplicated: true,
                startVisible: true,
            });
        }
        if ($(this).hasClass("berlin")) {
            $(".big-menu .header-infos .marquee-header-info.berlin").addClass(
                "active"
            );

            $(".marquee-header-info.berlin").marquee({
                direction: "left",
                duration: 80000,
                gap: 100,
                delayBeforeStart: 0,
                duplicated: true,
                startVisible: true,
            });
        }
    });

    $(".slider-home .slide-item:first-child").addClass("current");
    $(".slider-home .slide-item:nth-child(2)").addClass("next");
    $(".slider-home .slide-item:nth-child(3)").addClass("next-next");
    $(".slider-home .slide-item:last-child").addClass("prev");
    $(".slider-home .slide-item:first-child .slide-info").addClass("active");

    $(".page-homepage .case-block").each(function () {
        var video = $(this).children(".video-work").get(0);

        if (video) {
            $(this).hover(
                function () {
                    video.play();
                },
                function () {
                    video.pause();
                }
            );
        }
    });

    $(".case-block.all").each(function () {
        var video = $(this).children("video").get(0);

        if (video) {
            $(this).hover(
                function () {
                    video.play();
                },
                function () {
                    video.pause();
                }
            );
        }
    });

    if (player) {
        player.addEventListener("ready", () => {
            let inte = LottieInteractivity.create({
                player: playerID,
                mode: "scroll",
                actions: [
                    {
                        visibility: [0, 0.5],
                        type: "playOnce",
                    },
                ],
            });
        });
    }

    // Function to handle video play/pause based on viewport
    function handleVideoPlay() {
        $(
            ".single-work .video-container video, .single-lp .video-container video, .page-lab .video-container video"
        ).each(function () {
            if ($(this).isInViewport() && isElementInViewport(this)) {
                this.play();
            } else {
                this.pause();
            }
        });
    }

    // Function to check if an element is in the viewport using Intersection Observer
    function isElementInViewport(el) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        });

        observer.observe(el);
    }

    // Bind the handleVideoPlay function to the scroll event
    $(window).on("scroll", function () {
        handleVideoPlay();
    });

    // Initial check on page load
    handleVideoPlay();

    $(".page-lab .content-grid .bg-img-container").mouseenter(function () {
        $(".page-lab .content-grid .bg-img-container").removeClass("active");
        $(".page-lab .content-grid .bg-img-container").addClass("inactive");
        $(".page-lab .content-grid .video-container").addClass("inactive");
        let videoInactive = $(
            ".page-lab .content-grid .video-container.inactive"
        ).find("video");

        if (videoInactive.length > 0) {
            videoInactive.get(0).pause();
        }

        $(this).removeClass("inactive");
        $(this).addClass("active");
    });

    $(".page-lab .content-grid .bg-img-container").mouseleave(function () {
        $(".page-lab .content-grid .bg-img-container").removeClass("active");
        $(".page-lab .content-grid .bg-img-container").removeClass("inactive");
        $(".page-lab .content-grid .video-container").removeClass("inactive");
    });

    $(".page-lab .content-grid .video-container").mouseenter(function () {
        $(".page-lab .content-grid .video-container").removeClass("active");
        $(".page-lab .content-grid .video-container").addClass("inactive");
        $(".page-lab .content-grid .bg-img-container").addClass("inactive");

        let videoInactive = $(
            ".page-lab .content-grid .video-container.inactive"
        ).find("video");

        if (videoInactive.length > 0) {
            video.get(0).pause();
        }

        $(this).removeClass("inactive");
        $(this).addClass("active");

        var video = $(this).find("video").get(0);

        if (video) video.play();
    });

    $(".page-lab .content-grid .video-container").mouseleave(function () {
        $(".page-lab .content-grid .video-container").removeClass("active");
        $(".page-lab .content-grid .video-container").removeClass("inactive");
        $(".page-lab .content-grid .bg-img-container").removeClass("inactive");

        var video = $(this).find("video").get(0);
        if (video) video.pause();
    });
});
