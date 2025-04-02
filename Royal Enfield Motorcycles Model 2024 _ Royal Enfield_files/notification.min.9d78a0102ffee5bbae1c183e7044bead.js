$(document).ready(function(){
    $("#close-popup").click(function(){
      let imagePath = $("#ga-notifcation-btn").children("img").attr("src");
      $(".notification-popup").hide();
      dataLayer.push({
        event:'sliderNotification',
        eventCategory:'sliderNotification',
        eventAction:'closed',
        eventLabel:imagePath
      })
    });

    $("#ga-notifcation-btn").click(function(){
        let imagePath = $(this).children("img").attr("src");
        dataLayer.push({
            event:'sliderNotification',
            eventCategory:'sliderNotification',
            eventAction:'bannerClick',
            eventLabel: imagePath
        })
      });

  });
  function gaRHSSlider(imagePath,redirectUrl,time,redirectLocation){
    let timoutData = parseInt(time);
    let targetPage = "";
    if(redirectLocation == "true"){
        targetPage = "_blank";
    }else{
        targetPage = "";
    }
    setTimeout(function(){ 
        $("#ga-notifcation-btn").children("img").attr("src",imagePath);
        $("#ga-notifcation-btn").attr("target",targetPage);
        $("#ga-notifcation-btn").attr("href",redirectUrl);
        $("#ga-notification-popup").show();
    }, timoutData);
}