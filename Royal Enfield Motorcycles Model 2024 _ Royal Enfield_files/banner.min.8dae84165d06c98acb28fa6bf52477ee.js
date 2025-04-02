// Video Popup [START]

//Popup video YouTube [START]
$(document).ready(function () {
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
  // check for native app
  if (detectNativeApp()) {
    // click event on read more button
    $(document).ready(function () {
      $(document).on('click', '.nav-id-btn', function (event) {
        event.preventDefault();
        const screeName = $(this).attr("nav-id");
        if (detectiOSApp()) {
          // bridge function integrated
          if (window.navigateToScreen) {
            window.navigateToScreen(screeName);
          }
        }
        // check for android app
        if (detectAndroidApp()) {
          // bridge function integrated
          if (window.Android.navigateToScreen) {
            window.Android.navigateToScreen(screeName);
          }
        }
        const url = $(this).attr("href");
        window.location.href = url;
      });

      $(document).on('click', '.app-nav-btn', function (event) {
        event.preventDefault();
        const screeName = $(this).attr("nav-id");
        if (detectiOSApp()) {
          // bridge function integrated
          if (window.navigateToScreen) {
            window.navigateToScreen(screeName);
          }
        }
        // check for android app
        if (detectAndroidApp()) {
          // bridge function integrated
          if (window.Android.navigateToScreen) {
            window.Android.navigateToScreen(screeName);
          }
        }
      });

      $(document).on("click", ".watch-the-film", function (event) {
        event.preventDefault();
        const ctaUrl = $(this).attr("href");
        if (detectiOSApp()) {
          // bridge function integrated
          if (window.openLinkInBrowser) {
            window.openLinkInBrowser(ctaUrl);
          }
        }
        // check for android app
        if (detectAndroidApp()) {
          // bridge function integrated
          if (window.Android.openLinkInBrowser) {
            window.Android.openLinkInBrowser(ctaUrl);
          }
        }
      });
    });
  }

  var videoPlay = document.getElementsByClassName("vid")[0];
  if (videoPlay) {
    document.getElementsByClassName("vid")[0].play();
  }

  // Gets the video src from the data-src on each button
  var $videoSource;
  $(".video-source-btn").click(function () {
    $videoSource = $(this).data("src");
  });

  // when the modal is opened autoplay it
  $(".popup-video-play").on("shown.bs.modal", function (e) {
    $(".popup-video-play video").attr("src", $videoSource);
  });

  // stop playing the video when I close the modal
  $(".popup-video-play").on("hide.bs.modal", function (e) {
    $(".popup-video-play video").attr("src", "");
  });
  // document ready
});
//Popup video Source [END]

//Popup video YouTube [START]
$(document).ready(function () {
  // Gets the video src from the data-src on each button
  var $videoYoutube;
  const youtubeVideoBtnLength = $(".video-youtube-btn").length;
  for (let i = 1; i <= youtubeVideoBtnLength; i++) {
    $(document).on("click touchstart", ".video-youtube-btn-" + i, function () {
      $videoYoutube = $(this).data("src");
      $(".popup-youtube-play-" + i + " iframe").attr(
        "src",
        $videoYoutube + "?rel=0&amp;autoplay=1&amp;controls=1&amp;loop=1&amp;"
      );
    });

    // when the modal is opened autoplay it
    $(".popup-youtube-play-" + i).on("shown.bs.modal", function (e) {
      // set the video src to autoplay.
    });

    // stop playing the youtube video when I close the modal
    $(".popup-youtube-play-" + i).on("hide.bs.modal", function (e) {
      $(".popup-youtube-play-" + i + " iframe").attr("src", $videoYoutube);
    });
  }

  let videoDataVal = $(".video-box").children(".vid").attr("autoplay");
  if (videoDataVal == "autoplay") {
    $(".video-box")
      .children(".vid")
      .siblings(".video-play-overlay")
      .children(".video-play-btn")
      .children(".icon-play")
      .attr("style", "display: none;");
    $(".video-box")
      .children(".vid")
      .siblings(".video-play-overlay")
      .children(".video-play-btn")
      .children(".icon-pause")
      .attr("style", "display: inline;");
  }
});
//Popup video YouTube [END]

// Video Popup [END]
let ipStackRemove;

function ipLatLong() {
  var ipstackUrl = $("#ipstack-url").attr("data-attr-url");
  let currentModelCode = $(".emi-state").attr("model-code");
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    delete options.headers["x-custom-language"];
    delete options.headers["x-custom-country"];
    delete options.headers["authorization"];
    delete options.headers["app_id"];
  });
  $.ajax({
    dataType: "json",
    url: ipstackUrl,
    success: function (data) {
      $("#emi-select-field").val(data.region_name.toUpperCase());

      let stateText = $("select#emi-select-field option:selected")
        .text()
        .trim();
      $(".emi-state").html(stateText);
      let stateValue = $("select#emi-select-field option:selected").val();
      statePricingData = JSON.parse(window.sessionStorage.getItem(stateValue));
      for (let i = 0; i < statePricingData.length; i++) {
        if (currentModelCode == statePricingData[i]["Model Code"]) {
          $(".emi").text(statePricingData[i]["EMI"]);
          $(".price").text(statePricingData[i]["On-Road Price"]);
          break;
        }
      }
    },
    error: function (error) {
      //console.log("error");
    },
  });
}

$(document).ready(function () {
  let href = window.location.href;
  var content = href.includes("finance-meteor");

  if (content == true) {
    if (!window.matchMedia("(max-width: 767px)").matches) {
      let text = $(".text").eq(2).children("p").text();
      let length = text.length;
      let subStr = text.substring(0, 80);
      let fullStr = text.substring(0, length);

      $(".text")
        .eq(2)
        .children("p")
        .text(subStr + "..." + " ");

      $(".text")
        .eq(2)
        .children("p")
        .append(
          $(`<a class="readMore1" href="javascript:void(0)">Read More</a>`)
        );
      $(".readMore1").click(function () {
        $(".text").eq(2).children("p").text(fullStr);
      });
    } else {
      let text = $(".text").eq(2).children("p").text();
      let length = text.length;
      let subStr = text.substring(0, 200);
      let fullStr = text.substring(0, length);

      $(".text")
        .eq(2)
        .children("p")
        .text(subStr + "..." + " ");

      $(".text")
        .eq(2)
        .children("p")
        .append(
          $(`<a class="readMore1" href="javascript:void(0)">Read More</a>`)
        );
      $(".readMore1").click(function () {
        $(".text").eq(2).children("p").text(fullStr);
      });
    }
  }
  // Pricing Banner JS;
  let pricingRequired = $(".emi-pricing-details").attr("data-pricing");
  if (pricingRequired == "true") {
    $(".emi-pricing-box .btn-change-loc").click(function () {
      $(".emi-pricing-details").hide();
      $(".select-state-emi-dropdown").show();
    });
    $(".select-state-emi-dropdown select").change(function () {
      var selectedCity = $(
        ".select-state-emi-dropdown select option:selected"
      ).html();
      //console.log(selectedCity);
      //$(".emi-pricing-box .emi-state").html(selectedCity);
      $(".emi-pricing-details").show();
      $(".select-state-emi-dropdown").hide();
    });

    ipStackRemove = $(".emi-state").attr("removeIp-stack");
    let bikePriceAPI = $(".emi-state").attr("bike-price");
    let currentModelCode = $(".emi-state").attr("model-code");
    $.ajax({
      url: bikePriceAPI,
      type: "GET",
      success: function (res) {
        function groupBy(arr, property) {
          return arr.reduce(function (memo, x) {
            if (!memo[x[property]]) {
              memo[x[property]] = [];
            }
            memo[x[property]].push(x);
            return memo;
          }, {});
        }
        var stateObj = groupBy(res.data, "State");
        let stateList = Object.keys(stateObj);
        for (let i = 0; i < stateList.length; i++) {
          window.sessionStorage.setItem(
            stateList[i],
            JSON.stringify(stateObj[stateList[i]])
          );
        }
        // need to add space and camel case in state
        let stateWithPradesh = [];
        for (let i = 0; i < stateList.length; i++) {
          if (stateList[i].endsWith("PRADESH")) {
            stateWithPradesh.push(
              stateList[i][0] +
              stateList[i].substring(1).toLowerCase().split("pradesh")[0] +
              " Pradesh"
            );
          } else if (stateList[i].endsWith("NADU")) {
            stateWithPradesh.push(
              stateList[i][0] +
              stateList[i].substring(1).toLowerCase().split("nadu")[0] +
              " Nadu"
            );
          }
        }
        // need to add camel case in state
        let stateWithSpaceBetween = [];
        for (let i = 0; i < stateList.length; i++) {
          if (stateList[i].match(/\s/g)) {
            stateWithSpaceBetween.push(
              stateList[i][0] +
              stateList[i]
                .substring(1, stateList[i].indexOf(" "))
                .toLowerCase() +
              stateList[i]
                .substring(
                  stateList[i].indexOf(" "),
                  stateList[i].lastIndexOf(" ")
                )
                .toLowerCase() +
              " " +
              stateList[i][stateList[i].lastIndexOf(" ") + 1] +
              stateList[i]
                .substring(stateList[i].lastIndexOf(" ") + 2)
                .toLowerCase()
            );
          }
        }
        // need to add camel case in state
        let oneWordState = [];
        for (let i = 0; i < stateList.length; i++) {
          if (
            !stateList[i].endsWith("PRADESH") &&
            !stateList[i].endsWith("NADU") &&
            !stateList[i].match(/\s/g)
          ) {
            oneWordState.push(
              stateList[i][0] + stateList[i].substring(1).toLowerCase()
            );
          }
        }
        newStateList = [
          ...stateWithPradesh,
          ...stateWithSpaceBetween,
          ...oneWordState,
        ];
        newStateList.sort();
        let authorState = $("#emi-select-field").attr("state-value");
        let defaultState = $("#emi-select-field").attr("default-state");
        $("#emi-select-field").append(
          '<option value="' + authorState + '">' + defaultState + "</option>"
        );
        for (let i = 0; i < stateList.length; i++) {
          $("#emi-select-field").append(
            '<option value="' +
            stateList[i] +
            '">' +
            newStateList[i] +
            "</option>"
          );
        }
        let stateValue = $("select#emi-select-field option:selected").val();
        $(".emi-state").html(stateValue);
        $(".emi").text($("#emi-select-field").attr("emi-value"));
        $(".price").text($("#emi-select-field").attr("price-value"));

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else {
          if (ipStackRemove != "true") {
            ipLatLong();
          }
        }
        let locationArr = [];
        let googleApi = $(".emi-state").attr("google-api");
        let googleKey = $(".emi-state").attr("google-key");

        function success(position) {
          $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            delete options.headers["x-custom-language"];
            delete options.headers["x-custom-country"];
            delete options.headers["authorization"];
            delete options.headers["app_id"];
          });
          var GEOCODING =
            googleApi +
            "?latlng=" +
            position.coords.latitude +
            "%2C" +
            position.coords.longitude +
            "&language=en&key=" +
            googleKey;
          $.getJSON(GEOCODING).done(function (location) {
            locationArr = location.results[0].address_components;
            for (let i = 0; i < locationArr.length; i++) {
              if (locationArr[i].types[0] == "administrative_area_level_1") {
                $("#emi-select-field").val(
                  locationArr[i].long_name.toUpperCase()
                );
                break;
              }
            }
            let stateText = $("select#emi-select-field option:selected")
              .text()
              .trim();
            $(".emi-state").html(stateText);
            let stateValue = $("select#emi-select-field option:selected").val();
            statePricingData = JSON.parse(
              window.sessionStorage.getItem(stateValue)
            );
            for (let i = 0; i < statePricingData.length; i++) {
              if (currentModelCode == statePricingData[i]["Model Code"]) {
                $(".emi").text(statePricingData[i]["EMI"]);
                $(".price").text(statePricingData[i]["On-Road Price"]);
                break;
              }
            }
          });
        }

        function error(err) {
          if (err.code == 1) {
            if (ipStackRemove != "true") {
              ipLatLong();
            }
          } else if (err.code == 2) {
            if (ipStackRemove != "true") {
              ipLatLong();
            }
          }
        }
        $("#emi-select-field").change(function () {
          let stateText = $("select#emi-select-field option:selected")
            .text()
            .trim();
          let stateValue = $("select#emi-select-field option:selected").val();
          if (stateValue == authorState) {
            $(".emi-state").html(stateValue);
            $(".emi").text($("#emi-select-field").attr("emi-value"));
            $(".price").text($("#emi-select-field").attr("price-value"));
          } else {
            $(".emi-state").html(stateText);
            statePricingData = JSON.parse(
              window.sessionStorage.getItem(stateValue)
            );
            for (let i = 0; i < statePricingData.length; i++) {
              if (currentModelCode == statePricingData[i]["Model Code"]) {
                $(".emi").text(statePricingData[i]["EMI"]);
                $(".price").text(statePricingData[i]["On-Road Price"]);
                break;
              }
            }
          }
        });
      },
      error: function (error) { },
    });
  }
});

$(function () {
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
    $(document).on("click", ".bannerAnalyticsBtn", function () {
        if ($(this).parent("div").hasClass("video-play-overlay")) {
            let bannerName = $(this).parent().siblings(".banner-main-heading").text().trim();
            var nextUrl = $(this).attr("data-src");
            let ctaText = $(this).text().trim();
            if (nextUrl == undefined) {
                nextUrl = $(this).attr("href");
            }
            let imageUrl = $(this).parent(".video-play-overlay").siblings("picture").children("img").attr("srcset");
            let imageAltText = $(this).parent(".video-play-overlay").siblings("picture").children("img").attr("alt");
            const bannerObj = {
                event: "banner",
                eventCategory: "banner",
                eventAction: imageAltText,
                eventLabel: nextUrl,
                headingName: bannerName,
                assetPath: imageUrl,
                clickText: ctaText,
            };
            // check for native app
            if (detectNativeApp()) {
                bannerBridgeGA("banner", bannerObj);
            } else {
                dataLayer.push(bannerObj);
            }
        } else if ($(this).hasClass("video-youtube-btn")) {
            let bannerName = $(this).parent().siblings(".banner-main-heading").text().trim();
            var nextUrl = $(this).attr("data-src");
            let ctaText = $(this).text().trim();
            if (nextUrl == undefined) {
                nextUrl = $(this).attr("href");
            }
            let imageUrl = $(this)
                .parent(".banner-btn")
                .parent(".txt-box")
                .parent(".container-fluid")
                .parent(".disp-tbl-cel")
                .parent(".disp-tbl")
                .parent(".banner-inner-txt")
                .siblings(".banner-inner-img")
                .children("picture")
                .children("img")
                .attr("srcset");
            let imageAltText = $(this)
                .parent(".banner-btn")
                .parent(".txt-box")
                .parent(".container-fluid")
                .parent(".disp-tbl-cel")
                .parent(".disp-tbl")
                .parent(".banner-inner-txt")
                .siblings(".banner-inner-img")
                .children("picture")
                .children("img")
                .attr("alt");
            const bannerObj = {
                event: "banner",
                eventCategory: "banner",
                eventAction: imageAltText,
                eventLabel: nextUrl,
                headingName: bannerName,
                assetPath: imageUrl,
                clickText: ctaText,
            };
            // check for native app
            if (detectNativeApp()) {
                bannerBridgeGA("banner", bannerObj);
            } else {
                dataLayer.push(bannerObj);
            }
        } else if ($(this).hasClass("mobileBtnAna")) {
            let bannerName = $(this).siblings(".banner-inner-txt").children(".disp-tbl").children(".disp-tbl-cel").children(".container-fluid").children(".txt-box").children(".banner-main-heading").text().trim();
            var nextUrl = $(this).attr("href");
            let ctaText = $(this).siblings(".banner-inner-txt ").children(".disp-tbl").children(".disp-tbl-cel ").children(".container-fluid").children(".txt-box").children(".banner-btn").children(".bannerAnalyticsBtn").text().trim();
            if (nextUrl == undefined) {
                nextUrl = $(this).attr("href");
            }
            let imageUrl = $(this).siblings(".banner-inner-img").children("picture").children("img").attr("srcset");
            let imageAltText = $(this).siblings(".banner-inner-img").children("picture").children("img").attr("alt");
            const bannerObj = {
                event: "banner",
                eventCategory: "banner",
                eventAction: imageAltText,
                eventLabel: nextUrl,
                headingName: bannerName,
                assetPath: imageUrl,
                clickText: ctaText,
            };
            // check for native app
            if (detectNativeApp()) {
                bannerBridgeGA("banner", bannerObj);
            } else {
                dataLayer.push(bannerObj);
            }
        } else {
            let bannerName = $(this).parent().siblings(".banner-main-heading").text().trim();
            var nextUrl = $(this).attr("data-src");
            let ctaText = $(this).text().trim();
            if (nextUrl == undefined) {
                nextUrl = $(this).attr("href");
            }
            let imageUrl = $(this)
                .parent(".banner-btn")
                .parent(".txt-box")
                .parent(".container-fluid")
                .parent(".disp-tbl-cel")
                .parent(".disp-tbl")
                .parent(".banner-inner-txt")
                .siblings(".banner-inner-img")
                .children("picture")
                .children("img")
                .attr("srcset");
            let imageAltText = $(this)
                .parent(".banner-btn")
                .parent(".txt-box")
                .parent(".container-fluid")
                .parent(".disp-tbl-cel")
                .parent(".disp-tbl")
                .parent(".banner-inner-txt")
                .siblings(".banner-inner-img")
                .children("picture")
                .children("img")
                .attr("alt");
            const bannerObj = {
                event: "banner",
                eventCategory: "banner",
                eventAction: imageAltText,
                eventLabel: nextUrl,
                headingName: bannerName,
                assetPath: imageUrl,
                clickText: ctaText,
            };
            // check for native app
            if (detectNativeApp()) {
                bannerBridgeGA("banner", bannerObj);
            } else {
                dataLayer.push(bannerObj);
            }
        }
    });
});

