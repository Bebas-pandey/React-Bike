// ===================================================================================================loginjs=====================================================================
var formId = "#" + $(".login-submit").attr("data-form");
var logoutApi;
var userAfterSignup = {};
var msgflag = false;
var resendOtp = $(".resendingLoginOtp").attr("data-form-resend");
var verifyAccount = $(".verifyingAccount").attr("data-form-verify");
var otpFlag = true;
var newOtpLoginFlag = true;
var otpLoginFlag = true;
var otpForgotFLag = true;
var newOtpSuccessFLag = true;
var newOtpTimerFlag = true;
var otpTimerFlag = true;
var subDomainCookieName;
var wrongCallingCode = $(".forgot-password-submit").attr("calling-code-error");
var firebaseEmail;
var firebasePassword;
var collectionData;
var cluster;
var db;
var clusterConfigurations;
var firebaseCluster;
var runMode;
var defaultFirebaseConfig;

var resendOtpFlagTimer = 0;
var globalErrorMessage;
var customToken;
//analytics code....................
function forgotPassAnalytics(ctaClicked, nextPageURL, errorMessage) {
    dataLayer.push({
        event: "resetPassword",
        eventCategory: "resetPassword",
        eventAction: ctaClicked,
        eventLabel: nextPageURL,
        errorMessage: errorMessage,
    });
}
//..................................
function showDialogbox(message, flag = false) {
    msgflag = true;
    $("body").addClass("modal-open");
    $("#myModalLogin").addClass("show");
    $("#myModalLogin").attr("aria-hidden", "false");
    $('<div class="modal-backdrop fade show"><div>').insertAfter(
        "#myModalLogin"
    );
    $("#messageLogin").html(message);
    $("#myModalLogin").css("display", "block");
}

function start() {
    var googleId = $(".googlelogin").attr("data-google-id");
    gapi.load("auth2", function () {
        auth2 = gapi.auth2.init({
            client_id: googleId,
            scope: "https://www.googleapis.com/auth/userinfo.profile",
        });
    });
}

$(document).ready(function () {
    // OTP functionality
    // otp sms object

    $("#phoneNumber").on("input", function (e) {
        const otp = $(this).val();
        const NUMBER_REGEX = /[0-9]/;
        const maxLength = Number($("#verifyOtp").attr("max-length"));
        if (
            otp.includes(".") ||
            !NUMBER_REGEX.test(otp) ||
            otp.length > maxLength
        ) {
            const otpStr = otp.substring(0, otp.length - 1);
            $(this).val(otpStr);
        }
    });

    // var otpId;
    newOtpLoginFlag = true;
    const sendOTP = $("#otpVerify").attr("send-otp");
    $(".otp-verify-submit").click(function () {
        $("input[name=loginOtp]").val("");
        if (newOtpLoginFlag == true) {
            const phoneNo = $("#phoneNumber").val();
            const phoneMessage = $("#phoneNumber").attr("data-validate");
            const limitExceedMessage =
                $("#phoneNumber").attr("data-limit-exceed");
            const callingCodeMessage =
                $("#phoneNumber").attr("calling-code-error");
            const mobileRe = /^\d{8,15}$/;
            const otpSuccessMessage = $("#phoneNumber").attr("data-success");
            var otpErrorMessage = $("#phoneNumber").attr("data-error");
            let callingCode = $("#callingCode option:selected").val();
            if (callingCode) {
                callingCode = callingCode.replace("+", "");
            }
            let loginHitTime = 0;
            let loginHideTimerFlag = false;

            if (!callingCode) {
                showDialogbox(callingCodeMessage);
            } else if (!mobileRe.test(phoneNo)) {
                showDialogbox(phoneMessage);
            } else {
                const credentialsToBase = btoa(phoneNo);
                $.ajax({
                    url: `${sendOTP}?credentials=${credentialsToBase}`,
                    type: "GET",
                    contentType: "application/json",
                    success: function (res) {
                        const result = JSON.parse(res.result);
                        if (result.code == 200) {
                            // otpId = result.data;
                            newOtpLoginFlag = false;
                            showDialogbox(otpSuccessMessage);
                            if (newOtpTimerFlag == false) {
                                if (loginHitTime == 0) {
                                    loginHideTimerFlag = false;
                                    let fetchTIme =
                                        $("#loginOtpTimer").attr("firsttimer");
                                    loginHitTime = parseInt(fetchTIme);
                                    loginCountdownTimeOTP(
                                        loginHitTime,
                                        loginHideTimerFlag,
                                        1
                                    );
                                    $("#resendLoginOtp").hide();
                                    $(".loginOtpTimer").removeClass("d-none");
                                } else if (
                                    loginHitTime ==
                                    $("#loginOtpTimer").attr("firsttimer")
                                ) {
                                    loginHideTimerFlag = false;
                                    let fetchTIme =
                                        $("#loginOtpTimer").attr("secondtimer");
                                    loginHitTime = parseInt(fetchTIme);
                                    loginCountdownTimeOTP(
                                        loginHitTime,
                                        loginHideTimerFlag,
                                        1
                                    );
                                    $("#resendLoginOtp").hide();
                                    $(".loginOtpTimer").removeClass("d-none");
                                } else if (
                                    loginHitTime ==
                                    $("#loginOtpTimer").attr("secondtimer")
                                ) {
                                    loginHideTimerFlag = false;
                                    let fetchTIme =
                                        $("#loginOtpTimer").attr("thirdtimer");
                                    loginHitTime = parseInt(fetchTIme);
                                    loginCountdownTimeOTP(
                                        loginHitTime,
                                        loginHideTimerFlag,
                                        1
                                    );
                                    $("#resendLoginOtp").hide();
                                    $(".loginOtpTimer").removeClass("d-none");
                                } else if (
                                    loginHitTime ==
                                    $("#loginOtpTimer").attr("thirdtimer")
                                ) {
                                    loginHideTimerFlag = false;
                                    let fetchTIme =
                                        $("#loginOtpTimer").attr("fourthtimer");
                                    loginHitTime = parseInt(fetchTIme);
                                    loginCountdownTimeOTP(
                                        loginHitTime,
                                        loginHideTimerFlag,
                                        1
                                    );
                                    $("#resendLoginOtp").hide();
                                    $(".loginOtpTimer").removeClass("d-none");
                                } else if (
                                    loginHitTime ==
                                    $("#loginOtpTimer").attr("fourthtimer")
                                ) {
                                    loginHideTimerFlag = false;
                                    let fetchTIme =
                                        $("#loginOtpTimer").attr("fifthtimer");
                                    loginHitTime = parseInt(fetchTIme);
                                    loginCountdownTimeOTP(
                                        loginHitTime,
                                        loginHideTimerFlag,
                                        1
                                    );
                                    $("#resendLoginOtp").hide();
                                    $(".loginOtpTimer").removeClass("d-none");
                                } else if (
                                    loginHitTime ==
                                    $("#loginOtpTimer").attr("fifthtimer")
                                ) {
                                    loginHideTimerFlag = false;
                                    loginHitTime = 0;
                                    loginHideTimerFlag = true;
                                    $("#resendLoginOtp").show();
                                    $(".loginOtpTimer").addClass("d-none");
                                }
                            }
                        } else if (result.code == 400 || result.code == 429) {
                            showDialogbox(limitExceedMessage);
                        } else if (result.code == 404) {
                            showDialogbox(phoneMessage);
                        } else if (result.code == 409) {
                            showDialogbox(wrongCallingCode);
                        } else {
                            showDialogbox(otpErrorMessage);
                        }
                    },
                });
            }
        }
    });

    const verifyOtp = $("#otpVerify").attr("login-with-otp");
    $("#submitOtp").click(function () {
        if (newOtpSuccessFLag == true) {
            const failureMessage = $("#otpInput").attr("data-validate");
            const successMessage = $("#otpInput").attr("data-success");
            const otpValue = $("[name=loginOtp]").val();
            if (otpValue.length < 6 || otpValue.length > 8) {
                showDialogbox(failureMessage);
            } else {
                const credentials = `${smsData.message.recipient.mobile}:${otpValue}`;
                const credentialsToBase = btoa(credentials);
                $.ajax({
                    url: verifyOtp,
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        credentials: credentialsToBase,
                    }),
                    success: function (result) {
                        userAfterSignup = result;
                        if (result.code == 200) {
                            newOtpSuccessFLag = false;
                            showDialogbox(successMessage);
                            settingUserLoginDetails(result);
                            newOtpLoginFlag = false;
                        } else {
                            showDialogbox(failureMessage);
                        }
                    },
                    error: function (error) {
                        showDialogbox(globalErrorMessage);
                    },
                });
            }
        }
    });

    var overlayLogin = getUrlParams("overlay");
    if (overlayLogin == "true") {
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
    }

    globalErrorMessage = $("#myModalLogin").attr("data-error");

    defaultFirebaseConfig = $("#myModalLogin").attr(
        "data-default-configuration"
    );
    if (defaultFirebaseConfig) {
        defaultFirebaseConfig = JSON.parse(defaultFirebaseConfig);
        firebasePassword = defaultFirebaseConfig.password;
    }

    logoutApi = $(".logout").attr("data-attr-logout");
    $(".login_section.myUrlLoginUnique").on("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });

    $("#userId").on("input", function () {
        $(".over-all").hide();
        let fieldValue = $("[name=userId]").val();
        if (fieldValue == "") {
            $(".over-all").show();
        } else {
            $(".over-all").hide();
        }
        let charAtZero = fieldValue.charAt(0);
        if (charAtZero == 0) {
            $(".over-all").show();
        } else {
            $(".over-all").hide();
        }
    });

    window.fbAsyncInit = function () {
        var facebookId = $(".facebooklogin").attr("data-facebook-id");
        FB.init({
            appId: facebookId,
            autoLogAppEvents: true,
            xfbml: true,
            version: "v3.2",
        });
    };

    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    $(".forgot_password").click(function () {
        $(".fp-user-id-form").removeClass("d-none");
        $(".fp-verify-otp-form").addClass("d-none");
        $(".fp-reset-password-form").addClass("d-none");
        otpFlag = true;
    });

    var fpSuccess = $(".fp-success-message-reset").attr("data-success");

    var user = {};
    var userId = "";

    var logoutredirect = $("#Logout").attr("href");
    var logoutError = $("#logout-error").attr("logout-error");
    var countrylocationUrl = $("#loginForm").attr("country-api");
    function compare(a, b) {
        const bandA = a.name.toUpperCase();
        const bandB = b.name.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        delete options.headers["authorization"];
    });
    $.ajax({
        url: `${countrylocationUrl}/countries.json`,
        method: "GET",
        contentType: "application/json",
        success: function (result) {
            for (let i = 0; i < result.length; i++) {
                $("#countrySign").append(
                    `<option value=${result[i].phone_code}>${result[i].name} <Span>(+${result[i].phone_code})</span></option>`
                );
            }
        },
        error: function (err) {
            console.log("defaultErrorMsg");
        },
    });
    $(document).on("click", "#Logout", function (e) {
        e.preventDefault();
        const verifyTokenPromiseLogOut = verifyToken(
            verifyTokenUrl,
            "promise",
            refreshToken
        );
        $(".login-link").css("display", "none");
        $(".dropdown.logged-in").css("display", "block");

        verifyTokenPromiseLogOut.then(async function (value) {
            if (value._id) {
                const data = {};
                const hmac = await generateHMAC(data);

                $.ajax({
                    url: `${logoutApi}?hmac=${hmac}`,
                    type: "GET",
                    success: async function (result) {
                        let responseHMAC = await verifyHMAC(result);
                        console.log({ responseHMAC });

                        if (responseHMAC) {
                            Logout();
                            document.cookie =
                                "user" +
                                "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                            document.cookie =
                                subDomainCookieName +
                                "=; domain=.royalenfield.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                            document.cookie =
                                "firebaseToken" +
                                "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                            window.location.assign(logoutredirect);
                            firebase
                                .auth()
                                .signOut()
                                .then(function () {
                                    console.log("User Signed Out");
                                });
                        } else {
                            showDialogbox(globalErrorMessage);
                        }

                    },
                    error: function (err) {
                        showDialogbox(globalErrorMessage);
                    },
                });
            }
        });
    });

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    var wrongPassword = $("#myModalLogin").attr("invalid-password");
    var refreshToken = $(".myUrlLoginUnique").attr("refresh-url");
    var verifyTokenUrl = $(".myUrlLoginUnique").attr("data-url");
    subDomainCookieName = $("#login-link").attr("data-runmode");

    var userFetchedData;
    var fetchedUserID;
    var fetchedJwt;
    var fetchedRtk;
    var fetchedData = getCookie(subDomainCookieName);
    if (fetchedData) {
        userFetchedData = window.atob(fetchedData);
        userFetchedData = userFetchedData.split("#");
        fetchedUserID = userFetchedData[0];
        fetchedRtk = userFetchedData[1];
        fetchedJwt = userFetchedData[2];
    }

    if (fetchedJwt && fetchedRtk && fetchedUserID) {
        const verifyTokenPromise = verifyToken(
            verifyTokenUrl,
            "promise",
            refreshToken
        );
        $(".login-link").css("display", "none");
        $(".dropdown.logged-in").css("display", "block");
        clusterConfigurations = $("#myModalLogin").attr("data-configuration");
        clusterConfigurations = JSON.parse(clusterConfigurations);
        runMode = $("#myModalLogin").attr("data-runmode");
        verifyTokenPromise.then(function (value) {
            if (value._id) {
                $("#profileImage").attr("src", value.profilePicture);
                $("#profPic").attr("src", value.profilePicture);
                $("#coverImage").attr("src", value.coverImage);
                $("#userName").html(value.fName + " " + value.lName);
            }
            firebaseEmail = value.contactDetails.email;
            if (value.cluster) {
                cluster = value.cluster;
                cluster = cluster.substring(0, 2).toLowerCase();
                cluster = cluster + "-" + runMode;
                for (var i = 0; i < clusterConfigurations.length; i++) {
                    var firebaseRegion =
                        clusterConfigurations[i].firebaseRegion;
                    if (cluster == firebaseRegion) {
                        firebaseCluster = clusterConfigurations[i];
                    }
                }
                const firebaseConfig = {
                    apiKey: firebaseCluster.firebaseKey,
                    authDomain: firebaseCluster.authDomain,
                    projectId: firebaseCluster.projectId,
                    databaseURL: firebaseCluster.countryListing,
                };

                firebase.initializeApp(firebaseConfig);
                firebase
                    .firestore()
                    .enablePersistence({ synchronizeTabs: true })
                    .then(function () { });
                db = firebase.firestore();
                collectionData = db.collection(fetchedUserID);
                let fetchedToken = getCookie("firebaseToken");
                var firebaseCustomToken = firebaseCluster.appId;
                if (fetchedToken) {
                    firebaseSignIn(fetchedToken, value);
                } else {
                    $.ajax({
                        type: "GET",
                        url: firebaseCustomToken,
                        beforeSend: function (jqXHR, settings) {
                            jqXHR.setRequestHeader("authorization", fetchedJwt);
                        },
                        success: function (result) {
                            if (result.code == 200) {
                                customToken = result.data;
                                if (customToken) {
                                    setFirebaseCookie(
                                        "firebaseToken",
                                        customToken,
                                        1
                                    );
                                    firebaseSignIn(customToken, value);
                                }
                            }
                        },
                        error: function (error) {
                            console.log(error);
                        },
                    });
                }
            }
        });
    } else {
        $(".dropdown.logged-in").css("display", "none");
        $(".login-link").css("display", "block");
    }

    function firebaseSignIn(token, value) {
        firebase
            .auth()
            .signInWithCustomToken(token)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                collectionData.doc("userInfo").onSnapshot(function (doc) {
                    let realtimeChange = {};
                    realtimeChange = doc.data();
                    if (realtimeChange) {
                        console.log(realtimeChange);
                    }
                    var source = doc.metadata.fromCache
                        ? "local cache"
                        : "server";
                    console.log("Data came from " + source);
                });
                collectionData
                    .doc("userInfo")
                    .collection("discussionJoined")
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) { });
                    });
                if (
                    value.cluster == "EU0001" &&
                    value.ridersClubMember == true
                ) {
                    collectionData
                        .doc("riderPortalMembership")
                        .onSnapshot(function (doc) {
                            let realtimeChange = {};
                            realtimeChange = doc.data();
                            var source = doc.metadata.fromCache
                                ? "local cache"
                                : "server";
                            console.log("Branch Data came from " + source);
                        });
                }
            })
            .catch((error) => {
                console.log("Firebase Auth Error Code..", error.code);
                console.log("Firebase Auth Error Message..", error.message);
            });
    }

    $(".close-modal-btn").click(function () {
        msgflag = false;
        $("body").removeClass("modal-open");
        $("#myModal").removeClass("show");
        $("#myModal").attr("aria-hidden", "true");
        $("#myModal").css("display", "none");
        $(".modal-backdrop").remove();
    });

    $(document).on("click", ".close-modal-btn-login", function (e) {
        msgflag = false;
        $("body").removeClass("modal-open");
        $("#myModalLogin").removeClass("show");
        $("#myModalLogin").attr("aria-hidden", "true");
        $("#myModalLogin").css("display", "none");
        $(".modal-backdrop").remove();
    });

    var formId = "#" + $(".login-submit").attr("data-form");
    $(document).on("keypress", formId, function (e) {
        $("body").removeClass("modal-open");
        $("#myModalLogin").removeClass("show");
        $("#myModalLogin").attr("aria-hidden", "true");
        $("#myModalLogin").css("display", "none");
        $(".modal-backdrop").remove();
    });

    $(formId).keypress(function (e) {
        if (e.which == 13 || e.keyCode == 13) {
            $(".login-submit").click();
        }
    });

    $(".login-submit").on("click", async function (event) {
        resendOtpFlagTimer = 0;
        let ctaText = $(this).attr("value");
        let nextpageurl = window.location.pathname;
        if (nextpageurl == undefined) {
            nextpageurl = "";
        }
        function loginAnalytics(anaerrorMessage) {
            dataLayer.push({
                event: "login",
                eventCategory: "login",
                eventAction: ctaText,
                eventLabel: nextpageurl,
                loginType: "General Login",
                errorMessage: anaerrorMessage,
                userId: "",
            });
        }
        event.preventDefault();
        const isOtpLoginRequired = event.target.getAttribute("otp-for-login");
        if (msgflag == false) {
            var login = $("[name=userId]").val().toLowerCase();
            var loginMessage = $("[name=userId]").attr("data-validate");
            var loginerrorMessage = $("[name=userId]").attr("data-error");
            var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var mobileRe = /^\d{8,15}$/;
            var password = $("[name=password]").val();
            var passwordMessage = $("[name=password]").attr("data-validate");
            var email = $("input[name=userId]").val().toLowerCase();
            var password = $("input[name=password]").val();
            var userType = "user";
            var obj = email + ":" + password;
            // var credentials = unescape(encodeURIComponent(obj));
            credentials = btoa(obj);
            var dataObj = {
                credentials: credentials,
                userType: userType,
            };
            if (login == "") {
                loginAnalytics(loginerrorMessage);
                showDialogbox(loginerrorMessage);
            } else if (!emailRe.test(login) && !mobileRe.test(login)) {
                loginAnalytics(loginMessage);
                showDialogbox(loginMessage);
            } else if (password == "") {
                loginAnalytics(passwordMessage);
                showDialogbox(passwordMessage);
            } else {
                // HMAC code
                const hmac = await generateHMAC(dataObj);
                console.log("==HMAC=generateHMAC=", { hmac });

                $.ajax({
                    type: "POST",
                    url: $(this).attr("data-form-submit"),
                    data: { ...dataObj, hmac },
                    success: async function (result) {
                        if (result.code == 200) {
                            let responseHMAC = await verifyHMAC(result);
                            if (responseHMAC) {
                                userAfterSignup = result;
                                dataLayer.push({
                                    event: "login",
                                    eventCategory: "login",
                                    eventAction: ctaText,
                                    eventLabel: nextpageurl,
                                    loginType: "General Login",
                                    errorMessage: "",
                                    userId: userAfterSignup.data.user.userId,
                                });
                                if (result.data.user.verifiedAccount == "PENDING" && isOtpLoginRequired == "true") {
                                    $(".login_section-wrapper").hide();
                                    $(".sign-up-bottom").hide();
                                    $(".verificationOtpforLogin").removeAttr(
                                        "hidden"
                                    );
                                    $(".verificationOtpforLogin").css(
                                        "display",
                                        "block"
                                    );
                                    $(".resendingLoginOtp").trigger("click");
                                    resendOtpFlagTimer++;
                                } else {
                                    settingUserLoginDetails(result);
                                    msgflag = false;
                                }
                            } else {
                                msgflag = true;
                                loginAnalytics(loginerrorMessage);
                                showDialogbox(loginerrorMessage);
                            }
                        } else if (result.code == 401) {
                            msgflag = true;
                            loginAnalytics(wrongPassword);
                            showDialogbox(wrongPassword);
                        } else {
                            msgflag = true;
                            loginAnalytics(loginerrorMessage);
                            showDialogbox(loginerrorMessage);
                        }
                    },
                    error: function (result) {
                        loginAnalytics(globalErrorMessage);
                        msgflag = true;
                        $("body").addClass("modal-open");
                        $("#myModalLogin").addClass("show");
                        $("#myModalLogin").attr("aria-hidden", "false");
                        $(
                            '<div class="modal-backdrop fade show"><div>'
                        ).insertAfter("#myModalLogin");
                        $("#messageLogin").html(globalErrorMessage);
                        $("#myModalLogin").css("display", "block");
                    },
                });
            }
        }
    });

    function Logout() {
        FB.getLoginStatus(function (response) {
            if (response.status === "connected") {
                FB.logout(function (response) { });
            }
        }, true);
    }

    $(".facebooklogin").on("click", function () {
        var formid = "#" + $(this).attr("data-facebook-url");
        var facebookApiUrl = $(formid).attr("data-attr-facebook");
        var fberrMessage = $("#myModalLogin").attr("facebook-error");
        let fbCtaText = $(this).text().trim();
        let fbNextUrl = $(this).attr("href");
        if (fbNextUrl == undefined) {
            fbNextUrl = "";
        }
        function fbAnalytics(fberrorMessageAna) {
            dataLayer.push({
                event: "login",
                eventCategory: "login",
                eventAction: fbCtaText,
                eventLabel: fbNextUrl,
                loginType: "faceebok login",
                errorMessage: fberrorMessageAna,
                userId: "",
            });
        }

        FB.getLoginStatus(function (response) {
            if (response.status != "connected") {
                let anamessage = "";
                fbAnalytics(anamessage);
                login();
            } else {
                $.ajax({
                    url: facebookApiUrl,
                    type: "POST",
                    data: JSON.stringify({
                        callType: "facebook",
                        obj: {
                            accessToken: response.authResponse.accessToken,
                        },
                    }),
                    contentType: "application/json",
                    success: function (result) {
                        if (result.success == true) {
                            userAfterSignup = result;
                            dataLayer.push({
                                event: "login",
                                eventCategory: "login",
                                eventAction: fbCtaText,
                                eventLabel: fbNextUrl,
                                loginType: "facebook login",
                                errorMessage: "",
                                userId: userAfterSignup.data.user.userId,
                            });
                            if (result.data.user.verifiedAccount == "PENDING") {
                                $(".login_section-wrapper").hide();
                                $(".sign-up-bottom").hide();
                                $(".verificationOtpforLogin").removeAttr(
                                    "hidden"
                                );
                                $(".verificationOtpforLogin").css(
                                    "display",
                                    "block"
                                );
                            } else {
                                settingUserLoginDetails(result);
                            }
                        } else {
                            fbAnalytics(fberrMessage);
                            $("#myModalLogin").addClass("show");
                            $("#myModalLogin").attr("aria-hidden", "false");
                            $(
                                '<div class="modal-backdrop fade show"><div>'
                            ).insertAfter("#myModalLogin");
                            $("#messageLogin").html(fberrMessage);
                            $("#myModalLogin").css("display", "block");
                        }
                    },
                    error: function (e) {
                        fbAnalytics(globalErrorMessage);
                        $("body").addClass("modal-open");
                        $("#myModalLogin").addClass("show");
                        $("#myModalLogin").attr("aria-hidden", "false");
                        $(
                            '<div class="modal-backdrop fade show"><div>'
                        ).insertAfter("#myModalLogin");
                        $("#messageLogin").html(globalErrorMessage);
                        $("#myModalLogin").css("display", "block");
                    },
                });
            }
        }, true);

        function login() {
            FB.login(
                function (response) {
                    if (response.status === "connected") {
                        var accessToken = JSON.stringify(
                            response.authResponse.accessToken
                        );
                        $.ajax({
                            url: facebookApiUrl,
                            type: "POST",
                            data: JSON.stringify({
                                callType: "facebook",
                                obj: {
                                    accessToken:
                                        response.authResponse.accessToken,
                                },
                            }),
                            contentType: "application/json",
                            success: function (result) {
                                if (result.success == true) {
                                    userAfterSignup = result;
                                    if (
                                        result.data.user.verifiedAccount ==
                                        "PENDING"
                                    ) {
                                        $(".login_section-wrapper").hide();
                                        $(".sign-up-bottom").hide();
                                        $(
                                            ".verificationOtpforLogin"
                                        ).removeAttr("hidden");
                                        $(".verificationOtpforLogin").css(
                                            "display",
                                            "block"
                                        );
                                    } else {
                                        settingUserLoginDetails(result);
                                    }
                                } else {
                                    $("#myModalLogin").addClass("show");
                                    $("#myModalLogin").attr(
                                        "aria-hidden",
                                        "false"
                                    );
                                    $(
                                        '<div class="modal-backdrop fade show"><div>'
                                    ).insertAfter("#myModalLogin");
                                    $("#messageLogin").html(fberrMessage);
                                    $("#myModalLogin").css("display", "block");
                                }
                            },
                            error: function (e) {
                                $("body").addClass("modal-open");
                                $("#myModalLogin").addClass("show");
                                $("#myModalLogin").attr("aria-hidden", "false");
                                $(
                                    '<div class="modal-backdrop fade show"><div>'
                                ).insertAfter("#myModalLogin");
                                $("#messageLogin").html(globalErrorMessage);
                                $("#myModalLogin").css("display", "block");
                            },
                        });
                    } else if (response.status === "not_authorized") {
                    } else {
                    }
                },
                {
                    scope: "email",
                }
            );
        }
    });

    $(".googlelogin").on("click", function () {
        var formid = "#" + $(this).attr("data-google-url");
        var googleApiUrl = $(formid).attr("data-attr-google");
        var googleErrMessage = $("#myModalLogin").attr("google-error");
        let googleCtaText = $(this).text().trim();
        let googleNextUrl = $(this).attr("href");
        if (googleNextUrl == undefined) {
            googleNextUrl = "";
        }
        function googleAnalyticslogin(ggogleAnaError) {
            dataLayer.push({
                event: "login",
                eventCategory: "login",
                eventAction: googleCtaText,
                eventLabel: googleNextUrl,
                loginType: "google login",
                errorMessage: ggogleAnaError,
                userId: "",
            });
        }
        function signInCallback(authResult) {
            if (authResult["code"]) {
                $.ajax({
                    type: "POST",
                    url: googleApiUrl,
                    data: {
                        callType: "Google",
                        authCode: authResult["code"],
                    },
                    success: function (result) {
                        var user = {};
                        if (result.success == true) {
                            userAfterSignup = result;
                            dataLayer.push({
                                event: "login",
                                eventCategory: "login",
                                eventAction: googleCtaText,
                                eventLabel: googleNextUrl,
                                loginType: "google login",
                                errorMessage: "",
                                userId: userAfterSignup.data.user.userId,
                            });
                            if (result.data.user.verifiedAccount == "PENDING") {
                                $(".login_section-wrapper").hide();
                                $(".sign-up-bottom").hide();
                                $(".verificationOtpforLogin").removeAttr(
                                    "hidden"
                                );
                                $(".verificationOtpforLogin").css(
                                    "display",
                                    "block"
                                );
                            } else {
                                settingUserLoginDetails(result);
                            }
                        } else {
                            googleAnalyticslogin(googleErrMessage);
                            $("body").addClass("modal-open");
                            $("#myModalLogin").addClass("show");
                            $("#myModalLogin").attr("aria-hidden", "false");
                            $(
                                '<div class="modal-backdrop fade show"><div>'
                            ).insertAfter("#myModalLogin");
                            $("#messageLogin").html(googleErrMessage);
                            $("#myModalLogin").css("display", "block");
                        }
                    },
                    error: function (err) {
                        googleAnalyticslogin(globalErrorMessage);
                        $("body").addClass("modal-open");
                        $("#myModalLogin").addClass("show");
                        $("#myModalLogin").attr("aria-hidden", "false");
                        $(
                            '<div class="modal-backdrop fade show"><div>'
                        ).insertAfter("#myModalLogin");
                        $("#messageLogin").html(globalErrorMessage);
                        $("#myModalLogin").css("display", "block");
                        location.reload();
                    },
                });
            }
        }
        auth2.grantOfflineAccess().then(signInCallback);
    });
    var otpId;
    $(".forgot-password-submit").click(async function () {
        let ctaClickedText = $(this).attr("value");
        let nextUrlFgP = "";
        $("input[name=otp]").val("");
        let loginhitTIme = 0;
        let loginHideTimerFlag = false;
        if (otpFlag == true) {
            forgetFormId = "#" + $(this).attr("data-form");
            var url = $(forgetFormId).attr("action");
            var phone = $('[name="mobile"]').val();
            var phoneMessage = $('[name="mobile"]').attr("data-validate");
            var limitExceedMessage =
                $('[name="mobile"]').attr("data-limit-exceed");
            var callingCodeMessage = $('[name="callingCode"]').attr(
                "data-validate"
            );
            var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var mobileRe = /^\d{8,15}$/;
            var otpSuccessMessage = $('[name="mobile"]').attr("data-success");
            var otpErrorMessage = $('[name="mobile"]').attr("data-error");
            var callingCode = $("#countrySign option:selected").val();
            if (callingCode) {
                callingCode = callingCode.replace("+", "");
            }

            if (!callingCode) {
                showDialogbox(callingCodeMessage);
                forgotPassAnalytics(
                    ctaClickedText,
                    nextUrlFgP,
                    callingCodeMessage
                );
            } else if (!emailRe.test(phone) && !mobileRe.test(phone)) {
                showDialogbox(phoneMessage);
                forgotPassAnalytics(ctaClickedText, nextUrlFgP, phoneMessage);
            } else {
                // HMAC code 
                const data = {
                    username: phone,
                    callingCode: callingCode
                };
                const hmac = await generateHMAC(data);

                $.ajax({
                    url: `${url}?username=${phone}&callingCode=${callingCode}&hmac=${hmac}`,
                    method: "GET",
                    success: async function (result) {
                        if (result.code == 200) {
                            let responseHMAC = await verifyHMAC(result);
                            if (responseHMAC) {
                                otpId = result.data;
                                otpFlag = false;
                                otpForgotFLag = true;
                                $(".fp-verify-otp-form").removeClass("d-none");
                                $(".fp-user-id-form").addClass("d-none");
                                showDialogbox(otpSuccessMessage);
                                forgotPassAnalytics(
                                    ctaClickedText,
                                    nextUrlFgP,
                                    otpSuccessMessage
                                );
                                if (otpTimerFlag == false) {
                                    if (loginhitTIme == 0) {
                                        loginHideTimerFlag = false;
                                        let fetchTIme =
                                            $("#loginTimerOtp").attr("firsttimer");
                                        loginhitTIme = parseInt(fetchTIme);
                                        loginCountdownTimeOTP(
                                            loginhitTIme,
                                            loginHideTimerFlag,
                                            ""
                                        );
                                        $("#resendOtpLogin").hide();
                                        $(".loginTimerOtp").removeClass("d-none");
                                    } else if (
                                        loginhitTIme ==
                                        $("#loginTimerOtp").attr("firsttimer")
                                    ) {
                                        loginHideTimerFlag = false;
                                        let fetchTIme =
                                            $("#loginTimerOtp").attr("secondtimer");
                                        loginhitTIme = parseInt(fetchTIme);
                                        loginCountdownTimeOTP(
                                            loginhitTIme,
                                            loginHideTimerFlag,
                                            ""
                                        );
                                        $("#resendOtpLogin").hide();
                                        $(".loginTimerOtp").removeClass("d-none");
                                    } else if (
                                        loginhitTIme ==
                                        $("#loginTimerOtp").attr("secondtimer")
                                    ) {
                                        loginHideTimerFlag = false;
                                        let fetchTIme =
                                            $("#loginTimerOtp").attr("thirdtimer");
                                        loginhitTIme = parseInt(fetchTIme);
                                        loginCountdownTimeOTP(
                                            loginhitTIme,
                                            loginHideTimerFlag,
                                            ""
                                        );
                                        $("#resendOtpLogin").hide();
                                        $(".loginTimerOtp").removeClass("d-none");
                                    } else if (
                                        loginhitTIme ==
                                        $("#loginTimerOtp").attr("thirdtimer")
                                    ) {
                                        loginHideTimerFlag = false;
                                        let fetchTIme =
                                            $("#loginTimerOtp").attr("fourthtimer");
                                        loginhitTIme = parseInt(fetchTIme);
                                        loginCountdownTimeOTP(
                                            loginhitTIme,
                                            loginHideTimerFlag,
                                            ""
                                        );
                                        $("#resendOtpLogin").hide();
                                        $(".loginTimerOtp").removeClass("d-none");
                                    } else if (
                                        loginhitTIme ==
                                        $("#loginTimerOtp").attr("fourthtimer")
                                    ) {
                                        loginHideTimerFlag = false;
                                        let fetchTIme =
                                            $("#loginTimerOtp").attr("fifthtimer");
                                        loginhitTIme = parseInt(fetchTIme);
                                        loginCountdownTimeOTP(
                                            loginhitTIme,
                                            loginHideTimerFlag,
                                            ""
                                        );
                                        $("#resendOtpLogin").hide();
                                        $(".loginTimerOtp").removeClass("d-none");
                                    } else if (
                                        loginhitTIme ==
                                        $("#loginTimerOtp").attr("fifthtimer")
                                    ) {
                                        loginHideTimerFlag = false;
                                        loginhitTIme = 0;
                                        loginHideTimerFlag = true;
                                        $("#resendOtpLogin").show();
                                        $(".loginTimerOtp").addClass("d-none");
                                    }
                                }
                            } else {
                                showDialogbox(otpErrorMessage);
                                forgotPassAnalytics(
                                    ctaClickedText,
                                    nextUrlFgP,
                                    otpErrorMessage
                                );
                            }
                        } else if (result.code == 400 || result.code == 429) {
                            showDialogbox(limitExceedMessage);
                            forgotPassAnalytics(
                                ctaClickedText,
                                nextUrlFgP,
                                limitExceedMessage
                            );
                        } else if (result.code == 404) {
                            showDialogbox(phoneMessage);
                            forgotPassAnalytics(
                                ctaClickedText,
                                nextUrlFgP,
                                phoneMessage
                            );
                        } else if (result.code == 409) {
                            showDialogbox(wrongCallingCode);
                            forgotPassAnalytics(
                                ctaClickedText,
                                nextUrlFgP,
                                wrongCallingCode
                            );
                        } else {
                            showDialogbox(otpErrorMessage);
                            forgotPassAnalytics(
                                ctaClickedText,
                                nextUrlFgP,
                                otpErrorMessage
                            );
                        }
                    },
                });
            }
        }
    });

    $("input[name=otp]").on("input", function (e) {
        var otp = $("input[name=otp]").val();
        var passwrdNu = /[A-Za-z0-9]/;

        if (otp.includes(".") || !passwrdNu.test(otp) || otp.length > 8) {
            var otpstr = otp.substring(0, otp.length - 1);
            $("input[name=otp]").val(otpstr);
        }
    });
    var forgotPassVerifyOtpUrl = $(".forgot-password-otp").attr("forgot-pass-url");
    $(".forgot-password-otp").click(async function () {
        let ctaClickedText = $(this).attr("value");
        let nextUrlFgP = "";
        if (otpForgotFLag == true) {
            OtpFormId = "#" + $(this).attr("data-form");
            var validateMessage1 = $("input[name='otp']").attr("data-validate");
            var userIdValidateMessage = $("input[name='otp']").attr("userId-validate");
            var otpValue = $("input[name='otp']").val();
            if (otpValue.length < 6 || otpValue.length > 8) {
                showDialogbox(validateMessage1);
                forgotPassAnalytics(
                    ctaClickedText,
                    nextUrlFgP,
                    validateMessage1
                );
            } else {
                // HMAC code 
                const data = {
                    id: otpId,
                    otp: otpValue
                };
                const hmac = await generateHMAC(data);
                $.ajax({
                    url: `${forgotPassVerifyOtpUrl}?id=${otpId}&otp=${otpValue}&hmac=${hmac}`,
                    method: "PUT",
                    success: async function (result) {
                        let responseHMAC = await verifyHMAC(result);
                        console.log({ responseHMAC });
                        if (result.code == 200 && responseHMAC) {
                            otpForgotFLag = false;
                            let vmsg = "";
                            $(".fp-verify-otp-form").addClass("d-none");
                            $(".fp-reset-password-form").removeClass("d-none");
                            forgotPassAnalytics(
                                ctaClickedText,
                                nextUrlFgP,
                                vmsg
                            );
                        } else {
                            showDialogbox(validateMessage1);
                            forgotPassAnalytics(ctaClickedText, nextUrlFgP, validateMessage1);
                        }
                    },
                    error: function (error) {
                        showDialogbox(globalErrorMessage);
                        forgotPassAnalytics(ctaClickedText, nextUrlFgP, validateMessage1);
                    },
                });
            }
        }
    });

    function createObjectFromForm(formId, additionalData = {}) {
        // Serialize form data and convert to an object
        const serializedData = $(formId).serialize();
        const formDataObject = serializedData
            .split("&")
            .reduce((acc, pair) => {
                const [key, value] = pair.split("=");
                acc[decodeURIComponent(key)] = decodeURIComponent(value);
                return acc;
            }, {});

        // Merge additional data into the object
        return { ...formDataObject, ...additionalData };
    }

    $(document).on("click", ".forgot-password-reset", async function () {
        formId = "#" + $(this).attr("data-form");
        let ctaClickedText = $(this).attr("value");
        let nextUrlFgP = "";
        var mobile = $("input[name='mobile']").val();
        var otp = $("input[name='otp']").val();
        var successMessage = $(this).attr("data-success");
        var errorMessage = $(this).attr("data-error");
        var password = $(".finalpassword").val();
        var confirmpassword = $('[name="confirmPassword"]').val();
        var unmatchPasswordMessage = $(this).attr("data-unmatch");
        var passwordDigitValidate = $(this).attr("data-digit-validate");
        var passwrdNu = /\d/g;
        var passwrdAl = /[A-Za-z]/;
        if (password != confirmpassword) {
            showDialogbox(unmatchPasswordMessage);
            forgotPassAnalytics(
                ctaClickedText,
                nextUrlFgP,
                unmatchPasswordMessage
            );
        } else if (
            password.length < 5 ||
            !passwrdNu.test(password) ||
            !passwrdAl.test(password)
        ) {
            showDialogbox(passwordDigitValidate);
            forgotPassAnalytics(
                ctaClickedText,
                nextUrlFgP,
                passwordDigitValidate
            );
        } else {
            const result = createObjectFromForm(formId, { username: mobile, otp: otp });
            const hmac = await generateHMAC(result);
            $.ajax({
                url: $(formId).attr("action"),
                method: "POST",
                data: `${$(formId).serialize()}&username=${mobile}&otp=${otp}&hmac=${hmac}`,
                success: async function (result) {
                    let responseHMAC = await verifyHMAC(result);
                    if (result.success == true && responseHMAC) {
                        $(".fp-user-id-form")[0].reset();
                        $(".fp-verify-otp-form")[0].reset();
                        $(".fp-reset-password-form")[0].reset();
                        showDialogbox(successMessage);
                        forgotPassAnalytics(
                            ctaClickedText,
                            nextUrlFgP,
                            successMessage
                        );
                        $(".login_form_holder").removeClass("f_password");
                    } else {
                        showDialogbox(errorMessage);
                        forgotPassAnalytics(
                            ctaClickedText,
                            nextUrlFgP,
                            errorMessage
                        );
                    }
                },
                error: function (error) {
                    showDialogbox(globalErrorMessage);
                    forgotPassAnalytics(
                        ctaClickedText,
                        nextUrlFgP,
                        globalErrorMessage
                    );
                },
            });
        }
    });

    $(".twitterme").on("click", function () {
        var twitterUrl = $(this).attr("data-twitter-request-me");
        let twitterCtaText = $(this).text().trim();
        let twitterNextUrl = $(this).attr("href");
        if (twitterNextUrl == undefined) {
            twitterNextUrl = "";
        }
        function twitterAnalyticslogin(twitterAnaError) {
            dataLayer.push({
                event: "login",
                eventCategory: "login",
                eventAction: twitterCtaText,
                eventLabel: twitterNextUrl,
                loginType: "google login",
                errorMessage: twitterAnaError,
                userId: "",
            });
        }
        $.ajax({
            url: twitterUrl,
            method: "GET",
            success: function (result) {
                if (result.code == 200) {
                    let erMsgN = "";
                    twitterAnalyticslogin(erMsgN);
                    localStorage.setItem(
                        "twitterRedirectUrl",
                        window.location.href
                    );
                    window.location.href = result.data;
                } else {
                    twitterAnalyticslogin(errorMessage);
                    showDialogbox(errorMessage);
                }
            },
            error: function (error) {
                twitterAnalyticslogin(globalErrorMessage);
                showDialogbox(globalErrorMessage);
            },
        });
    });

    var urlAccess = $("#twittertokenrequest").attr("data-twitter-acess-me");

    twitterSignup();

    function twitterSignup() {
        var urlAccess = $("#twittertokenrequest").attr("data-twitter-acess-me");

        function getBrowserId() {
            var aKeys = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"],
                sUsrAg = navigator.userAgent,
                nIdx = aKeys.length - 1;
            for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--);
            return nIdx;
        }

        var num = getBrowserId();
        if (num != -1) {
            var urlParams = new URLSearchParams(window.location.search);
            let splitted = window.location.href.split("/").reverse();
            var twitterErrMessage = $("#myModalLogin").attr("twitter-error");
            var oauthToken = "";
            if (
                urlParams.has("oauth_token") &&
                urlParams.has("oauth_verifier") &&
                splitted[1] != "sign-up"
            ) {
                $.get(urlAccess + location.search).done(function (
                    resultDetails
                ) {
                    if (resultDetails.success == true) {
                        var yourCurrentUrl = window.location.href.split("?")[0];
                        window.history.replaceState({}, "", yourCurrentUrl);
                        userAfterSignup = resultDetails;
                        if (
                            resultDetails.data.user.verifiedAccount == "PENDING"
                        ) {
                            $(".login_section-wrapper").hide();
                            $(".sign-up-bottom").hide();
                            $(".verificationOtpforLogin").removeAttr("hidden");
                            $(".verificationOtpforLogin").css(
                                "display",
                                "block"
                            );
                        } else {
                            settingUserLoginDetails(resultDetails);
                        }
                    } else {
                        var yourCurrentUrl = window.location.href.split("?")[0];
                        window.history.replaceState({}, "", yourCurrentUrl);
                        $("body").addClass("modal-open");
                        $("#myModalLogin").addClass("show");
                        $("#myModalLogin").attr("aria-hidden", "false");
                        $(
                            '<div class="modal-backdrop fade show"><div>'
                        ).insertAfter("#myModalLogin");
                        $("#messageLogin").html(twitterErrMessage);
                        $("#myModalLogin").css("display", "block");
                    }
                });
            }
        } else if (num == -1) {
            $.urlParam = function (name) {
                var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
                    window.location.href
                );
                if (results == null) {
                    return null;
                } else {
                    return decodeURI(results[1]) || 0;
                }
            };
            if (
                $.urlParam("oauth_token") != null &&
                $.urlParam("oauth_verifier") != null &&
                splitted[1] != "sign-up"
            ) {
                $.get(urlAccess + location.search).done(function (
                    resultDetails
                ) {
                    if (resultDetails.success == true) {
                        userAfterSignup = resultDetails;
                        if (
                            resultDetails.data.user.verifiedAccount == "PENDING"
                        ) {
                            $(".login_section-wrapper").hide();
                            $(".sign-up-bottom").hide();
                            $(".verificationOtpforLogin").removeAttr("hidden");
                            $(".verificationOtpforLogin").css(
                                "display",
                                "block"
                            );
                        } else {
                            settingUserLoginDetails(resultDetails);
                        }
                    } else {
                    }
                });
            } else {
            }
        }
    }

    $("[id='My Profile']").click(function () {
        var url = $(this).attr("data-url");
        window.location.assign(url + "?userid=" + userId);
    });

    $("[id='Edit Profile']").click(function () {
        var url = $(this).attr("data-url");
        window.location.assign(url + "?userid=" + userId);
    });

    //analytics code......
    $(document).on("click", "#login-link", function () {
        let ctaClicked = $(this).children("i").text().trim();
        let ctaUrl = $(this).attr("href");
        if (ctaUrl == undefined) {
            ctaUrl = "";
        }
        dataLayer.push({
            event: "header",
            eventCategory: "header",
            eventAction: ctaClicked,
            eventLabel: ctaUrl,
            iconText: "",
        });
    });

    $("#login-link")
        .siblings(".logged-in")
        .children("#logged-in")
        .click(function () {
            let ctaUrl = $(this).attr("href");
            if (ctaUrl == undefined) {
                ctaUrl = "";
            }
            dataLayer.push({
                event: "header",
                eventCategory: "header",
                eventAction: "logged in",
                eventLabel: ctaUrl,
                iconText: "logged in",
            });
        });

    $(document).on("click", ".logout", function () {
        let ctaText = $(this).text().trim();
        let ctaUrl = $(this).attr("href");
        if (ctaUrl == undefined) {
            ctaUrl = "";
        }
        dataLayer.push({
            event: "login",
            eventCategory: "login",
            eventAction: ctaText,
            eventLabel: ctaUrl,
            loginType: "",
            errorMessage: "",
            userId: fetchedUserID,
        });
    });
});

function settingUserLoginDetails(result) {
    var defaultPath = $("#loginForm").attr("data-location-url");
    var riderMemberRedirect = $("#loginForm").attr("rider-regis-url");
    if (
        result.data.user.ridersClubMember == false &&
        result.data.user.cluster == "EU0001" &&
        riderMemberRedirect
    ) {
        if (riderMemberRedirect) {
            localStorage.setItem("referer", riderMemberRedirect);
        }
    } else if (
        result.data.user.ridersClubMember == true &&
        result.data.user.cluster == "EU0001"
    ) {
        if (defaultPath) {
            localStorage.setItem("referer", defaultPath);
        }
    } else {
        localStorage.setItem("referer", window.location.href);
    }
    var user = {};
    var userDetails = result.data.user;
    user.userId = userDetails.userId;
    var userString = JSON.stringify(user);
    var codomainData =
        result.data.user.userId +
        "#" +
        result.data.refreshToken +
        "#" +
        result.data.jwtAccessToken;
    // codomainData = unescape(encodeURIComponent(codomainData));
    codomainData = btoa(codomainData);

    function setCoDomainCookie(cdname, cdvalue, dexdays) {
        var d = new Date();
        d.setTime(d.getTime() + dexdays * 24 * 7 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie =
            cdname +
            "=" +
            cdvalue +
            ";" +
            expires +
            ";domain=.royalenfield.com ;Secure=true ;SameSite=Strict ;path=/";
    }

    setCookie("user", userString, 1);
    setCoDomainCookie(subDomainCookieName, codomainData, 180);
    var succMessage = $("#myModalLogin").attr("data-success");
    if ($("#myModalLogin").attr("successPopup-attr") == "true") {
        $("body").addClass("modal-open");
        $("#myModalLogin").addClass("show");
        $("#myModalLogin").attr("aria-hidden", "false");
        $('<div class="modal-backdrop fade show"><div>').insertAfter(
            "#myModalLogin"
        );
        $("#messageLogin").html(succMessage);
        $("#myModalLogin").css("display", "block");
    }
    var ridirectionPath = window.location.pathname;
    const twitterRedirectUrl = localStorage.getItem("twitterRedirectUrl");
    if (twitterRedirectUrl) {
        window.location.href = twitterRedirectUrl;
        localStorage.removeItem("twitterRedirectUrl");
    } else {
        if (ridirectionPath) {
            ridirectionPath = ridirectionPath
                .split("/")
                .slice(-2)
                .reverse()
                .pop();
        }
        if (ridirectionPath == "sign-up") {
            window.location.href = defaultPath;
        } else {
            window.location.href = localStorage.getItem("referer");
            localStorage.removeItem("referer");
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 7 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setFirebaseCookie(cname, cvalue, exdays) {
    var d = new Date();
    var minutes = 15;
    d.setTime(d.getTime() + minutes * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// // Encoding
// function encode_utf8( s )
// {
//   return unescape( encodeURIComponent( s ) );
// }

// function decode_utf8( s )
// {
//   return decodeURIComponent( escape( s ) );
// }

$(document).on("click", ".resendingLoginOtp", async function (e) {
    e.preventDefault();
    var verifyTokenRUrl = $(".myUrlLoginUnique").attr("data-url");
    var limitExceedMessage = $('[name="mobile"]').attr("data-limit-exceed");
    var verifyAccount = $(".resendingLoginOtp").attr("data-form-resend");
    var otpSuccess = $("#myModalLogin").attr("otp-success");

    // HMAC code 
    const data = {};
    const hmac = await generateHMAC(data);

    $.ajax({
        url: `${verifyTokenRUrl}?hmac=${hmac}`,
        type: "GET",
        contentType: "application/json",
        beforeSend: function (jqXHR, settings) {
            jqXHR.setRequestHeader('authorization', userAfterSignup.data.jwtAccessToken);
        },
        // headers: { authorization: userAfterSignup.data.jwtAccessToken },
        success: async function (res) {
            let responseHMAC = await verifyHMAC(res);
            console.log({ responseHMAC });
            if (res.code == 200 && responseHMAC) {
                var verifyAccountData = {
                    mobile: userAfterSignup.data.user.phone,
                    callingCode: res.data.contactDetails.mobile.callingCode,
                };
                // HMAC code
                const hmac = generateHMAC(verifyAccountData);
                console.log("==HMAC=generateHMAC=", { hmac });
                $.ajax({
                    url: verifyAccount,
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({ ...verifyAccountData, hmac }),
                    success: function (res) {
                        if (res.code == 200) {
                            var verifyAccountData = {
                                mobile: userAfterSignup.data.user.phone,
                                callingCode:
                                    res.data.contactDetails.mobile.callingCode,
                            };
                            // HMAC code
                            const hmac = generateHMAC(verifyAccountData);
                            console.log("==HMAC=generateHMAC=", { hmac });
                            $.ajax({
                                url: verifyAccount,
                                type: "POST",
                                contentType: "application/json",
                                data: JSON.stringify({ ...verifyAccountData, hmac }),
                                success: function (res) {
                                    if (res.code == 200) {
                                        if (
                                            afterloginhitTIme == 0 &&
                                            resendOtpFlagTimer > 1 &&
                                            $(".verifyingAccountForLogin").attr(
                                                "mobileOtpTimer"
                                            ) == "true"
                                        ) {
                                            afterloginHideTimerFlag = false;
                                            let fetchTIme = $(
                                                "#afterloginTimerOtp"
                                            ).attr("firsttimer");
                                            afterloginhitTIme =
                                                parseInt(fetchTIme);
                                            afterloginCountdownTimeOTP();
                                            $(".resendingLoginOtp").hide();
                                            $(".afterlogintimer").removeClass(
                                                "d-none"
                                            );
                                        } else if (
                                            afterloginhitTIme ==
                                            $("#afterloginTimerOtp").attr(
                                                "firsttimer"
                                            ) &&
                                            resendOtpFlagTimer > 1 &&
                                            $(".verifyingAccountForLogin").attr(
                                                "mobileOtpTimer"
                                            ) == "true"
                                        ) {
                                            afterloginHideTimerFlag = false;
                                            let fetchTIme = $(
                                                "#afterloginTimerOtp"
                                            ).attr("secondtimer");
                                            afterloginhitTIme =
                                                parseInt(fetchTIme);
                                            afterloginCountdownTimeOTP();
                                            $(".resendingLoginOtp").hide();
                                            $(".afterlogintimer").removeClass(
                                                "d-none"
                                            );
                                        } else if (
                                            afterloginhitTIme ==
                                            $("#afterloginTimerOtp").attr(
                                                "secondtimer"
                                            ) &&
                                            resendOtpFlagTimer > 1 &&
                                            $(".verifyingAccountForLogin").attr(
                                                "mobileOtpTimer"
                                            ) == "true"
                                        ) {
                                            afterloginHideTimerFlag = false;
                                            let fetchTIme = $(
                                                "#afterloginTimerOtp"
                                            ).attr("thirdtimer");
                                            afterloginhitTIme =
                                                parseInt(fetchTIme);
                                            afterloginCountdownTimeOTP();
                                            $(".resendingLoginOtp").hide();
                                            $(".afterlogintimer").removeClass(
                                                "d-none"
                                            );
                                        } else if (
                                            afterloginhitTIme ==
                                            $("#afterloginTimerOtp").attr(
                                                "thirdtimer"
                                            ) &&
                                            resendOtpFlagTimer > 1 &&
                                            $(".verifyingAccountForLogin").attr(
                                                "mobileOtpTimer"
                                            ) == "true"
                                        ) {
                                            afterloginHideTimerFlag = false;
                                            let fetchTIme = $(
                                                "#afterloginTimerOtp"
                                            ).attr("fourthtimer");
                                            afterloginhitTIme =
                                                parseInt(fetchTIme);
                                            afterloginCountdownTimeOTP();
                                            $(".resendingLoginOtp").hide();
                                            $(".afterlogintimer").removeClass(
                                                "d-none"
                                            );
                                        } else if (
                                            afterloginhitTIme ==
                                            $("#afterloginTimerOtp").attr(
                                                "fourthtimer"
                                            ) &&
                                            resendOtpFlagTimer > 1 &&
                                            $(".verifyingAccountForLogin").attr(
                                                "mobileOtpTimer"
                                            ) == "true"
                                        ) {
                                            afterloginHideTimerFlag = false;
                                            let fetchTIme = $(
                                                "#afterloginTimerOtp"
                                            ).attr("fifthtimer");
                                            afterloginhitTIme =
                                                parseInt(fetchTIme);
                                            afterloginCountdownTimeOTP();
                                            $(".resendingLoginOtp").hide();
                                            $(".afterlogintimer").removeClass(
                                                "d-none"
                                            );
                                        } else if (
                                            afterloginhitTIme ==
                                            $("#afterloginTimerOtp").attr(
                                                "fifthtimer"
                                            ) &&
                                            resendOtpFlagTimer > 1 &&
                                            $(".verifyingAccountForLogin").attr(
                                                "mobileOtpTimer"
                                            ) == "true"
                                        ) {
                                            resendOtpFlagTimer = 1;
                                            afterloginhitTIme = 0;
                                            afterloginHideTimerFlag = true;
                                            $(".resendingLoginOtp").show();
                                            $(".afterlogintimer").addClass(
                                                "d-none"
                                            );
                                        }
                                        showDialogbox(otpSuccess);
                                        resendOtpFlagTimer++;
                                    } else if (
                                        res.code == 400 ||
                                        res.code == 429
                                    ) {
                                        showDialogbox(limitExceedMessage);
                                    } else {
                                        showDialogbox(globalErrorMessage);
                                    }
                                },
                                error: function (err) {
                                    showDialogbox(globalErrorMessage);
                                },
                            });
                        } else {
                            showDialogbox(globalErrorMessage);
                        }
                    },
                    error: function (err) {
                        showDialogbox(globalErrorMessage);
                    },
                });
            } else {
                showDialogbox(globalErrorMessage);
            }
        },
        error: function (err) {
            showDialogbox(globalErrorMessage);
        },
    });
});

$(document).on("click", ".verifyingAccountForLogin", function (e) {
    e.preventDefault();
    verifyAccount = $(".verifyingAccountForLogin").attr("data-form-verify");
    var otp = $("#otpResending").val();
    var invalidOtpMsg = $("#myModalLogin").attr("invalid-otp");
    $.ajax({
        url: verifyAccount,
        type: "Post",
        data: {
            userId: userAfterSignup.data.user.userId,
            otp: otp,
            username: userAfterSignup.data.user.phone,
        },
        success: function (res) {
            if (res.code == 200) {
                settingUserLoginDetails(userAfterSignup);
            } else {
                showDialogbox(invalidOtpMsg);
                $(document).on("click", ".close-modal-btn", function (e) {
                    location.reload();
                });
            }
        },
        error: function (err) {
            showDialogbox(globalErrorMessage);
            $(document).on("click", ".close-modal-btn", function (e) {
                location.reload();
            });
        },
    });
});

$("#otpResending").on("input", function (e) {
    var lname = $("input[name=otpResending]").val();
    var passwAl = /^[a-zA-Z0-9]+$/;
    if (!passwAl.test(otpResending) && otpResending != "") {
        var otpResendingstr = otpResending.substring(
            0,
            otpResending.length - 1
        );
        $("input[name=otpResending]").val(otpResendingstr);
    }
});

// timer code ...........................
function loginCountdownTimeOTP(loginhitTIme, loginHideTimerFlag, count) {
    var coustomCountDownDate = loginhitTIme * 60000 + 1000;
    var countDownDate = new Date().getTime();
    countDownDate = countDownDate + coustomCountDownDate;
    var myfunc = setInterval(function () {
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes.toString().length == 1) {
            minutes = "0" + minutes;
        }
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        if (seconds.toString().length == 1) {
            seconds = "0" + seconds;
        }
        if (seconds <= 0) {
            seconds = "00";
        }
        if (loginHideTimerFlag == true) {
            clearInterval(myfunc);
            document.getElementById("loginmins" + count).innerHTML = "";
            document.getElementById("loginsecs" + count).innerHTML = "";
            if (count) {
                $("#resendLoginOtp").show();
                $("#loginOtpTimer").addClass("d-none");
            } else {
                $("#resendOtpLogin").show();
                $("#loginTimerOtp").addClass("d-none");
            }
        }
        if (timeleft <= 0) {
            loginHideTimerFlag = false;
            clearInterval(myfunc);
            document.getElementById("loginmins" + count).innerHTML = "";
            document.getElementById("loginsecs" + count).innerHTML = "";
            if (count) {
                $("#resendLoginOtp").show();
                $("#loginOtpTimer").addClass("d-none");
            } else {
                $("#resendOtpLogin").show();
                $("#loginTimerOtp").addClass("d-none");
            }
        }
        if (minutes <= 0 && seconds <= 0) {
            minutes = "00";
            seconds = "00";
            clearInterval(myfunc);
            document.getElementById("loginmins" + count).innerHTML = "";
            document.getElementById("loginsecs" + count).innerHTML = "";
            if (count) {
                $("#resendLoginOtp").show();
                $("#loginOtpTimer").addClass("d-none");
            } else {
                $("#resendOtpLogin").show();
                $("#loginTimerOtp").addClass("d-none");
            }
        } else {
            if (count) {
                $("#resendLoginOtp").hide();
                $("#loginOtpTimer").removeClass("d-none");
                document.getElementById("loginmins" + count).innerHTML =
                    minutes;
                document.getElementById("loginsecs" + count).innerHTML =
                    seconds;
            } else {
                $("#resendOtpLogin").hide();
                $("#loginTimerOtp").removeClass("d-none");
                document.getElementById("loginmins").innerHTML = minutes;
                document.getElementById("loginsecs").innerHTML = seconds;
            }
        }
    }, 1000);
}

var afterloginhitTIme = 0;
var afterloginHideTimerFlag = false;
function afterloginCountdownTimeOTP() {
    var coustomCountDownDate = afterloginhitTIme * 60000 + 1000;
    var countDownDate = new Date().getTime();
    countDownDate = countDownDate + coustomCountDownDate;
    var myfunc = setInterval(function () {
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes.toString().length == 1) {
            minutes = "0" + minutes;
        }
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        if (seconds.toString().length == 1) {
            seconds = "0" + seconds;
        }
        if (seconds <= 0) {
            seconds = "00";
        }
        if (afterloginHideTimerFlag == true) {
            clearInterval(myfunc);
            document.getElementById("afterloginmins").innerHTML = "";
            document.getElementById("afterloginsecs").innerHTML = "";
            $(".resendingLoginOtp").show();
            $("#afterloginTimerOtp").addClass("d-none");
        }
        if (timeleft <= 0) {
            afterloginHideTimerFlag = false;
            clearInterval(myfunc);
            document.getElementById("afterloginmins").innerHTML = "";
            document.getElementById("afterloginsecs").innerHTML = "";
            $(".resendingLoginOtp").show();
            $("#afterloginTimerOtp").addClass("d-none");
        }
        if (minutes <= 0 && seconds <= 0) {
            minutes = "00";
            seconds = "00";
            clearInterval(myfunc);
            document.getElementById("afterloginmins").innerHTML = "";
            document.getElementById("afterloginsecs").innerHTML = "";
            $(".resendingLoginOtp").show();
            $("#afterloginTimerOtp").addClass("d-none");
        } else {
            $(".resendingLoginOtp").hide();
            $("#afterloginTimerOtp").removeClass("d-none");
            document.getElementById("afterloginmins").innerHTML = minutes;
            document.getElementById("afterloginsecs").innerHTML = seconds;
        }
    }, 1000);
}

//ends here.............................
$(document).on("click", "#resendOtpLogin", function () {
    otpTimerFlag = false;
    otpFlag = true;
    $(".forgot-password-submit").click();
});

$(document).on("click", "#resendLoginOtp", function () {
    newOtpTimerFlag = false;
    newOtpLoginFlag = true;
    $(".otp-verify-submit").click();
});

//ends here.............................
function getUrlParams(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split("&"),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined
                ? true
                : decodeURIComponent(sParameterName[1]);
        }
    }
}
