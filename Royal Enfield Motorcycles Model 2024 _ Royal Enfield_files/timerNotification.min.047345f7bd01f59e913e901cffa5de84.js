function timerNotificationAnalytics(
  ctaClick,
  nextPageURL,
  NotificationHeading
) {
  dataLayer.push({
    event: "Timer Notification Component",
    eventCategory: "Timer Notification Component",
    eventAction: ctaClick,
    eventLabel: nextPageURL,
    sectionHeading: NotificationHeading,
  });
}

$(function () {
  $(".close").click(function () {
    let ctaClick = $(this).siblings(".d-md-none").children("a").text().trim();
    let nextPageURL = $(this).siblings(".timer-card").attr("href");
    if (nextPageURL == undefined) {
      nextPageURL = "";
    }
    let NotificationHeading = $(this)
      .siblings(".timer-card")
      .children(".timer-content")
      .children(".timer-heading")
      .text()
      .trim();

    timerNotificationAnalytics(ctaClick, nextPageURL, NotificationHeading);
  });

    $(".timer-card").click(function () {
      let ctaClick = $(this)
      .children(".timer-content")
      .children(".timer-text")
      .text()
      .trim();
      let nextPageURL = $(this).attr("href");
      if (nextPageURL == undefined) {
        nextPageURL = "";
      }
      let NotificationHeading = $(this)
      .children(".timer-content")
      .children(".timer-heading")
      .text()
      .trim();

      timerNotificationAnalytics(ctaClick, nextPageURL, NotificationHeading);
    });

  $("#timer-mobile-btn").click(function () {
    let ctaClick = $(this).text().trim();
    let nextPageURL = $(this).attr("href");
    if (nextPageURL == undefined) {
      nextPageURL = "";
    }
    let NotificationHeading = $(this)
      .siblings(".timer-card")
      .children(".timer-content")
      .children(".timer-heading")
      .text()
      .trim();
    timerNotificationAnalytics(ctaClick, nextPageURL, NotificationHeading);
  });
});

var authorChecker;
$(document).ready(function () {
  authorChecker = $(".timer-popup-overlay").attr("data-italy-attr");
  if (authorChecker === "true") {
    $(".timer-notification-wrapper .icon-close").click(function () {
      $(".timer-notification-wrapper").hide();
      $("body").removeClass("popup-open-mobile");
    });
    if ($(window).width() > 767) {
      $(".timer-notification-wrapper").click(function () {
        $(".timer-notification-wrapper").hide();
        $("body").removeClass("popup-open-mobile");
      });
    }
    if ($(window).width() < 768) {
      $(".timer-notification-wrapper #timer-mobile-btn").click(function () {
        $(".timer-notification-wrapper").hide();
        $("body").removeClass("popup-open-mobile");
      });
    }

    const timer = Number($(".timer-notification-wrapper").attr("timer"));
    setTimeout(function () {
      $(".timer-notification-wrapper").css("display", "block");
      if ($(window).width() < 768) {
        $("body").addClass("popup-open-mobile");
      }
    }, timer);

    let link = $(".timer-card").attr("href");
    // let link = timerCardLink;
    if (link == undefined) {
      $(".timer-card").attr("href", "#");
    } else {
      link = link.replace("/content/royal-enfield", "");
      $(".timer-card").attr("href", link);
    }

    let link2 = $("#timer-mobile-btn").attr("href");
    // let link2 = timerBtnLink;
    if (link2 == undefined) {
      $("#timer-mobile-btn").attr("href", "#");
    } else {
      link2 = link2.replace("/content/royal-enfield", "");
      $("#timer-mobile-btn").attr("href", link2);
    }

    if ($(window).width() < 768) {
      $(".timer-card").click(function (event) {
        event.preventDefault();
      });
    }
  }
});
function timerNotificationPopUp(
  timerImageDesktop,
  timerImageMobile,
  timerHeader,
  timerText,
  timerBtnLink,
  addClassToStyle
) {
  if (authorChecker != "true") {
    // To populate data

    $(".timer-heading").html(timerHeader);

    $(".popup-side-img").attr("src", timerImageDesktop);

    $(".timer-text").html(timerText);

    $(".timer-notification-wrapper").addClass(addClassToStyle);

    $(".timer-notification-wrapper .icon-close").click(function () {
      $(".timer-notification-wrapper").hide();
      $("body").removeClass("popup-open-mobile");
    });

    if ($(window).width() > 767) {
      $(".timer-notification-wrapper").click(function () {
        $(".timer-notification-wrapper").hide();
        $("body").removeClass("popup-open-mobile");
      });
    }
    if ($(window).width() < 768) {
      $(".timer-notification-wrapper #timer-mobile-btn").click(function () {
        $(".timer-notification-wrapper").hide();
        $("body").removeClass("popup-open-mobile");
      });
    }
    if ($(window).width() < 768 && timerImageMobile) {
      $(".mobile-image-data").attr("srcset", timerImageMobile);
    }
    const timer = Number($(".timer-notification-wrapper").attr("timer"));
    setTimeout(function () {
      $(".timer-notification-wrapper").css("display", "block");
      if ($(window).width() < 768) {
        $("body").addClass("popup-open-mobile");
      }
    }, timer);

    $(".timer-card").click(function (e) {
      e.preventDefault();
    });

    // $(".timer-card").attr("href", "javascript:void(0);");
    // let link = $(".timer-card").attr("href");
    // let link = timerBtnLink;
    // if (link == undefined) {
    //   $(".timer-card").attr("href", "#");
    // } else {
    //   link = link.replace("/content/royal-enfield", "");
    //   $(".timer-card").attr("href", link);
    // }

    //   let link2 = $("#timer-mobile-btn").attr("href");
    let link2 = timerBtnLink;
    if (link2 == undefined) {
      $("#timer-mobile-btn").attr("href", "#");
    } else {
      link2 = link2.replace("/content/royal-enfield", "");
      $("#timer-mobile-btn").attr("href", link2);
    }
  }
}

