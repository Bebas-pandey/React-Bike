$(function () {
    $("#languageSelectorAnalytics").click(function () {
        let logoUrl = $(this).attr("href");
        dataLayer.push({
            event: "header",
            eventCategory: "header",
            eventAction: "language selector",
            eventLabel: logoUrl,
            iconText: "language selector",
        });
    });

    $(document).on("click", ".languageSet", function () {
        let ctaText = $(this).text().trim();
        let nextPageURL = $(this).attr("href");
        let countrySelected = $(this).parent("div").siblings("h4").text().trim();
        if (nextPageURL == undefined) {
            nextPageURL = "";
        }
        dataLayer.push({
            event: "languageSelector",
            eventCategory: "languageSelector",
            eventAction: ctaText,
            eventLabel: nextPageURL ? nextPageURL : "NA",
            arrowPositions: "open",
            country: countrySelected,
        });
    });

    $(document).on("click", ".countryListClass", function () {
        let ctaText = $(this).attr("data-attr-name");
        let nextPageURL = $(this).attr("href");
        if (nextPageURL == undefined) {
            nextPageURL = "";
        }
        dataLayer.push({
            event: "languageSelector",
            eventCategory: "languageSelector",
            eventAction: ctaText,
            eventLabel: nextPageURL ? nextPageURL : "NA",
            arrowPositions: "open",
            country: "NA",
        });
    });

    // $(document).on("click", ".country-name", function () {
    // let ctaText = $(this).siblings("div").children(".languageSet").text().trim();
    // let nextPageURL = $(this).siblings("div").children(".languageSet").attr("href");
    // let countrySelected = $(this).text().trim();
    // if (nextPageURL == undefined) {
    // nextPageURL = "";
    // }
    // dataLayer.push({
    // event: "languageSelector",
    // eventCategory: "languageSelector",
    // eventAction: ctaText,
    // eventLabel: nextPageURL,
    // arrowPositions: "open",
    // country: countrySelected,
    // });
    // });
});

function updateImg() {
    let updatedName1 = localStorage.getItem("flagImg");
    if (updatedName1)
        $(".flag-selected").children("img").attr("src", updatedName1);
    localStorage.removeItem("flagImg")
}
let one;
let two;
$(document).ready(function () {
    const reHeader = $(".re-master");
    let updatedName = reHeader.attr("data-fullLanguageName");
    let updatedCountryName = reHeader.attr("data-fullCountryName");
    let defaultCountryCode = reHeader.attr("data-langcountry");
    let values = defaultCountryCode.split('_');
    one = values[0];
    two = values[1];
    if (typeof updatedName !== 'undefined' && typeof updatedCountryName !== 'undefined') {
        $(".lang-selected").html(updatedName);
    } else {
        $(".lang-selected").html(two);
    }
    $(document).on("click", ".region-box a", function () {
        $(".region-box h3").removeClass("active-red");
        $(this).children("h3").addClass("active-red");
        $(".region-select-wrapper").addClass("d-none");
        $(".country-select-wrapper").removeClass("d-none");
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });

    $("#back-step-region").click(function () {
        $(".country-select-wrapper").addClass("d-none");
        $(".region-select-wrapper").removeClass("d-none");
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });
    $(".lang-option-main").click(function () {
        $(".lang-option-main").removeClass("active-red");
        $(this).addClass("active-red");
        $(".country-name").removeClass("active-red");
        $(this).closest(".country-option-main").children(".country-name").addClass("active-red");
        let langName = $(this).val();
        console.log(langName);

    });
    $(".region-wise-lang").click(function () {
        let countryRegion = $(this).attr("data-countryregion");
        $(".region-name").each(function () {
            let checkCountry = $(this).text();
            if (checkCountry === countryRegion) {
                $(this).addClass("active-red");
            }

        });
    });
    $(".countryListClass").click(function () {
        let c = $(this).attr("data-attr");
        let windowSize = $(window).width();
        let regionName = $(this).attr("data-attr-name");
        let mobileimgValue = $(this).attr("data-imagem");
        let desktopimgValue = $(this).attr("data-imaged");
        let backImage = $(this).attr("data-backimage");
        let altTextM = $(this).attr("data-altm");
        let altTextD = $(this).attr("data-altd");
        $("#impName").html(regionName);
        if (windowSize < 768) {
            $(".back-image-mobile").css('background-image', 'url(' + mobileimgValue + ')');
        }
        $("#mobileImageID").attr("srcset", mobileimgValue);
        $("#desktopImageID").attr("src", desktopimgValue);
        $("#mobileImageID").attr("alt", altTextM);
        $("#desktopImageID").attr("alt", altTextD);
        setDataL(c);
    });
    $(document).on("click", ".languageSet", function () {
        let flagImg = $(this).parent(".lang-option").siblings(".country-name").parent(".country-option-main").siblings("img").attr("src");
        console.log(flagImg);
        localStorage.setItem("flagImg", flagImg);
    });
    updateImg();
});

function setDataL(country) {
    let updatedLanguage = two.toUpperCase();
    let templateScript = $("#handlebars-demo1").html();
    let template = Handlebars.compile(templateScript);
    let data = template(JSON.parse(country));
    $(".countriesList").html(data);
    $(".checkClass").each(function () {
        let countrycode = $(this).attr("data-countrycode");
        countrycode = countrycode.toLowerCase();
        console.log(countrycode);
        console.log(one);
        if (countrycode == one) {
            $(this).children(".country-name").addClass("active-red");
            $(this).children(".lang-option").children("." + updatedLanguage).addClass("active-red");
        }
    });
}
