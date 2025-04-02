"use strict";
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function generateHMAC(data) {
    const secretKey = document.querySelector(".langCountryDiv").getAttribute("data-custom-key"); // need to remove
    // Encode the secret key and data
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKey);
    const messageData = encoder.encode(JSON.stringify(data));

    // Import the secret key
    const cryptoKey = await crypto.subtle.importKey(
        'raw',         // Raw key material
        keyData,       // Key data
        { name: 'HMAC', hash: { name: 'SHA-256' } }, // Algorithm and hash function
        false,         // Non-extractable
        ['sign']       // Allowed operations
    );

    // Generate the HMAC
    const signature = await crypto.subtle.sign(
        'HMAC',        // Algorithm name
        cryptoKey,     // Crypto key
        messageData    // Data to sign
    );

    // Convert the signature to a hex string
    return Array.from(new Uint8Array(signature))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

async function verifyHMAC(response) {
    // Extract the received hash and the data to verify
    const receivedHash = response.hmac;
    const dataToVerify = { ...response };
    delete dataToVerify.hmac; // Exclude the hash from the data

    // Recalculate the hash using the generateHMAC function
    const recalculatedHash = await generateHMAC(dataToVerify);

    // Compare the hashes securely (timing-attack safe)
    return receivedHash === recalculatedHash;
}


async function verifyToken(url, type, generateUrl) {
    if (type == "promise") {
        return new Promise(async function (resolve, reject) {
            var user = {};
            var userId = "";
            var userName = "";
            var jwtAccessToken = "";
            var refreshToken = "";
            var subDomainCookieName = $("#login-link").attr("data-runmode");
            if (document.cookie.length != 0) {
                var userFetchedData;
                var fetchedData = getCookie(subDomainCookieName);
                if (fetchedData) {
                    userFetchedData = window.atob(fetchedData);
                    userFetchedData = userFetchedData.split("#");
                    userId = userFetchedData[0];
                    refreshToken = userFetchedData[1];
                    jwtAccessToken = userFetchedData[2];
                }

                if (!userId) {
                } else if (userId) {
                    // HMAC code 
                    const data = {};
                    const hmac = await generateHMAC(data);

                    $.ajax({
                        url: `${url}?hmac=${hmac}`,
                        method: "GET",
                        beforeSend: function (jqXHR, settings) {
                            jqXHR.setRequestHeader('authorization', jwtAccessToken);
                        },
                        success: async function (result) {
                            if (result.code == 200) {
                                let responseHMAC = await verifyHMAC(result);
                                console.log({ responseHMAC });
                                if (responseHMAC) {
                                    user = result.data;
                                    userId = user._id;
                                    userName = user.fname;
                                    resolve(result.data);
                                } else {
                                    reject(false)
                                }
                            } else if (result.code == 401 || result.code == 402) {
                                var data = {
                                    "userId": userId,
                                    "refreshToken": refreshToken
                                };

                                // HMAC code
                                const hmac = await generateHMAC(data);
                                console.log("==HMAC=generateHMAC=", { hmac });

                                $.ajax({
                                    url: generateUrl,
                                    method: "POST",
                                    data: { ...data, hmac },
                                    success: async function (res) {
                                        if (res.code == 200) {
                                            let responseHMAC = await verifyHMAC(res);
                                            console.log("==HMAC=generateHMAC verifyHMAC=", { responseHMAC });

                                            if (responseHMAC) {
                                                jwtAccessToken = res.data;
                                                var codomainData = userId + "#" + refreshToken + "#" + jwtAccessToken;
                                                codomainData = btoa(codomainData);

                                                function setCoDomainCookie(cdname, cdvalue, dexdays) {
                                                    var d = new Date();
                                                    d.setTime(d.getTime() + dexdays * 24 * 7 * 60 * 60 * 1000);
                                                    var expires = "expires=" + d.toUTCString();
                                                    document.cookie = cdname + "=" + cdvalue + ";" + expires + ";domain=.royalenfield.com ;Secure=true ;SameSite=Strict ;path=/";
                                                }
                                                setCoDomainCookie(subDomainCookieName, codomainData, 180);

                                                setAjaxFilter();
                                                $.ajax({
                                                    url: url,
                                                    method: "GET",
                                                    success: function (result) {
                                                        if (result.code == 200) {
                                                            user = result.data;
                                                            userId = user._id;
                                                            userName = user.fname;
                                                            resolve(result.data);
                                                        }
                                                    }
                                                });
                                            } else {
                                                document.cookie = subDomainCookieName + "=; domain=.royalenfield.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                                                window.location.assign($("#Logout").attr("href"));
                                                reject(false)
                                            }
                                        } else {
                                            document.cookie = "user" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                                            document.cookie = subDomainCookieName + "=; domain=.royalenfield.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                                            window.location.assign($("#Logout").attr("href"));
                                            reject(false)
                                        }
                                    },
                                    error: function (error) {
                                        reject(false)
                                    }
                                });
                            } else {
                                reject(false)
                            }
                        },
                        error: function (err) {
                            reject(false)
                        }
                    });
                }
            }
        });
    } else {
        var user = {};
        var userId = "";
        var userName = "";
        var jwtAccessToken = "";
        var refreshToken = "";

        if (document.cookie.length != 0) {
            var namevaluepair = document.cookie.split("; ");
            for (var i = 0; i < namevaluepair.length; i++) {
                var namevaluearray = namevaluepair[i].split("=");
                if (namevaluearray[0] == "user") {
                    user = JSON.parse(namevaluearray[1]);
                    userId = user.userId;
                }
            }
            if (!userId) {
            } else if (userId) {
                var userFetchedData;
                var fetchedData = getCookie(subDomainCookieName);
                if (fetchedData) {
                    userFetchedData = window.atob(fetchedData);
                    userFetchedData = userFetchedData.split("#");
                    refreshToken = userFetchedData[1];
                    jwtAccessToken = userFetchedData[2];
                }

                const data = {};
                const hmac = await generateHMAC(data);
                $.ajax({
                    url: `${url}?hmac=${hmac}`,
                    method: "GET",
                    success: async function (result) {
                        if (result.code == 200) {
                            let responseHMAC = await verifyHMAC(result);
                            console.log({ responseHMAC });
                            if (responseHMAC) {
                                user = result.data;
                                userId = user._id;
                                userName = user.fname;
                                return true;
                            } else {
                                return false;
                            }
                        }
                        else if (result.code == 401 || result.code == 402) {
                            var data = {
                                "userId": userId,
                                "refreshToken": refreshToken
                            };
                            // HMAC code
                            const hmac = await generateHMAC(data);
                            console.log("==HMAC=generateHMAC=", { hmac });
                            $.ajax({
                                url: generateUrl,
                                method: "POST",
                                data: { ...data, hmac },
                                success: async function (res) {
                                    if (res.code == 200) {
                                        let responseHMAC = await verifyHMAC(result);
                                        console.log({ responseHMAC });
                                        if (responseHMAC) {
                                            jwtAccessToken = res.data;
                                            setAjaxFilter();
                                            return true;
                                        } else {
                                            document.cookie = "user" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                                            document.cookie = subDomainCookieName + "=; domain=.royalenfield.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                                            window.location.assign($("#Logout").attr("href"));
                                            return false;
                                        }
                                    } else {
                                        document.cookie = "user" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                                        document.cookie = subDomainCookieName + "=; domain=.royalenfield.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                                        window.location.assign($("#Logout").attr("href"));
                                        return false;
                                    }
                                },
                                error: function (error) {
                                    return false;
                                }
                            });
                        }
                    },
                    error: function (err) {
                        return false;
                    }
                });
            }
        }
    }

}
    var GAFeedbackFlag = false; 
    var GAFeedbackUserName = "";
    var GAFeedbackMotorcycle = "";
    var dataLoadFlag = "false";
    function gaFeedback(username,motorcycleName){
        GAFeedbackFlag = true;
        GAFeedbackUserName = username;
        GAFeedbackMotorcycle = motorcycleName;
        if(dataLoadFlag == "true"  && GAFeedbackFlag == true){
            getFeedbackDetails(GAFeedbackUserName,GAFeedbackMotorcycle);
        }
    }

     function fetchGADetails(dataFlag){
         dataLoadFlag = dataFlag;
        if(dataFlag == "true"  && GAFeedbackFlag == true){
            getFeedbackDetails(GAFeedbackUserName,GAFeedbackMotorcycle);
        }
     }

//common js || need for all the pages [START] || >>>>> Always keep on overwriting the Latest file <<<<
var subDomainCookieName;
var fetchedJwt;
$(document).ready(function () {
    //tabs with content [START]
    $(".tab-link").click(function () {
        $(".tab-content").removeClass("tab-current");
        var tab_con = $(this).attr("data-class");
        $(".tab-content." + tab_con).addClass("tab-current");

        if (!$(this).hasClass("tab-active")) {
            $(".tab-link").removeClass("tab-active");
            $(this).addClass("tab-active");
        }
    });
    //tabs with content [END]

    //Share button
    $(".share-links button").on("click", function () {
        $(".share-links").toggleClass("sl-open");
    });
    //Components changing the color [START]
    $(".card-comp.black").each(function () {
        $(this)
            .find(".custom-btn")
            .addClass("clr-b");
    });
    $(".card-comp.white").each(function () {
        $(this)
            .find(".custom-btn")
            .addClass("clr-w");
    });
    //Components changing the color [END]
    //section scroll up
    $(".scroll-next-section").on("click", function () {
        $("html, body").animate({
                scrollTop: $(this)
                    .parent()
                    .offset().top - 0
            },
            500
        );
    });
});

//carousel's
$(document).ready(function () {

    //mini-carousel-grid-four
    $(".mini-carousel-grid-4").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        infinite: false,
        speed: 1000,
        touchThreshold: 15,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 200,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: true,
                    touchThreshold: 15,
                    speed: 200
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: true,
                    touchThreshold: 15,
                    speed: 200
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //mini-carousel-grid-three
    $(".mini-carousel-grid-3").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        infinite: false,
        speed: 1000,
        touchThreshold: 15,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 150,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: true,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 330,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    dots: true,
                    touchThreshold: 15
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //mini-carousel-grid-two
    $(".mini-carousel-grid-2").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        infinite: false,
        speed: 1000,
        touchThreshold: 15,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 150,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: true,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 330,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    dots: true,
                    touchThreshold: 15
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });



    $(".rider-mania-highlights").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        dots: false,
        infinite: false,
        autoplay: true,
        speed: 1000,
        touchThreshold: 15,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 150,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    infinite: true,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 330,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    touchThreshold: 15
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });


    $(".carousel-event-highlights").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        dots: true,
        infinite: false,
        autoplay: true,
        speed: 1000,
        touchThreshold: 15,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 150,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    infinite: true,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 330,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    touchThreshold: 15
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //rider-mania-carousel-grid-four
    $(".rm-carousel-grid-4").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        infinite: true,
        speed: 1000,
        touchThreshold: 15,
        autoplay: true,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 200,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15,
                    speed: 200
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15,
                    speed: 200
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //rider-mania-carousel-grid-three
    $(".rm-carousel-grid-3").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        autoplay: true,
        infinite: true,
        speed: 1000,
        touchThreshold: 15,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 150,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 330,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    touchThreshold: 15
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //rider-mania-carousel-grid-two
    $(".rm-carousel-grid-2").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        touchThreshold: 15,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 150,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 330,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
                    focusOnSelect: true,
                    touchThreshold: 15
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //carousel-grid-four
    $(".carousel-grid-4").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        infinite: false,
        speed: 1000,
        touchThreshold: 15,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 200,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15,
                    speed: 200
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15,
                    speed: 200
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //carousel-grid-three
    $(".carousel-grid-3").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        infinite: false,
        speed: 1000,
        touchThreshold: 15,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 150,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 330,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    touchThreshold: 15
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //carousel-grid-two
    $(".carousel-grid-2").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        infinite: false,
        speed: 1000,
        touchThreshold: 15,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 150,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    infinite: true,
                    dots: false,
                    touchThreshold: 15
                }
            },
            {
                breakpoint: 330,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "15px",
                    focusOnSelect: true,
                    touchThreshold: 15
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //carousel dots
    $(".carousel-slider-dots").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: false,
        infinite: true,
        speed: 1000,
        autoplay: false,
        touchThreshold: 15
    });

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    setAjaxFilter();

});

function setAjaxFilter() {
    //Code to Set Language and Country Code
    var countryLang = "";
    var country = "";
    var language = "";
    var jwtToken = "";
    countryLang = $(".langCountryDiv").attr("data-langCountry");

    subDomainCookieName = $("#login-link").attr("data-runmode");
    var userFetchedData;
    var fetchedUserID;
    var fetchedRtk;
    var fetchedData = getCookie(subDomainCookieName);
    if (fetchedData) {
        userFetchedData = window.atob(fetchedData);
        userFetchedData = userFetchedData.split("#");
        fetchedUserID = userFetchedData[0];
        fetchedRtk = userFetchedData[1];
        fetchedJwt = userFetchedData[2];
    }

    if (countryLang != undefined && countryLang != "") {
        country = countryLang.split("_")[0];
        language = countryLang.split("_")[1];
    }
    if (fetchedJwt) {
        jwtToken = fetchedJwt;
        //console.log(jwtToken);
        $.ajaxSetup({
            headers: {
                "x-custom-language": language,
                "x-custom-country": country,
                "app_id": "1",
                authorization: jwtToken
            }
        });
    } else {
        $.ajaxSetup({
            headers: {
                "x-custom-language": language,
                "x-custom-country": country,
                "app_id": "1"
            }
        });
    }
}

//progress slider
$(document).ready(function () {
    var time = 4;
    var $bar, $slick, isPause, tick, percentTime;

    $slick = $(".carousel-slider-progress");
    $slick.slick({
        draggable: false,
        adaptiveHeight: false,
        dots: false,
        arrows: false,
        mobileFirst: true,
        pauseOnHover: true,
        fade: true,
        speed: 300
    });

    $bar = $(".slider-progress .progress");

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        isPause = false;
        tick = setInterval(interval, 10);
    }

    function interval() {
        if (isPause === false) {
            percentTime += 1 / (time + 0.1);
            $bar.css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $slick.slick("slickNext");
                startProgressbar();
            }
        }
    }

    function resetProgressbar() {
        $bar.css({
            width: 0 + "%"
        });
        clearTimeout(tick);
    }

    startProgressbar();
});
//end of progress slider

//*** smooth scroll hashtag with nav active *** //
$(document).ready(function () {
    $("section").each(function () {
        if ($(this).hasClass("motorcycle-specifications")) {
            $(this).addClass("scroll-highlights");
        }
    });

    $('.secondary-navigation a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ?
                    target :
                    $("[name=" + this.hash.slice(1) + "]");
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $("html, body").animate({
                            scrollTop: target.offset().top - 60
                        },
                        1000,
                        function () {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) {
                                // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            }
                        }
                    );
                } else {
                    var ntarget = this.hash;
                    ntarget = ntarget.substring(1, ntarget.length);
                    target = $("." + ntarget);
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $("html, body").animate({
                                scrollTop: target.offset().top - 60
                            },
                            1000,
                            function () {
                                // Callback after animation
                                // Must change focus!
                                var $target = $(target);
                                $target.focus();
                                if ($target.is(":focus")) {
                                    // Checking if the target was focused
                                    return false;
                                } else {
                                    $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                                    $target.focus(); // Set focus again
                                }
                            }
                        );
                    }
                }
            }
        });
});

$(window)
    .scroll(function () {
        var scrollDistance = $(window).scrollTop();
        var sectionId = "";
        if ($("#gallery").length)
            $(".secondary-sticky-nav li a").removeClass("active");
        var sectionClass = "";
        // Assign active class to nav links while scolling
        $(".scroll-highlights").each(function () {
            if ($(this).position().top - 133 <= scrollDistance) {
                sectionId = $(this).attr("id");
                sectionClass = $(this);

                $(".secondary-sticky-nav li a").removeClass("active");

                $(".secondary-sticky-nav li a").each(function () {
                    var menu_href = $(this).attr("href");
                    if (menu_href) {
                        menu_href = menu_href.substring(1, menu_href.length);
                    }

                    if ($(this).attr("href") == "#" + sectionId) {
                        $(this).addClass("active");
                    } else if (sectionClass.hasClass(menu_href)) {
                        $(this).addClass("active");
                    }
                });
            }

            var gallery_height = $("#gallery").height();
            if ($("#gallery").position()) {
                //console.log("gallery position");
                if ($("#gallery").position().top + gallery_height <= scrollDistance) {
                    $(".secondary-sticky-nav li a").removeClass("active");
                }
            }
        });
    })
    .scroll();
//*** end of smooth scroll hashtag with nav active *** //

//animate element [START] --> common for all the pages <--
$(document).ready(function () {
    var $animation_elements = $(".animation-element");
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = window_top_position + window_height;

        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = element_top_position + element_height;

            //check to see if this current container is within viewport
            if (
                element_bottom_position >= window_top_position &&
                element_top_position <= window_bottom_position
            ) {
                $element.addClass("in-view");
            } else {
                $element.removeClass("in-view");
            }
        });
    }

    $window.on("scroll resize", check_if_in_view);
    $window.trigger("scroll");
});
//animate element [END]

//placeholder IE [START]
$(document).ready(function () {
    function add() {
        if ($(this).val() === "") {
            $(this)
                .val($(this).attr("placeholder"))
                .addClass("placeholder");
        }
    }

    function remove() {
        if ($(this).val() === $(this).attr("placeholder")) {
            $(this)
                .val("")
                .removeClass("placeholder");
        }
    }
    // Create a dummy element for feature detection
    if (!("placeholder" in $("<input>")[0])) {
        // Select the elements that have a placeholder attribute
        $("input[placeholder], textarea[placeholder]")
            .blur(add)
            .focus(remove)
            .each(add);

        // Remove the placeholder text before the form is submitted
        $("form").submit(function () {
            $(this)
                .find("input[placeholder], textarea[placeholder]")
                .each(remove);
        });
    }
});
//placeholder IE [END]

//file upload [START]
$(function () {
    // We can attach the `fileselect` event to all file inputs on the page
    $(document).on("change", ":file", function () {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input
            .val()
            .replace(/\\/g, "/")
            .replace(/.*\//, "");
        input.trigger("fileselect", [numFiles, label]);
    });

    // We can watch for our custom `fileselect` event like this
    $(document).ready(function () {
        $(":file").on("fileselect", function (event, numFiles, label) {
            var input = $(this)
                .parents(".file-group")
                .find(":text"),
                log = numFiles > 1 ? numFiles + " files selected" : label;

            if (input.length) {
                input.val(log);
            } else {
                if (log) {}
            }
        });
    });
});

$(function () {
    $(document)
        .on("click", ".icon-plus", function (e) {
            e.preventDefault();

            var controlForm = $(".file-wrapper:first"),
                currentEntry = $(this).parents(".file-group:first"),
                newEntry = $(currentEntry.clone()).appendTo(controlForm);

            newEntry.find("input").val("");
            controlForm
                .find(".file-group:not(:last) .custom-btn")
                // .removeClass('icon-plus').addClass('icon-minus')
                // .removeClass('icon-plus').addClass('icon-minus')
                .html('<span class="icon-minus"></span>');

            $(":file").on("fileselect", function (event, numFiles, label) {
                var input = $(this)
                    .parents(".file-group")
                    .find(":text"),
                    log = numFiles > 1 ? numFiles + " files selected" : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log) {}
                }
            });
        })
        .on("click", ".icon-minus", function (e) {
            $(this)
                .parents(".file-group:first")
                .remove();
            e.preventDefault();
            return false;
        });
});
//file upload [END]

$(document).ready(function () {
    //IE Browser Support Picture Tag
    picturefill();
    //Picture tag script [END]

    //Banner elements empty check
    $(
        ".re-banner .banner-inner-txt h1:empty, .re-banner .banner-inner-txt h2:empty"
    ).remove();
    $(".re-banner .banner-inner-txt p:empty").remove();

    //Accept Cookies
    $(".accept-cookies button").on("click", function () {
        $(".accept-cookies-wrapper").removeClass("ac-active");
    });

    //Video Control's [START]
    //Play&Pause [START]
    var videoPlay = $(".video-source video").get(0);
    if (videoPlay !== undefined) {
        if (videoPlay.paused) {
            videoPlay.play();
            $(".icon-play").hide();
            $(".icon-pause").show();
        } else {
            videoPlay.pause();
            $(".icon-play").show();
            $(".icon-pause").hide();
        }
    }

    //Tab's && Mobile's
    if ($(window).width() < 1090) {
        var videoPlay = $(".video-source video").get(0);
        if (videoPlay !== undefined) {
            if (videoPlay.paused) {
                videoPlay.pause();
                $(".icon-play").show();
                $(".icon-pause").hide();
            } else {
                videoPlay.pause();
                $(".icon-play").show();
                $(".icon-pause").hide();
            }
        }
    }

    $(document).on("click", ".video-play-overlay .video-play-btn", function () {
        var videoPlay = $(this).parent(".video-play-overlay").parent(".video-box").children("video.vid").get(0);
        var videoMobilePlay = $(this).parent(".video-play-overlay").parent(".video-box").children("video.vid").get(1);
        if (videoPlay) {
            if (videoPlay.paused) {
                videoPlay.play();
                $(this).children(".icon-play").hide();
                $(this).children(".icon-pause").show();
                $(this).parent(".video-play-overlay").parent(".video-box").children("video.vid").addClass('isPlaying');
            } else {
                videoPlay.pause();
                $(this).children(".icon-play").show();
                $(this).children(".icon-pause").hide();
                $(this).parent(".video-play-overlay").parent(".video-box").children("video.vid").removeClass('isPlaying');
            }
        }

        if ($(window).width() <= 767) { 
            if (videoMobilePlay) {
                if (videoMobilePlay.paused) {
                    videoMobilePlay.play();
                    $(this).children(".icon-play").hide();
                    $(this).children(".icon-pause").show();
                    $(this).parent(".video-play-overlay").parent(".video-box").children("video.vid").addClass('isPlaying');
                } else {
                    videoMobilePlay.pause();
                    $(this).children(".icon-play").show();
                    $(this).children(".icon-pause").hide();
                    $(this).parent(".video-play-overlay").parent(".video-box").children("video.vid").removeClass('isPlaying');
                }
            }
        }

        return false;
    });
    //Play&Pause [END]

    //Muted&&Unmuted [START]
    $(document).on("click", ".video-mute", function () {
        var videoMute = $(this).parent(".video-box").children("video.vid").get(0);
        if (videoMute.muted) {
            videoMute.muted = false;
            $(this).children(".icon-muted").hide();
            $(this).children(".icon-unmute").show();
            //console.log("UnMuted on click");
        } else {
            videoMute.muted = true;
            $(this).children(".icon-muted").show();
            $(this).children(".icon-unmute").hide();
            //console.log("Muted on click");
        }
    });

    var videoMute = $(".video-source video");
    if (videoMute !== undefined) {
        if (videoMute.muted) {
            videoMute.muted = false;
            $(".icon-muted").hide();
            $(".icon-unmute").show();
            //console.log("UnMuted");
        } else {
            videoMute.muted = true;
            $(".icon-muted").show();
            $(".icon-unmute").hide();
            //console.log("UnMuted");
        }
    }
    //Muted&&Unmuted [END]
    //Video Control's [END]

    //Secondary nav find if any
    if ($(".secondary-sticky-header").length) {
        $("body").addClass("secondary-nav-active");
    }
});

$(document).ready(function () {});

$(document).ready(function () {
    var localStorgae = localStorage.getItem("jwtAccessToken");
    var userUrl = $(".header .langCountryDiv").attr("data-user-verification-url");
    if (localStorgae) {

        verifyToken(userUrl, "");


        // $.ajax({
        //     url: userUrl,
        //     type: "Post",
        //     headers: {
        //         authorization: localStorgae
        //     },
        //     success: function(res) {},
        //     error: function(err) {
        //         if (err.status == 401) {
        //             localStorage.removeItem("jwtAccessToken");
        //             location.reload();
        //         }
        //     }
        // });
    }
});
//common js [END]
//header js [START]
$(document).ready(function() {

  let loginTrue = localStorage.getItem("loginTrue");
    let countryTrue = localStorage.getItem("countryTrue");
    let searchTrue = localStorage.getItem("searchTrue");
    if(loginTrue === "true") {
        $("body").addClass("login_show");
        localStorage.removeItem("loginTrue");
    }
    if(countryTrue === "true") {
        $("body").addClass("language-open");
        localStorage.removeItem("countryTrue");
    }
    if(searchTrue === "true") {
        $(".search").addClass("s-active");
        $(".search-bar")
            .find("input")
            .focus();
        $(".search-section").css("display", "block");
        localStorage.removeItem("searchTrue");
    }

    
  //Sticky header [START]
  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 0;
  var navbarHeight = $("header .header").outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(window).scrollTop();
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;
    // add here scroll element things
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      if (!$("body").hasClass("body-scroll-stop")) {
        $("body").addClass("header-sticky");
        $(".follow-sticky-header").removeClass("fsh-scroll");
        $(".breadcrumb-outer").addClass("fixed");
      }

      if ($("body").hasClass("login_show")) {
        $("body").removeClass("header-sticky");
      }

      if ($("body").hasClass("language-open")) {
        $("body").removeClass("header-sticky");
      }

      $(".nav-primary .has-children").click(function() {
        $("body").remove("header-sticky");
      });
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $("body").removeClass("header-sticky");
        $(".follow-sticky-header").addClass("fsh-scroll");
        $(".breadcrumb-outer").removeClass("fixed");

        $(".nav-primary .has-children").click(function() {
          $("body").remove("header-sticky");
        });
      }
    }

    lastScrollTop = st;
  }
  //Sticky header [END]

  //Nav Menu [START]
  $(".nav-primary .has-children").click(function() {
    $("body").toggleClass("body-scroll-stop");
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(".nav-primary .has-children").removeClass("active");
      $(this).addClass("active");
      $("body").addClass("body-scroll-stop");
    }

    $(this)
      .find(".nav-secondary")
      .toggleClass("nav-dropdown");
    $(this)
      .siblings()
      .find(".nav-secondary")
      .removeClass("nav-dropdown");

    //login popup close
    $("body").removeClass("login_show");

    //Language dropdown close
    $("body").removeClass("language-open");
  });

  $(".nav-secondary .has-sub-children").click(function() {
    $(this)
      .find(".nav-children")
      .addClass("active");
    $(this)
      .siblings()
      .find(".nav-children")
      .removeClass("active");
  });

  $(".nav-secondary").click(function(e) {
    e.stopPropagation();
  });
  //Nav Menu [END]

  if ($(window).width() < 767) {
    $(".nav-primary .has-children").click(function() {
      $("body").addClass("body-scroll-stop");
    });
  }

  //If the Dropdown is active Then Body class will be added || DESKTOP ONLY
  $(window).resize(function() {
    if ($(window).width() > 768) {
      if ($(".nav-primary .has-children").hasClass("active")) {
        $("body").addClass("body-scroll-stop");
      }
    }
  });
  //End

  //If empty text remove the element
  $(".secondary-sticky-nav li a:empty")
    .parent()
    .remove();
  $(".secondary-sticky-right a:empty").remove();
  //End

  //If window resize Body class will be removed MOBILE ONLY
  $(window).resize(function() {
    if ($(window).width() < 767) {
      $("body").removeClass("body-scroll-stop");

      if ($(".nav-primary").hasClass("np-open")) {
        $("body").addClass("body-scroll-stop");
      }
    }
  });
  //End

  //Mobile hanburger
  $(".nav-hamburger").on("click", function() {
    $(this).toggleClass("is-active");
    $(".nav-primary").toggleClass("np-open");
    $("body").toggleClass("body-scroll-stop");
    // $('.login-mobi').toggleClass('active');

    //login popup remove
    $("body").removeClass("login_show");

    //language dropdown remove
    $("body").removeClass("language-open");

    //Close Secondary Nav
    $("body").removeClass("secondary-sticky-nav-open");
  });
  //End

  //Mobile hanburger trigger to Now trending
  $(".nav-hamburger").on("click", function() {
    //now trending action
    $(".sticky-links-box").toggleClass("sl-head-show");
    $(".sticky-links-box").removeClass("sl-open");
  });
  //quick links [END]

  //All the pages Header Secondary navigation for mobile dropdown list [START]
  function mobileView() {
    if ($(window).width() < 1090) {
      function scroll(element){   
          var ele = document.getElementById(element);   
          window.scrollTo(ele.offsetLeft,ele.offsetTop); 
      }
      $(".secondary-sticky-nav-trigger, .header-sticky .secondary-sticky-nav-trigger").on("click", function(event) {
        $("body").toggleClass("secondary-sticky-nav-open");
        event.preventDefault();
      });

      $(".secondary-sticky-nav li a").on(" click", function(event) {
        var scrollSectId = $(this).attr("href");
        scrollSectId = scrollSectId.replace('#', '');
        scroll(scrollSectId);
        $("body").removeClass("secondary-sticky-nav-open");
        event.stopPropagation();


        //Close Nav Dropdown
        $(".nav-primary .has-children").removeClass("active");
        $(".nav-primary .has-children")
          .siblings()
          .find(".nav-secondary")
          .removeClass("nav-dropdown");

        //login popup remove
        $("body").removeClass("login_show");

        //language dropdown remove
        $("body").removeClass("language-open");
      });
    } else {
    }
  }
  mobileView();
  $(window).resize(function() {
    mobileView();
  });
  //All the pages Header Secondary navigation for mobile dropdown list [END]

  //Header Search [START]
  $(".search .icon-search").click(function() {
    $(".search").addClass("s-active");
    $(".search-bar")
      .find("input")
      .focus();

    //Close Nav Dropdown
    $(".nav-primary .has-children").removeClass("active");
    $(".nav-primary .has-children")
      .siblings()
      .find(".nav-secondary")
      .removeClass("nav-dropdown");

    //Close Nav Mobile
    $(".nav-hamburger").removeClass("is-active");
    $(".nav-primary").removeClass("np-open");

    //Remove Sticky Links
    $(".sticky-links-box").removeClass("open sl-head-show");

    //body scroll enable
    $("body").removeClass("body-scroll-stop");

    //Close Secondary Nav
    $("body").removeClass("secondary-sticky-nav-open");
  });
  $(".search .search-close").click(function() {
    $(".search").removeClass("s-active");
  });

  //search autocomplete start
  $.extend($.ui.autocomplete.prototype.options, {
    open: function(event, ui) {
      $(this)
        .autocomplete("widget")
        .css({
          width: $(this).width() + "px"
        });
    }
  });
  $(window).on('load',function() {
    $(function() {
      //$( "#header-search" ).autocomplete({
      //	source: availableTags
      //});
    });
  });
  //search autocomplete end
  //Header Search [END]
});

//Login Popup [START]
$(document).ready(function() {
  //forgot password action
  $(".forgot_password").click(function() {
    $(".login_form_holder").addClass("f_password");
  });
  //go back from forgot password
  $(".go_back").click(function() {
    $(".login_form_holder").removeClass("f_password");
  });
  //login box open
  $(".login > a, .login_overlayer").click(function() {
    $("body").toggleClass("login_show");
    $(".nav-hamburger").removeClass("is-active");
    $(".nav-primary").removeClass("np-open");

    //Remove Sticky Links
    $(".sticky-links-box").removeClass("open sl-head-show");

    //Close Nav Dropdown
    $(".nav-primary .has-children").removeClass("active");
    $(".nav-primary .has-children")
      .siblings()
      .find(".nav-secondary")
      .removeClass("nav-dropdown");

    //Close Nav Dropdown for Mobile
    $(".nav-hamburger").removeClass("is-active");
    $(".nav-primary").removeClass("np-open");
    $("body").removeClass("body-scroll-stop");

    //Language dropdown close
    $("body").removeClass("language-open");

    //Close Secondary Nav
    $("body").removeClass("secondary-sticky-nav-open");
  });

  $(".login-click").click(function() {
    $("body").addClass("login_show");
  });
});
//Login Popup [END]

//Language Selector [START]
$(document).ready(function() {
  //Language dropdown open
  $(".language").click(function() {
    $("body").toggleClass("language-open");
    $(".nav-hamburger").removeClass("is-active");
    $(".nav-primary").removeClass("np-open");

    //Remove Sticky Links
    $(".sticky-links-box").removeClass("open sl-head-show");

    //Close Nav Dropdown
    $(".nav-primary .has-children").removeClass("active");
    $(".nav-primary .has-children")
      .siblings()
      .find(".nav-secondary")
      .removeClass("nav-dropdown");

    //Close Nav Dropdown for Mobile
    $(".nav-hamburger").removeClass("is-active");
    $(".nav-primary").removeClass("np-open");
    $("body").removeClass("body-scroll-stop");

    //login popup close
    $("body").removeClass("login_show");

    //Close Secondary Nav
    $("body").removeClass("secondary-sticky-nav-open");
  });
});
//Language Selector [END]

$(document).ready(function() {
	
	
  function pr2Resize() {
    var logprofileHeight = $(".logged-in .profile-image").width();
    $(".logged-in .profile-image").css("height", logprofileHeight + "px");
  }

  pr2Resize();

  $(window).resize(function() {
    pr2Resize();
  });

});

//header js [END]


// new navigation changes
$(document).ready(function () {
  $(".nav-wrapper .nav-primary li").on("click", function () {
     $(".nav-wrapper .nav-primary li").not(this).removeClass("active");
    //  $(this).toggleClass("active");
    if ($(this).find(".mobile-nav-dd").length > 0) {
        $(this).toggleClass("active");
    }
  });
  if ($(window).width() < 768) {
    $(".mobile-nav-dd .back-nav-btn").on("click", function (event) {
      event.stopPropagation();
      $(this).closest(".nav-primary").addClass("np-open");
      $(this).closest(".mobile-nav-dd").parent("li").removeClass("active");
    });
    $(".mobile-nav-dd").on("click", function (event) {
      if ($(event.target).hasClass("back-nav-btn")) {
        return;
      }
      event.stopPropagation();
    });
  }
  $(document).on("click", function (event) {
    if (!$(event.target).closest(".nav-primary li.active").length) {
      $(".nav-primary li.active").removeClass("active");
    }
  });

  $(window).scroll(function () {
  $(".nav-primary li.active").removeClass("active");
  });
if ($(window).width() > 767) {
    $(".nav-wrapper .nav-primary li").hover(function () {
      $(this).toggleClass("active");
   },function() {
      $(this).removeClass("active");
   });
  }
})
/* followstickyheader */
jQuery(document).ready(function($) {
    $.fn.followstickyheader = function(options, onscroll, onstuck) {

        var settings = $.extend({
            offset: 0,
        }, options);

        var $stickies = $(this), //collection of sticky headers
            stack = {},
            scrollTop = 0,
            lastScrollTop = 0,
            eleTop = 0;

        $(document).on("scroll", function() {
            lastScrollTop = scrollTop;
            scrollTop = parseInt($(window).scrollTop(), 10);

            $stickies.each(function(i) {
                eleTop = parseInt($(this).offset().top, 10);

                //Remove stuck class if (this case is only for 1st heading)
                //  there is atleast one heading in stack (at least one heading which is sticky) AND
                //  User is scrolling down.
                //  scrolling top is less then top position of 1st heading  
                if (stack.hasOwnProperty('0') && scrollTop < lastScrollTop && scrollTop <= stack[0].offset.top) {
                    $('.is-fixed').each(function() {
                        $(this).removeClass('is-fixed').css(stack[$(this).attr('index')].css).css({
                            // width: window.innerWidth + "px"
                            width: 100 + "%"
                        });
                    });
                }

                if (((scrollTop + settings.offset) - eleTop) > 0) {
                    //Put the css properties of header in stack
                    if (!(i in stack)) {
                        stack[i] = {
                            css: {
                                position: $(this).css("position"),
                                top: $(this).css("top")
                            },
                            offset: $(this).offset()
                        };
                        $(this).attr('index', i);
                    }

                    //remove the is-fixed class if any
                    $(".is-fixed").each(function() {
                        $(this).removeClass("is-fixed")
                            .css(stack[i].css)
                            .css({
                                // width: window.innerWidth + "px"
                                width: 100 + "%"
                            });

                    });

                    //make the current header as sticky header
                    $(this).addClass("is-fixed").css({
                        position: "fixed",
                        top: settings.offset + "px",
                        // width: window.innerWidth + "px"
                        width: 100 + "%"
                    });

                    //if callback fucntion is defind call that function
                    if (typeof onstuck === "function") {
                        onstuck(this);
                    }
                }
            });

            //if callback fucntion is defind call that function
            if (typeof onscroll === "function") {
                onscroll(this);
            }
        });

        //fix the width of headers if window got resized.
        $(window).resize(function() {
            $stickies.css({
                // width: window.innerWidth + "px"
                width: 100 + "%"
            });
        });
    };
}(jQuery));

$(document).ready(function(){
    $('.follow-sticky-header').followstickyheader({offset:0});
});
/* end of followstickyheader */
