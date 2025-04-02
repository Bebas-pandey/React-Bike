$(function() {
      $(".logoAnalytics").click(function(){
      let logoUrl = $(this).attr("href");
    dataLayer.push({
        'event':'header',
        'eventCategory':'header',
        'eventAction':'logo',
        'eventLabel':logoUrl,
        'iconText':'Royal Enfield'
     });
  });

});
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

    $(".mobile-nav-cta").on("click", function(){
        let motorcycleName;
       if($(this).hasClass("fromHomePage")){
           motorcycleName = $(this).siblings("h4").text();
           if(motorcycleName){
           sessionStorage.setItem("motorcycleName", motorcycleName);
           }
       }
   })
});