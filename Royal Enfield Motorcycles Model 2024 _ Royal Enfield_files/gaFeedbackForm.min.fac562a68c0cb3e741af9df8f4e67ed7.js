function gaFeedbackAnalyticsCodeData(ctaClicked,nextPageURL,errorMessage,modelNameValue,productNameValue,ratingValue){
    dataLayer.push({
        'event':'gaFeedbackForm',
        'eventCategory':'gaFeedbackForm',
        'eventAction':ctaClicked,
        'eventLabel':nextPageURL,
        'errorMessage':errorMessage,
        'modelName':modelNameValue,
        'productName':productNameValue,
        'rating':ratingValue
    })
}
$(function(){
    $(document).on('click','#tookRide,#noRide',function(){
        let ctaClicked = $(this).children("label").children("span").text().trim();
        let nextPageURL = $(this).attr("href");
        if(nextPageURL == undefined || nextPageURL == null){
            nextPageURL = ""
        }
        let modelNameValue = $("#feedbackModal").attr("motorcycleName");
        gaFeedbackAnalyticsCodeData(ctaClicked,nextPageURL,"",modelNameValue,"","");
    });

    $(document).on('click','.nextButton,.productLink',function(){
        let ctaClicked = $(this).text().trim();
        let nextPageURL = $(this).attr("href");
        if(nextPageURL == undefined || nextPageURL == null ||nextPageURL == "javascript:void"){
            nextPageURL = ""
        }
        let modelNameValue = $("#feedbackModal").attr("motorcycleName");
        gaFeedbackAnalyticsCodeData(ctaClicked,nextPageURL,"",modelNameValue,"","");
    });

    $(document).on('click','.gafeedbackProducCraouselAna .slick-list .slick-track .slick-slide div .c-item',function(){
        let ctaClicked = "Product";
        let nextPageURL = $(this).children("a").attr("href");
        if(nextPageURL == undefined || nextPageURL == null ||nextPageURL == "javascript:void"){
            nextPageURL = ""
        }
        let modelNameValue = $("#feedbackModal").attr("motorcycleName");
        let productNameValue = $(this).attr("productname");
        gaFeedbackAnalyticsCodeData(ctaClicked,nextPageURL,"",modelNameValue,productNameValue,"");
    });

    $(document).on('click','.successbtrAnaGa,.failBtrAnaGa',function(){
        let ctaClicked = $(this).text().trim();
        let nextPageURL = $(this).attr("href");
        if(nextPageURL == undefined || nextPageURL == null ||nextPageURL == "javascript:void"){
            nextPageURL = ""
        }
        let modelNameValue = $("#feedbackModal").attr("motorcycleName");
        gaFeedbackAnalyticsCodeData(ctaClicked,nextPageURL,"",modelNameValue,"","");
    });

    $(document).on('click','.button1,.button2,.button3',function(){
        let ctaClicked = $(this).parent(".answers").siblings("h4").text().trim();
        let nextPageURL = $(this).attr("href");
        if(nextPageURL == undefined || nextPageURL == null ||nextPageURL == "javascript:void"){
            nextPageURL = ""
        }
        let modelNameValue = $("#feedbackModal").attr("motorcycleName");
        let ratingValue = $(this).text().trim();
        gaFeedbackAnalyticsCodeData(ctaClicked,nextPageURL,"",modelNameValue,"",ratingValue);
    });
    
});
var welcomeText;
var name;
var userN;

function getFeedbackDetails(userName, motorcycleName) {

	$(".step-1").removeClass("d-none");
	$(".step-2").addClass("d-none");
	$(".step-no").addClass("d-none");
	$(".input-no-ride").addClass("d-none");
	$(".step-3").addClass("d-none");
	$(".button1").removeClass("green-checked is-checked");
	$(".button2").removeClass("green-checked is-checked");
	$(".button3").removeClass("green-checked is-checked");
	$("#feedback").val("");


	$('#feedbackModal').modal('show');
	$(".step-1 h2").html("");

	$(".step-1 h2").append(welcomeText + "" + userName + "!");
	userN = userName;
	name = motorcycleName;
	let lowerCaseMotorcycle = name.toLowerCase();
	let dropdownList = $("#feedbackModal").attr("data-json");
	$("#feedbackModal").attr("motorcycleName", motorcycleName);
	let obj = JSON.parse(dropdownList);
	console.log(obj);

	let slickStatus = $(".grey-section-slider").hasClass("slick-slider");

	if (slickStatus == true) {
		$('.grey-section-slider').slick('unslick');
	}

	$(".cq-LinkChecker").remove();
	//$(".c-item").remove();
    $(".motorcycleProduct").remove();



	for (let k = 0; k < obj.length; k++) {
		let nameValue = obj[k].text;

		let lowerCaseMotorcycleValue = nameValue.toLowerCase();

		if (lowerCaseMotorcycleValue == lowerCaseMotorcycle) {

			let motorcycleImage = obj[k].motorcycleImagePath;
			$(".motorcycle-view img").attr("src", motorcycleImage);
			let second = obj[k].secondLevel;
			for (let j = 0; j < second.length; j++) {
				let productImage = "";
				let imageLink = "";
				let productName = "";
				let price = "";
				productImage = second[j].productImagePath;
				imageLink = second[j].imageLink;
				productName = second[j].product;
				price = second[j].price;
				if (imageLink == undefined) {

				} else {
					imageLink = imageLink.replace("/content/royal-enfield", '');
					imageLink = imageLink;
				}


				if (price == undefined && productName != undefined) {
					$(".grey-section-slider").append('<div class="c-item motorcycleProduct" productName="' + productName + '"> <h1> ' + productName + ' </h1> <a href=' + imageLink + " " + ' target="_blank"><img src=' + productImage + " " + 'alt="" /></a></div>');
				} else if (productName == undefined && price != undefined) {
					$(".grey-section-slider").append('<div class="c-item motorcycleProduct"><a href=' + imageLink + " " + ' target="_blank"><img src=' + productImage + " " + 'alt="" /></a><p> ' + price + '</p></div>');
				} else if (productName == undefined && price == undefined) {
					$(".grey-section-slider").append('<div class="c-item motorcycleProduct"><a href=' + imageLink + " " + ' target="_blank"><img src=' + productImage + " " + 'alt="" /></a></div>');
				} else {
					$(".grey-section-slider").append('<div class="c-item motorcycleProduct" productName="' + productName + '"> <h1> ' + productName + ' </h1> <a href=' + imageLink + " " + ' target="_blank"><img src=' + productImage + " " + 'alt="" /></a><p> ' + price + '</p></div>');
				}


			}
		}
	};
	slider();
}

function getAnaCookie(cname) {
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

$(document).ready(function () {

	welcomeText = $(".step-1 h2").text();

	let reasonValidation = $(".input-no-ride").attr("validation");

	fetchGADetails("true");

	var formapi = $("#feedbackModal").attr("form-api");

	let validation1 = $("#feedbackModal").attr("validation1");
	let validation2 = $("#feedbackModal").attr("validation2");
	let validation3 = $("#feedbackModal").attr("validation3");
	let validation4 = $("#feedbackModal").attr("validation4");
	let errorMessage = $("#feedbackModal").attr("error-message");

	let successLik = $(".success").attr("href");
	let failureLink = $(".failure").attr("href");
	let productLink = $(".productLink").attr("href");
    let selectedCookie = getAnaCookie("_ga");

	if (successLik == undefined) {
		$(".success").attr("href", "#");
	} else {
		successLik = successLik.replace("/content/royal-enfield", '');
		$(".success").attr("href", successLik);
	}

	if (failureLink == undefined) {
		$(".failure").attr("href", "#");
	} else {
		failureLink = failureLink.replace("/content/royal-enfield", '');
		$(".failure").attr("href", failureLink);
	}

	if (productLink == undefined) {
		$(".productLink").attr("href", "#");
	} else {
		productLink = productLink.replace("/content/royal-enfield", '');
		$(".productLink").attr("href", productLink);
	}

	$(document).on("click", ".documents-custom", function () {
		$(".documents-custom").removeClass("active");
		$(this).addClass("active");
	});
    try {
        clientID = ga.getAll()[0].get('clientId');
    } catch {
        if (selectedCookie) {
            clientID = selectedCookie.replace("GA1.2.", "");
            clientID = selectedCookie.replace("GA1.1.", "");
        } else {
            clientID = ""
        }
    }
	$(document).on("click", ".nextButton", function () {

		let rejectionReason = $(".input-no-ride").val();
		let radioId = $(this).siblings(".radio-btn").children(".active").attr("id");
		if (radioId == "tookRide") {
			$(".step-1").addClass("d-none");
			$(".step-2").removeClass("d-none");
		} else if (radioId == "noRide") {

			if (rejectionReason != "") {

				$(".step-1").addClass("d-none");
				$(".step-2").addClass("d-none");
				$(".step-no").removeClass("d-none");


				$.ajax({
					url: formapi,
					type: "POST",
					data: {
						rejectionReason: rejectionReason,
						userName: userN,
                        motorcycle: name,
                        clientId:clientID,
					},
					success: function (resp) {
						if (resp.code == 200) {
							$(".step-1").addClass("d-none");
							$(".step-2").addClass("d-none");
							$(".step-no").removeClass("d-none");

						} else {
							showfeedBackDialog(errorMessage);
						}
					},
					error: function (err) {

					}
				});


			} else {
				showfeedBackDialog(reasonValidation);
			}
		}
	});


	$(document).on("click", "#noRide", function () {
		$(".input-no-ride").removeClass("d-none");
	});

	$(document).on("click", "#tookRide", function () {
		$(".input-no-ride").addClass("d-none");
	});

	$(".first-step").find(".button1").click(function () {
		$(".button1").removeClass("green-checked is-checked");
		$(".button1").removeClass("red-checked is-checked");
		$(this).text();
		if ($(this).text() > 2) {
			$(this).addClass("green-checked is-checked");
		} else {
			$(this).addClass("red-checked is-checked");
		}

	});

	$(".second-step").find(".button2").click(function () {
		$(".button2").removeClass("green-checked is-checked");
		$(".button2").removeClass("red-checked is-checked");
		$(this).text();
		if ($(this).text() > 2) {
			$(this).addClass("green-checked is-checked");
		} else {
			$(this).addClass("red-checked is-checked");
		}
	});

	$(".third-step").find(".button3").click(function () {
		$(".button3").removeClass("green-checked is-checked");
		$(".button3").removeClass("red-checked is-checked");
		$(this).text();
		if ($(this).text() > 2) {
			$(this).addClass("green-checked is-checked");
		} else {
			$(this).addClass("red-checked is-checked");
		}
	});

	$(document).on("keyup", ".input-no-ride", function () {
		$(this).val($(this).val().replace(/^\s+/, ""));
	})

	$(document).on("click", ".submitButton", function () {
		let ctaClicked = $(this).text().trim();
		let modelNameValue = $("#feedbackModal").attr("motorcycleName");
		let nextPageURL = $(this).attr("href")
		if (nextPageURL == undefined || nextPageURL == null || nextPageURL == "#") {
			nextPageURL = ""
		}
		let overall = $(".first-step").find(".is-checked").text();
		let condition = $(".second-step").find(".is-checked").text();
		let quality = $(".third-step").find(".is-checked").text();
		let description = $("#feedback").val();

		if (overall == "") {
			showfeedBackDialog(validation1);
			gaFeedbackAnalyticsCodeData(ctaClicked, nextPageURL, validation1, modelNameValue, "");
		} else if (condition == "") {
			showfeedBackDialog(validation2);
			gaFeedbackAnalyticsCodeData(ctaClicked, nextPageURL, validation2, modelNameValue, "");
		} else if (quality == "") {
			showfeedBackDialog(validation3);
			gaFeedbackAnalyticsCodeData(ctaClicked, nextPageURL, validation3, modelNameValue, "");
		} else {
			$.ajax({
				url: formapi,
				type: "POST",
				data: {
					overall: overall,
					condition: condition,
					quality: quality,
					description: description,
					userName: userN,
                    motorcycle: name,
                    clientId:clientID,
				},
				success: function (res) {
					if (res.code == 200) {
						$(".step-2").addClass("d-none");
						$(".step-3").removeClass("d-none");
						gaFeedbackAnalyticsCodeData(ctaClicked, nextPageURL, "", modelNameValue, "");
					} else {
						showfeedBackDialog(errorMessage);
						gaFeedbackAnalyticsCodeData(ctaClicked, nextPageURL, errorMessage, modelNameValue, "");
					}
				},
				error: function (err) {
					gaFeedbackAnalyticsCodeData(ctaClicked, nextPageURL, errorMessage, modelNameValue, "");
				}
			});
		}
	});


});

function slider() {
	$('.grey-section-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: false,
		infinite: false,
		speed: 1000,
		touchThreshold: 15,
		autoplay: true,
		centerMode: false,
		responsive: [{
				breakpoint: 520,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true
				}
			}
		]
	});
}

$(function () {
	$('body').on('keydown', '#feedback', function (e) {
		if (e.which === 32 && e.target.selectionStart === 0) {
			return false;
		}
	});
});

function showfeedBackDialog(message) {
	$("body").addClass("modal-open");
	$("#feedModel").addClass("show");
	$("#feedModel").attr("aria-hidden", "false");
	$('<div class="modal-backdrop fade show"><div>').insertAfter("#feedModel");
	$("#feedmessage").html(message);
	$("#feedModel").css("display", "block");
}

$(document).on("click", ".close-modal-button,.close-feedback", function (e) {
	$("body").removeClass("modal-open1");
	$("#feedModel").removeClass("show");
	$("#feedModel").attr("aria-hidden", "true");
	$("#feedModel").css("display", "none");
    $(".modal-backdrop1").remove();
    $("#feedModel").siblings(".modal-backdrop").remove();
});

