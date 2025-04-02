/*GDPR [END]*/
$(document).ready(function() {

    var myDate=new Date();
    myDate.setDate(myDate.getDate()+90);
    var flag = "";
    var customeBuilderFlag = "";
    //Extracting cookies
    if (document.cookie.length != 0) {
        var namevaluepair = document.cookie.split("; ");
        for (var i = 0; i < namevaluepair.length; i++) {
            var namevaluearray = namevaluepair[i].split("=");
            if (namevaluearray[0] == "flag") {
                flag = namevaluearray[1];
            }
            if (namevaluearray[0] == "customeBuilderFlag") {
                customeBuilderFlag = namevaluearray[1];
            }
        }
    }
    if (flag != "true") {
        $(".gdprOld").css("display", "block");
        $(".gdpr-updated").css("display", "none");
    }

    $(".activeBtn").click(function() {
        if (flag != "true"){
            document.cookie = "flag=true; path=/; expires=" + myDate.toGMTString() +";";
            if ($(".gdpr-updated").hasClass("disc-custom-builder") && flag != "true") {
                window.location.href=window.location.href;
                $(".gdprOld").children(".accept-cookies").css("display", "none");
                $(".gdprOld").css("display", "block");
                $(".gdpr-updated").css("display", "block");
                $("#gdprDiv").show();
                $(".activeBtn").attr("href","#");
            }else if($(".gdpr-updated").hasClass("disc-custom-builder") && flag === "true"){
                $(".gdprOld").children(".accept-cookies").css("display", "none");
                $(".gdprOld").css("display", "block");
                $("#gdprDiv").show();
                $(".activeBtn").attr("href","#");
                document.cookie = "customeBuilderFlag=true; path=/; expires=" + myDate.toGMTString() + ";"
            }else if($("#gdprDiv").length < 0){
                $(".activeBtn").attr("href","#");
            }
        }else{
            if ($(".gdpr-updated").hasClass("disc-custom-builder") && flag === "true") {
                $(".gdprOld").children(".accept-cookies").css("display", "none");
                $(".gdprOld").css("display", "block");
                $("#gdprDiv").show();
                $(".activeBtn").attr("href","#");
                document.cookie = "customeBuilderFlag=true; path=/; expires=" + myDate.toGMTString() + ";"
            }else if($(".gdpr-updated").hasClass("disc-custom-builder") && flag != "true"){
                $(".gdprOld").children(".accept-cookies").css("display", "none");
                $(".gdprOld").css("display", "block");
                $(".gdpr-updated").css("display", "block");
                $("#gdprDiv").show();
                $(".activeBtn").attr("href","#");
            }
        }
        //$.cookie("flag", "true", { expires: myDate });
        //analytics code...
        let ctaText = $(this).text().trim();
        let nextUrl = $(this).attr("href");
        dataLayer.push({
            'event':'gdpr',
            'eventCategory':'gdpr',
            'eventAction':ctaText,
            'eventLabel':nextUrl
        });

    });

    if($(".gdpr-lang-selector").length) {
        $(".accept-cookies").hide();
        $("#customGDPR1").hide();
    }
    else{
        $("#cta-1").hide();
        $("#gdprDiv").hide();
    }

    if (flag === "true" && customeBuilderFlag != "true" && $(".gdpr-updated").hasClass("disc-custom-builder")) {
        $(".gdpr-updated").css("display", "block");
        $(".gdprOld").children(".accept-cookies").css("display", "none");
        $(".gdprOld").css("display", "block");
        $("#gdprDiv").show();
    }
    if (flag != "true" && customeBuilderFlag != "true" && $(".gdpr-updated").hasClass("disc-custom-builder")) {
        $(".activeBtn").attr("href","javascript:void(0);");
    }
  /*  $(".buttonClick").each(function() {
        const reHeader = $(".re-master");
        let defaultCountryCode = reHeader.attr("data-langcountry");
        let values=defaultCountryCode.split('_');
        let two=values[1];
        let updatedLanguage = two.toUpperCase();
        let classAvail = $(this).hasClass(updatedLanguage);
        console.log(classAvail);
        if(classAvail == true){
            $(this).addClass("active-border-red");
        }
    });*/
    $(".buttonClick").click(function() {
        let heading = $(this).attr("data-heading");
        let description = $(this).attr("data-description");
        let ctaText = $(this).attr("data-ctaText");
        let ctaLink = $(this).attr("data-ctaLink");
        $("#head1").html(heading);
        $("#descr-1").html(description);
        $("#cta-1").html(ctaText);
        $("#cta-1").attr("href",ctaLink);
        $(".accept-cookies").show();
        $(".buttonClick").removeClass("active-border-red");
        $(this).addClass("active-border-red");
    });


    $(document).on("click","#close-gdpr1",function() {
        $(".cookieDiv").css("display", "none");
        let newPath = "/in/en/home"
        window.location.replace(newPath);

        //analytics code...
        dataLayer.push({
            'event':'gdpr',
            'eventCategory':'gdpr',
            'eventAction':'close',
            'eventLabel':""
        });
    });
    $(document).on("click","#close-gdpr",function() {
        if($(".gdpr-updated").hasClass("disc-custom-builder") && customeBuilderFlag !="true"){
            let newPath = "/in/en/home"
            window.location.replace(newPath);
        }
        else
            $(".cookieDiv").css("display", "none");
        //analytics code...
        dataLayer.push({
            'event':'gdpr',
            'eventCategory':'gdpr',
            'eventAction':'close',
            'eventLabel':""
        });
    });
});
/*GDPR [END]*/

$(function () {
  $(document).on("click", "#donotphone,#donotemail,#communityactivities,#promotionsnews,#surveysandresearch,#allpromotions,#donnotwhatsapp", function () {
    let placehoderTextGdpr = $(this).parent(".lab").siblings(".customItemsCheckbox").children("p").text().trim();
    let headingName = $("#gdpr-consent-form").parent().find("h2").text();
    let currentUrl = window.location.href;
    let modelCode = $("#bookNowBtn").attr("model-code");
    if (currentUrl.includes("uk") && modelCode.toLowerCase()=="shotgun 650") {
      if ($(this).is(':checked')) {
        dataLayer.push({
          'event': 'bookTestRideComponent',
          'eventCategory': 'bookTestRideComponent',
          'eventAction': headingName,
          'eventLabel': placehoderTextGdpr
        });
      }
    } else {
      dataLayer.push({
        'event': 'gdprConsentForm',
        'eventCategory': 'gdprConsentForm',
        'eventAction': placehoderTextGdpr
      })
    }
  });
});
