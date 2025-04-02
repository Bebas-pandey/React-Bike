$(function(){
    // $(document).on('click','.secNavDataAnaList',function(){
    //     let clickText = $(this).children("a").text().trim();
    //     let primaryText = $(this).children("a").text().trim();
    //     let nextUrl = $(this).children("a").attr("href");
    //     if(nextUrl == undefined){
    //         nextUrl = "";
    //     }
    //     let navigationItemText = $(".fsh-left").children(".fsh-head").children("h1").text().trim();
    //     if(navigationItemText == undefined || navigationItemText == ""){
    //         navigationItemText = $(".fsh-left").children(".fsh-head").children("h2").text().trim();
    //         }
    //     dataLayer.push({
    //         'event':'secondaryNavigation',
    //         'eventCategory':'secondaryNavigation',
    //         'eventAction':clickText,
    //         'eventLabel':nextUrl,
    //         'primaryText':primaryText,
    //         'headingName':navigationItemText,
    //      });
    // });

    $('.secNavDataAnaList').children("a").on('click',function(){
        let clickText = $(this).text().trim();
        let primaryText = $(this).text().trim();
        let nextUrl = $(this).attr("href");
        if(nextUrl == undefined){
            nextUrl = "";
        }
        let navigationItemText = $(".fsh-left").children(".fsh-head").children("h1").text().trim();
        if(navigationItemText == undefined || navigationItemText == ""){
            navigationItemText = $(".fsh-left").children(".fsh-head").children("h2").text().trim();
            }
        dataLayer.push({
            'event':'secondaryNavigation',
            'eventCategory':'secondaryNavigation',
            'eventAction':clickText,
            'eventLabel':nextUrl,
            'primaryText':primaryText,
            'headingName':navigationItemText,
         });
    });

        $(document).on('click','.secNavAnalyticsBtn',function(){
        let clickText = $(this).text().trim();
        let primaryText = $(this).text().trim();
        let nextUrl = $(this).attr("href");
        if(nextUrl == undefined){
            nextUrl = "";
        }
        let navigationItemText = $(".fsh-left").children(".fsh-head").children("h1").text().trim();
        if(navigationItemText == undefined || navigationItemText == ""){
            navigationItemText = $(".fsh-left").children(".fsh-head").children("h2").text().trim();
            }
        dataLayer.push({
            'event':'secondaryNavigation',
            'eventCategory':'secondaryNavigation',
            'eventAction':clickText,
            'eventLabel':nextUrl,
            'primaryText':primaryText,
            'headingName':navigationItemText,
         });
    });
 });
/*home page */
$(document).ready(function () {
    var verifyUrl = $(".myUrlLoginUnique").attr("data-url");
    var refreshTokenUrl = $(".myUrlLoginUnique").attr("refresh-url");
    $(".redirectionPath").each(function () {
        let link = $(this).attr("href");
        // let link = timerCardLink;
        if (link == undefined) {
            $(this).attr("href", "#");
        } else {
            link = link.replace("/content/royal-enfield", "");
            $(this).attr("href", link);
        }
    });
    var verifyUrl = $(".myUrlLoginUnique").attr("data-url");
    var refreshTokenUrl = $(".myUrlLoginUnique").attr("refresh-url");
    var currentPageUrl = window.location.pathname;

    var jwtAccessToken;
    var userFetchedData;
    var fetchedUserID;
    var subDomainCookieName = $("#login-link").attr("data-runmode");
    var fetchedData = getCookie(subDomainCookieName);
    if (fetchedData) {
        userFetchedData = window.atob(fetchedData);
        userFetchedData = userFetchedData.split("#");
        fetchedUserID = userFetchedData[0];
        fetchedRtk = userFetchedData[1];
        jwtAccessToken = userFetchedData[2];
    }

    if (!jwtAccessToken && !fetchedUserID) {
    } else {
        const verifyTokenPromise = verifyToken(verifyUrl, "promise", refreshTokenUrl);
        verifyTokenPromise.then(function (value) {
            $(".toggleCta").hide();
            if (value.cluster == "EU0001" && value.ridersClubMember == true) {
                if (currentPageUrl.includes("/rides-and-club") || currentPageUrl.includes("/users")) {
                    $(".riderportal").hide();
                    $(".dynamicUrl").attr("href", "javaScript:void(0)");
                    $(".floatingButton").hide();
                }
            }
        });

        verifyTokenPromise.catch(function (value) {});
    }

    setTimeout(fetchbranchData, 1000);

    $(document).on("click touchend", ".secNavDataAnaList a", function (e) {
        $(".secNavDataAnaList a").removeClass("active");
        //      $(".secNavDataAnaList a").css("color", "#ffffff");
        $(this).addClass("active");
        localStorage.setItem("navName", $(this).text());
        //     $(this).css("color", "#da291c");
    });

    $("#campaignBtn").click(function () {
        $(this).css("background", "grey");
        $("#campaign-form-open").show();
    });
    $(".icon-close").click(function () {
        $("#campaignBtn").css("background", "#da291c");
    });

    //carousel motorcycles
    // $(".carousel-content-sh").each(function () {
    //     if (!$(this).hasClass("slick-slider")) {
    //         var id = $(this).parent().attr("data-id");
    //         var sub_head = "secondary-navigation-" + id;
    //         var sub_car = "secondary-navigation-carousel-" + id;
    //         $("#" + sub_car + " .carousel-content-sh").slick({
    //             slidesToShow: 1,
    //             slidesToScroll: 1,
    //             arrows: false,
    //             fade: false,
    //             infinite: true,
    //             speed: 200,
    //             touchThreshold: 15,
    //             asNavFor: "#" + sub_head + " .carousel-thumb-sh",
    //             responsive: [
    //                 {
    //                     breakpoint: 767,
    //                     settings: {
    //                         infinite: false,
    //                         speed: 200,
    //                     },
    //                 },
    //             ],
    //         });

    //         var carousel_thumb_sh = $("#" + sub_head + " .carousel-thumb-sh");
    //         if ($(window).width() > 767) {
    //             carousel_thumb_sh.slick({
    //                 slidesToShow: 7,
    //                 slidesToScroll: 1,
    //                 asNavFor: "#" + sub_car + " .carousel-content-sh",
    //                 dots: true,
    //                 centerMode: false,
    //                 arrows: false,
    //                 focusOnSelect: true,
    //                 speed: 600,
    //                 touchThreshold: 15,
    //                 variableWidth: true,
    //                 infinite: false,
    //             });
    //         } else {
    //             if ($("#" + sub_head + " .carousel-thumb-sh .c-item").length == 1) {
    //                 carousel_thumb_sh.slick({
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1,
    //                     variableWidth: true,
    //                     arrows: false,
    //                     infinite: false,
    //                     focusOnSelect: true,
    //                     asNavFor: "#" + sub_car + " .carousel-content-sh",
    //                 });
    //             } else if ($("#" + sub_head + " .carousel-thumb-sh .c-item").length == 2) {
    //                 carousel_thumb_sh.slick({
    //                     slidesToShow: 2,
    //                     slidesToScroll: 1,
    //                     variableWidth: true,
    //                     arrows: false,
    //                     infinite: false,
    //                     focusOnSelect: true,
    //                     asNavFor: "#" + sub_car + " .carousel-content-sh",
    //                 });
    //             } else {
    //                 carousel_thumb_sh.slick({
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1,
    //                     variableWidth: true,
    //                     speed: 200,
    //                     touchThreshold: 15,
    //                     infinite: false,
    //                     arrows: false,
    //                     focusOnSelect: true,
    //                     asNavFor: "#" + sub_car + " .carousel-content-sh",
    //                 });
    //             }
    //         }

    //         if ($(window).width() > 767) {
    //             carousel_thumb_sh.on('wheel', (function(e) {
    //                 // console.log(e);

    //                 if(e.currentTarget.slick.slideCount > 8){
    //                     if (e.originalEvent.deltaY < 0) {
    //                         if(e.currentTarget.slick.currentSlide > 0){
    //                             e.preventDefault();
    //                             e.currentTarget.slick.slickPrev();
    //                         }
    //                     } else {
    //                         if(e.currentTarget.slick.currentSlide < (e.currentTarget.slick.slideCount - 1)){
    //                             let lastCount = e.currentTarget.slick.slideCount - 1;
    //                             // console.log(e.currentTarget.slick.$slides[lastCount]);
    //                             if(!(e.currentTarget.slick.$slides[lastCount].classList.contains("slick-active"))){
    //                                 e.preventDefault();
    //                                 e.currentTarget.slick.slickNext();
    //                             }
    //                         }
    //                     }
    //                 }
    //             }));
    //         }
    //     }

    // });

    $(".carousel-content-sh").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        infinite: true,
        speed: 200,
        touchThreshold: 15,
        // asNavFor: "#" + sub_head + " .carousel-thumb-sh",
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    infinite: false,
                    speed: 200,
                },
            },
        ],
    });

    $(".carousel-thumb-sh").each(function () {
        var lastXPos = 0;
        var count = 0;
        var lastDataCount = 1;
        var xFirstChild = $(this)[0].firstElementChild.getBoundingClientRect().left;
        console.log(xFirstChild);
        $(this)
            .children(".c-item")
            .on("click", function () {
                $(this).parent(".carousel-thumb-sh").children(".c-item").removeClass("active");
                // $(this).parent(".carousel-thumb-sh").scrollLeft( 100 );
                //   $(this)[0].scrollIntoView({ behavior: "smooth", inline: "nearest" })
                var curDataCount = parseInt($(this).attr("data-nav-count"));
                var xCurChild = $(this)[0].getBoundingClientRect().left;
                console.log(xCurChild + "cur pos");
                var xLastChild;
                if (count > 0) {
                    if (lastDataCount > curDataCount) {
                        xLastChild = xFirstChild + (curDataCount - 1) * 2;
                        $(this)
                            .parent(".carousel-thumb-sh")
                            .animate({
                                scrollLeft: "-=" + xLastChild + "px",
                            });
                    } else {
                        xLastChild = xFirstChild + (curDataCount - 1) * 5;
                        $(this)
                            .parent(".carousel-thumb-sh")
                            .animate({
                                scrollLeft: "+=" + xLastChild + "px",
                            });
                    }
                } else {
                    xLastChild = xFirstChild + (curDataCount - 1) * 5;
                    $(this)
                        .parent(".carousel-thumb-sh")
                        .animate({
                            scrollLeft: "+=" + xLastChild + "px",
                        });
                }
                lastDataCount = curDataCount;
                count++;
                console.log(xLastChild);
                console.log(curDataCount);

                $(this).addClass("active");
                var navItemCount = parseInt($(this).attr("data-nav-count"));
                navItemCount = navItemCount - 1;
                console.log(navItemCount);
                console.log($(this).closest(".follow-sticky-wrap").next(".secondary-navigation-carousel").find(".carousel-content-sh"));
                $(this).closest(".follow-sticky-wrap").next(".secondary-navigation-carousel").find(".carousel-content-sh").slick("slickGoTo", navItemCount);
            });
    });

    $(".carousel-thumb-sh").each(function () {
        $(this).children(".c-item:first-child").addClass("active");
    });

    let tabTarget, tabTargetNav, activePane, activeLink, tabId, navLinkId;
    $(document).on("click", ".secondary-sticky-nav .secNavDataAna", function () {
        tabTarget = $(this).attr("data-tab-target");
        $(".tours-filter-content .tab-pane").each(function () {
            tabId = $(this).attr("id");
            activePane = $(this);
            if (tabTarget == tabId) {
                $(".tours-filter-content .tab-pane").removeClass("active show");
                activePane.addClass("active show");
            }
        });
    });

    $(document).on("click", ".secondary-sticky-nav .secNavDataAna", function () {
        // $(".secondary-sticky-nav .secNavDataAna").on("click", function(){
        tabTargetNav = $(this).attr("data-tab-target");
        tabTargetNav = "#" + tabTargetNav;
        $(".tours-filter-tabs .nav-link").each(function () {
            navLinkId = $(this).attr("href");
            activeLink = $(this);
            if (tabTargetNav == navLinkId) {
                $(".tours-filter-tabs .nav-link").removeClass("active show");
                activeLink.addClass("active show");
            }
        });
    });

    let navName = localStorage.getItem("navName");
    if (!navName) {
        navName = "";
    }

    $(".secNavDataAnaList a").each(function () {
        if (navName) {
            $(this).removeClass("active");
            if ($(this).text() == navName) {
                $(this).addClass("active");
                $(this).trigger("click");
            }
        }
    });

    localStorage.removeItem("navName");
});

function fetchbranchData() {
    if (collectionData) {
        collectionData.doc("riderPortalMembership").onSnapshot(function (doc) {
            let realtimeChange = {};
            realtimeChange = doc.data();
            if (realtimeChange) {
                let branchLink = $(".dynamicUrl").attr("data-url");
                if (branchLink.includes("/content/royal-enfield")) {
                    branchLink = branchLink.replace("/content/royal-enfield", "");
                }
                if (branchLink && realtimeChange.branch && realtimeChange.moderationStatus != "REJECTED") {
                    $(".dynamicUrl").attr("href", branchLink + "?branchId=" + realtimeChange.branch._id + "&register=true");
                } else if (branchLink && realtimeChange.moderationStatus == "REJECTED") {
                    $(".dynamicUrl").attr("href", branchLink + "?register=false");
                } else {
                    $(".dynamicUrl").attr("href", "javaScript:void(0)");
                }
            }
        });
    }
}

$(document).on("click", ".toggleCta", function () {
    $("body").toggleClass("login_show");
    $(".nav-hamburger").removeClass("is-active");
    $(".nav-primary").removeClass("np-open");

    //Remove Sticky Links
    $(".sticky-links-box").removeClass("open sl-head-show");

    //Close Nav Dropdown
    $(".nav-primary .has-children").removeClass("active");
    $(".nav-primary .has-children").siblings().find(".nav-secondary").removeClass("nav-dropdown");

    //Close Nav Dropdown for Mobile
    $(".nav-hamburger").removeClass("is-active");
    $(".nav-primary").removeClass("np-open");
    $("body").removeClass("body-scroll-stop");

    //Language dropdown close
    $("body").removeClass("language-open");

    //Close Secondary Nav
    $("body").removeClass("secondary-sticky-nav-open");
});

function fetchbranchData() {
    if (collectionData) {
        collectionData.doc("riderPortalMembership").onSnapshot(function (doc) {
            let realtimeChange = {};
            realtimeChange = doc.data();
            if (realtimeChange) {
                let branchLink = $(".dynamicUrl").attr("data-url");
                if (branchLink) {
                    if (branchLink.includes("/content/royal-enfield")) {
                        branchLink = branchLink.replace("/content/royal-enfield", "");
                    }
                    if (branchLink && realtimeChange.branch && realtimeChange.moderationStatus != "REJECTED") {
                        $(".dynamicUrl").attr("href", branchLink + "?branchId=" + realtimeChange.branch._id + "&register=true");
                    } else if (branchLink && realtimeChange.moderationStatus == "REJECTED") {
                        $(".dynamicUrl").attr("href", branchLink + "?register=false");
                    }
                } else {
                    $(".dynamicUrl").attr("href", "javaScript:void(0)");
                }
            }
        });
    }
}

$("#overlay-btn").click(function () {
    $(".overlay-form").toggle();
});

