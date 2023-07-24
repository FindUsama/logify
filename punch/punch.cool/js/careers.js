$(document).ready(function() {
    if (
        window.location.href.indexOf("/rapidresponse") >= 0 ||
        window.location.href.indexOf("/graphic-design") >= 0 ||
        window.location.href.indexOf("/ArtificalIntelligenceAudit") >= 0 ||
        window.location.href.indexOf("/expandhours") >= 0
    ) {
        $(".header>.bar>.logo img").attr("src", "/assets/images/shared/punch_white.svg");
    }
    if (window.location.href.indexOf("/punch-staffing") >= 0) {
        $(".header>.bar>.logo img").attr("src", "/assets/images/shared/punch_000000.svg");
        $(".navigation>a").css("color", "#000000");
    }
    if (window.location.href.indexOf("/platform/shopify") >= 0) {
        $(".header>.bar>.logo img").attr("src", "/assets/images/shared/punch_white.svg");
        $(".navigation>a").css("color", "#fff");
        $(".navigation>a").css("opacity", "1");
        $("div.menu.mobile-menu-trigger").css("opacity", "1");
        $("div.menu.mobile-menu-trigger").css("color", "#fff");
        $("div.toolbar > div.close.mobile-menu-trigger > span.icon > span:before").css("color", "#fff");
        $(".owl-carousel").owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
            },
        });
    }

    if (window.location.href.indexOf("/platform/shopify/our-work") >= 0) {
        $(".header>.bar>.logo img").attr("src", "/assets/images/shared/punch_white.svg");
        $(".navigation>a").css("color", "#fff");
        $(".navigation>a").css("opacity", "1");
        $("div.menu.mobile-menu-trigger").css("opacity", "1");
        $("div.menu.mobile-menu-trigger").css("color", "#fff");
        $("div.toolbar > div.close.mobile-menu-trigger > span.icon > span:before").css("color", "#fff");

        $(".owl-carousel").owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
            },
        });
    }

    $.ajax({
        url: "https://punch.recruitee.com/api/offers",
        type: "GET",
        dataType: "json",
        success: function(data) {
            var allJobs = data.offers;
            allJobs.map(function(item) {
                var city = item.city.toLowerCase();
                city = city.replace(" ", "-");
                var job = '<div class="all-positions-wrapper ' + city + '-tab_content">';
                job = job + "<h4>" + item.department + "</h4>";
                job =
                    job +
                    '<div class="ind-position"><div class="ind-position-title"><h5>' +
                    item.title +
                    '</h5></div><div class="position-actions"><p>1 Open Role(s)</p><a href="' +
                    item.careers_apply_url +
                    '" target="_blank">Apply</a></div></div></div>';
                $(".positions-global").append(job);
            });
        },
        error: function() {
            console.log("error");
        },
    });

    // get a quote modal
    $(".gaq-modal-opener").on("click", function() {
        $("#request-candidates").fadeIn();
        $("body").css("overflow", "hidden");
    });
    $(".rc_modal_closer").on("click", function() {
        $("#request-candidates").fadeOut();
        $("body").css("overflow", "visible");
    });
    // CTA fixing
    $(window).scroll(function() {
        var current_url = window.location.pathname;
        if (
            current_url.indexOf("/design") >= 0 ||
            current_url.indexOf("/rapidresponse") >= 0 ||
            current_url.indexOf("/graphic-design") >= 0 ||
            current_url.indexOf("/artificialintelligenceexperts") >= 0 ||
            current_url.indexOf("/industry/healthcare/") >= 0 ||
            current_url.indexOf("/industry/ecommerce") >= 0 ||
            current_url.indexOf("/industry/fintech/") >= 0 ||
            current_url.indexOf("/industry/publishing/") >= 0 ||
            current_url.indexOf("/industry/gaming/") >= 0 ||
            current_url.indexOf("/platform/salesforce/") >= 0 ||
            current_url.indexOf("/platform/AWS/") >= 0 ||
            current_url.indexOf("/platform/shopify/") >= 0 ||
            current_url.indexOf("/platform/googleCloud/") >= 0
        ) {
            var scrollTop = $(window).scrollTop(),
                elementOffset = $(".gaq-cta-wrapper").offset().top,
                distance = elementOffset - scrollTop;
            if (distance == 0) {
                $(".gaq-cta-wrapper").addClass("expand-full");
            } else {
                $(".gaq-cta-wrapper").removeClass("expand-full");
            }
        }
        if (
            current_url.indexOf("/mvp") >= 0 ||
            current_url.indexOf("/ui-ux") >= 0 ||
            current_url.indexOf("/nearshore") >= 0 ||
            current_url.indexOf("/ArtificalIntelligenceAudit") >= 0 ||
            current_url.indexOf("/expandhours") >= 0 ||
            current_url.indexOf("/punch-staffing") >= 0
        ) {
            var scrollTop = $(window).scrollTop(),
                elementOffset = $(".gaq-cta-wrapper").offset().top,
                distance = elementOffset - scrollTop;
            if (distance == 0) {
                $(".gaq-cta-wrapper").addClass("expand-full");
            } else {
                $(".gaq-cta-wrapper").removeClass("expand-full");
            }
        }
    });

    // careers page positions
    $(".positions-area ul li").on("click", function() {
        var clicked_tab = $(this).attr("id");
        $(this).addClass("active-tab").siblings("li").removeClass("active-tab");
        if (clicked_tab === "view-all-tab") {
            $(".all-positions-wrapper").show();
            $(".no_roles").hide();
        } else {
            $(".all-positions-wrapper").hide();
            $("." + clicked_tab + "_content").show();
            $(".no_roles").hide();

            const no_roles = clicked_tab + "_content";
            if ($("." + no_roles).length == 0) {
                $(".no_roles").show();
            }
        }
    });

    var current_path = window.location.pathname;
    if (
        current_path.indexOf("/careers") < 0 ||
        current_path.indexOf("/graphic-design") >= 0 ||
        current_path.indexOf("/ui-ux") >= 0 ||
        current_path.indexOf("/ArtificalIntelligenceAudit") >= 0
    ) {
        // design landing page carousel
        setTimeout(function() {
            var owlDesignTeam = $(".dl-carousel.owl-carousel");
            owlDesignTeam.owlCarousel({
                margin: 15,
                nav: false,
                dots: true,
                rewind: true,
                loop: false,
                autoplay: true,
                autoplayTimeout: 3000,
                responsive: {
                    0: {
                        items: 1,
                    },
                    400: {
                        items: 2,
                        slideBy: 2,
                    },
                    768: {
                        items: 3,
                    },
                    1024: {
                        mouseDrag: false,
                        touchDrag: false,
                        autoplay: false,
                        items: 4,
                    },
                },
            });
        }, 1000);

        // Oeap Carousel
        setTimeout(function() {
            var owlOeap = $(".oeap-carousel.owl-carousel");
            owlOeap.owlCarousel({
                margin: 30,
                nav: false,
                loop: false,
                dots: false,
                rewind: true,
                autoplay: true,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        stagePadding: 20,
                        margin: 5,
                    },
                    1024: {
                        items: 1,
                        stagePadding: 100,
                    },
                    1200: {
                        items: 1,
                        stagePadding: 170,
                    },
                },
            });
        }, 1000);

        // Oeap Carousel
        // setTimeout(function(){
        //   var punchStaffing = $('.punch-staffing.owl-carousel');
        //   punchStaffing.owlCarousel({
        //       margin: 30,
        //       nav: false,
        //       loop: false,
        //       dots: false,
        //       rewind: true,
        //       autoplay:false,
        //       autoplayTimeout:6000,
        //       responsive: {
        //           0: {
        //               items: 1,
        //               stagePadding: 20,
        //               margin: 5
        //           },
        //           1024: {
        //               items: 1,
        //               stagePadding: 100
        //           },
        //           1200: {
        //               items: 1,
        //               stagePadding: 170
        //           }
        //       }
        //   });
        // }, 1000);

        // authors carousel
        setTimeout(function() {
            var owlAuthors = $(".authors-carousel.owl-carousel");
            owlAuthors.owlCarousel({
                nav: false,
                loop: true,
                autoHeight: false,
                autoplay: false,
                autoplayTimeout: 5000,
                items: 1,
            });
        }, 1000);

        // Ui Ux Carousel
        setTimeout(function() {
            var owlUiUx = $(".ui-ux-carousel.owl-carousel");
            owlUiUx.owlCarousel({
                margin: 30,
                nav: false,
                loop: false,
                dots: false,
                rewind: true,
                autoplay: true,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        stagePadding: 20,
                        margin: 5,
                    },
                    1024: {
                        items: 1,
                        stagePadding: 100,
                    },
                    1200: {
                        items: 1,
                        stagePadding: 170,
                    },
                },
            });
        }, 500);

        // Punch Carousel
        setTimeout(function() {
            var owlPunch = $(".punch-carsoule.owl-carousel");
            owlPunch.owlCarousel({
                margin: 30,
                nav: false,
                loop: false,
                rewind: true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        stagePadding: 20,
                        margin: 5,
                    },
                    1024: {
                        items: 1,
                        stagePadding: 100,
                    },
                    1200: {
                        items: 1,
                        stagePadding: 100,
                    },
                },
            });
        }, 500);

        // new shadow program carousel
        // Technologies carousel
        setTimeout(function() {
            var nextIcon =
                '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><g id="Group_164" data-name="Group 164" transform="translate(-186 -1892)"><circle id="Ellipse_121" data-name="Ellipse 121" cx="30" cy="30" r="30" transform="translate(186 1892)" fill="#f9f9f9"/><g id="arrow-right" transform="translate(201 1910)"><path id="Path_14" data-name="Path 14" d="M12,5l7,7-7,7" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></g></svg>';
            var prevIcon =
                '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><g id="Group_165" data-name="Group 165" transform="translate(-116 -1892)"><circle id="Ellipse_120" data-name="Ellipse 120" cx="30" cy="30" r="30" transform="translate(116 1892)" fill="#f9f9f9"/><g id="arrow-left" transform="translate(134 1910)"><path id="Path_12" data-name="Path 12" d="M12,19,5,12l7-7" transform="translate(3.5 0.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></g></svg>';
            var owlTechnologies = $(".technologies-carousel.owl-carousel");
            owlTechnologies.owlCarousel({
                margin: 20,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                responsive: {
                    0: {
                        items: 2,
                        dots: true,
                        nav: false,
                    },
                    375: {
                        items: 3,
                    },
                    768: {
                        items: 4,
                    },
                    1024: {
                        items: 5,
                        dots: false,
                        nav: true,
                    },
                },
            });
            $(".technologies-carousel .owl-nav .owl-next span").html(nextIcon);
            $(".technologies-carousel .owl-nav .owl-prev span").html(prevIcon);
        }, 1000);
    }

    var windowWidth = $(window).width();
    if (windowWidth >= 1180) {
        $(".location-list ul li.sf-map-show").addClass("sf-map-active");
        var sflocation = $(".sf-content .transform");
        sflocation.css({
            opacity: 1,
            transform: "translateY(-90px) scale(0.95)"
        });
    }

    // For San Francisco Location
    $(".location-list ul li.sf-map-show").hover(
        function() {
            $(this).removeClass("sf-map-active");
            var sflocation = $(".sf-content .transform");
            sflocation.css({
                opacity: 1,
                transform: "translateY(-90px) scale(0.95)",
            });
        },
        function() {
            var sflocation = $(".sf-content .transform");
            sflocation.css({
                opacity: 0,
                transform: "translateY(20px) scale(0.95)"
            });
        }
    );

    // For NewYork Location
    $(".location-list ul li.ny-map-show").hover(
        function() {
            var sflocation = $(".newyork-content .transform");
            sflocation.css({
                opacity: 1,
                transform: "translateY(-90px) scale(0.95)",
            });
        },
        function() {
            var sflocation = $(".newyork-content .transform");
            sflocation.css({
                opacity: 0,
                transform: "translateY(20px) scale(0.95)"
            });
        }
    );

    // For London Location
    $(".location-list ul li.lon-map-show").hover(
        function() {
            var sflocation = $(".london-content .transform");
            sflocation.css({
                opacity: 1,
                transform: "translateY(-90px) scale(0.95)",
            });
        },
        function() {
            var sflocation = $(".london-content .transform");
            sflocation.css({
                opacity: 0,
                transform: "translateY(20px) scale(0.95)"
            });
        }
    );

    // For Lahore Location
    $(".location-list ul li.lah-map-show").hover(
        function() {
            var sflocation = $(".lahore-content .transform");
            sflocation.css({
                opacity: 1,
                transform: "translateY(-90px) scale(0.95)",
            });
        },
        function() {
            var sflocation = $(".lahore-content .transform");
            sflocation.css({
                opacity: 0,
                transform: "translateY(20px) scale(0.95)"
            });
        }
    );
});