$(document).ready(function () {
	$(".miy-notification-wrapper").hide();

});

function miyBikeNotification(
  backgroundImgMobile,
  backgroundImgDesktop,
  header,
  para,
  RetrieveConfigBtnText,
  RetrieveConfigLink,
  NewConfigBtnText,
  NewConfigLink
) {

    let link1 = $("#retrieve-config-btn").attr("href");
    let link2 = $("#new-config-btn").attr("href");
    if (link1 == undefined) {
      $(".timer-card").attr("href", "#");
    } else {
      link1 = link1.replace("/content/royal-enfield", "");
      $(".timer-card").attr("href", link1);
    }
    if (link2 == undefined) {
      $("#timer-mobile-btn").attr("href", "#");
    } else {
      link2 = link2.replace("/content/royal-enfield", "");
      $("#timer-mobile-btn").attr("href", link2);
    }


    $("#mobile-img").attr("srcset", backgroundImgMobile);

    $("#desktop-img").attr("src", backgroundImgDesktop);

    $(".miy-notif-heading").html(header);

    $(".miy-bike-name").html(para);

    if(RetrieveConfigBtnText == ""){
		$("#retrieve-config-btn").hide();
    }

    $("#retrieve-config-btn").html(RetrieveConfigBtnText);
    $("#retrieve-config-btn").attr("href", RetrieveConfigLink);

    if(NewConfigBtnText == ""){
		$("#new-config-btn").hide();
    }

    $("#new-config-btn").html(NewConfigBtnText);
    $("#new-config-btn").attr("href", NewConfigLink);



    $(".miy-notification-wrapper .icon-close").click(function () {
        $(".miy-notification-wrapper").hide();
        $("body").removeClass("miy-popup-open-mobile");
    });

    const timer = Number($(".miy-notification-wrapper").attr("timer"));
    setTimeout(function () {
        $(".miy-notification-wrapper").css("display", "block");
        if ($(window).width() < 768) {
            $("body").addClass("miy-popup-open-mobile");
        }
    }, timer);
}

