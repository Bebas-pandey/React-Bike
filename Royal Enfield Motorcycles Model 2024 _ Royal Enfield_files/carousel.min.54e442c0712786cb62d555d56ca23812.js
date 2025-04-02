//carousel slider [START]
window.addEventListener('load', function () {
  if ($(".langCountryDiv").attr("data-page-id")) {
    let pageId = $(".langCountryDiv").attr("data-page-id").split("/")
    if (pageId[pageId.length - 1]) {
      if (pageId[pageId.length - 1] == "404") {
        dataLayer.push({
            pageType: '404_page'
        })
      }
    }
  }
})

$(document).ready(function () {
    // functions to detect device
    function detectNativeApp() {
        try {
            return !!window.Android || !!window.isNativeApp;
        } catch (err) {
            return false;
        }
    }
    // function to detect iphone
    function detectiOSApp() {
        try {
            return !!window.isNativeApp;
        } catch (err) {
            return false;
        }
    }
    // function to detect android phone
    function detectAndroidApp() {
        try {
            return !!window.Android;
        } catch (err) {
            return false;
        }
    }
    const bannerBridgeGA = (eventName, params) => {
        // click event on read more button
        if (detectiOSApp()) {
            // bridge function integrated
            if (window.logAnalyticsData) {
                window.logAnalyticsData(eventName, JSON.stringify(params));
            }
        }
        // check for android app
        if (detectAndroidApp()) {
            // bridge function integrated
            if (window.Android.logAnalyticsData) {
                window.Android.logAnalyticsData(eventName, JSON.stringify(params));
            }
        }
    };
    //carousel slider [END]
    var previousBannerName = $(".slick-list").children().children(".slick-active").children("div").children().children().children(".banner-inner-img").children("picture").children("img").attr("alt");
    if (previousBannerName == undefined) {
        previousBannerName = "";
    }
    $(document).on("click", ".craouselsliderAna .slick-prev, .craouselsliderAna .slick-next", function () {
        let currentBannerName = $(this).siblings(".slick-list").children().children(".slick-active").children("div").children().children().children(".banner-inner-img").children("picture").children("img").attr("alt");
        let ctaText = $(this).text().trim();
        let currntPagePath = window.location.pathname;
        const bannerObj = {
            event: "carousel",
            eventCategory: "carousel",
            eventAction: currentBannerName,
            eventLabel: currntPagePath,
            previousBannerName: previousBannerName,
            arrowClicked: ctaText,
        };
        // check for native app
        if (detectNativeApp()) {
            bannerBridgeGA("carousel", bannerObj);
        } else {
            dataLayer.push(bannerObj);
        }
        previousBannerName = currentBannerName;
    });

    $(document).on("click", ".craouselsliderAna .slick-dots li button", function () {
        let currentBannerName = $(this)
            .parent("li")
            .parent("ul")
            .siblings(".slick-list")
            .children()
            .children(".slick-active")
            .children("div")
            .children()
            .children()
            .children(".banner-inner-img")
            .children("picture")
            .children("img")
            .attr("alt");
        let ctaText = $(this).text().trim();
        let currntPagePath = window.location.pathname;
        const bannerObj = {
            event: "carousel",
            eventCategory: "carousel",
            eventAction: currentBannerName,
            eventLabel: currntPagePath,
            previousBannerName: previousBannerName,
            arrowClicked: "dots",
        };
        // check for native app
        if (detectNativeApp()) {
            bannerBridgeGA("carousel", bannerObj);
        } else {
            dataLayer.push(bannerObj);
        }
        previousBannerName = currentBannerName;
    });

    $(".carousel-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        infinite: true,
        speed: 1000,
        touchThreshold: 15,
        responsive: [
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],
    });
    // Divesh Kanojia
    //ticking machine
    var percentTime;
    var tick;
    let timeArr = [];
    $(".progressBar").each(function () {
        timeArr.push(parseInt($(this).attr("data-slick-time")) / 1000);
    });
    // console.log(timeArr);
    var progressBarIndex = 0;
    var time = timeArr[progressBarIndex];

    $(".progressBarContainer .progressBar").each(function (index) {
        var progress = "<div class='inProgress inProgress" + index + "'></div>";
        $(this).html(progress);
    });

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        // console.log(progressBarIndex);
        time = timeArr[progressBarIndex];
        // console.log(time);
        tick = setInterval(interval, 100);
    }

    function interval() {
        if ($('.slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden") === "true") {
            progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data("slickIndex");
            startProgressbar();
        } else {
            percentTime += 1 / time;
            $(".inProgress" + progressBarIndex).css({
                width: percentTime + "%",
            });
            if (percentTime >= 100) {
                $(".carousel-slider").slick("slickNext");
                progressBarIndex++;
                if (progressBarIndex > 2) {
                    progressBarIndex = 0;
                }
                startProgressbar();
            }
        }
        return progressBarIndex;
    }

    function resetProgressbar() {
        $(".inProgress").css({
            width: 0 + "%",
        });
        clearInterval(tick);
    }
    startProgressbar();
    // End ticking machine

    $(".item").click(function () {
        clearInterval(tick);
        var goToThisIndex = $(this).find("span").data("slickIndex");
        $(".carousel-slider").slick("slickGoTo", goToThisIndex, false);
        startProgressbar();
    });
    // check for native app
    if (detectNativeApp()) {
        // click event on read more button
        $(document).ready(function () {
            $(document).on("click", "a", function (event) {
                if ($(this).attr("href")) {
                    if ($(this).attr("href").includes("https:")) {
                        event.preventDefault();
                        if (detectiOSApp()) {
                            // bridge function integrated
                            if (window.openLinkInBrowser) {
                                window.openLinkInBrowser($(this).attr("href"));
                            }
                        }
                        // check for android app
                        if (detectAndroidApp()) {
                            // bridge function integrated
                            if (window.Android.openLinkInBrowser) {
                                window.Android.openLinkInBrowser($(this).attr("href"));
                            }
                        }
                    }
                }
            });
        });
    }
});
