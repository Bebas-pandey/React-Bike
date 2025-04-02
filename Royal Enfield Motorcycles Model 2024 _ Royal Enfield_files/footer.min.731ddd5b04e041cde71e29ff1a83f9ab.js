$(function() {
  $(document).on('click',"#footerAnalytics li",function(){
      let ctaText = $(this).children("a").text().trim();
      let nextUrl = $(this).children("a").attr("href");
      if(nextUrl == undefined){
        nextUrl = "";
      }
      dataLayer.push({
        'event':'footer',
        'eventCategory':'footer',
        'eventAction':ctaText,
        'eventLabel':nextUrl
    });
  });

});
/* footer [START]*/
//footer nav
$(document).ready(function() {
  $(".list-of-links h3").click(function() {
    $(this)
      .parent()
      .toggleClass("active");
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".list-of-links").removeClass("active");
      $(this)
        .parent()
        .addClass("active");
    }

    //list-of-links sub nav
    if ($(".nav-list .nav-list-children").hasClass("active")) {
      $(".nav-list .nav-list-children").removeClass("active");
      $(this).addClass("active");
    }
  });

  //list-of-links sub nav children
  $(".nav-list .nav-list-children").click(function() {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      // $(".nav-list .nav-list-children").removeClass("active").children('.nav-list-sub').slideUp();
      // $(this).addClass("active").children('.nav-list-sub').slideDown();

      $(".nav-list .nav-list-children").removeClass("active");
      $(this).addClass("active");
    }
  });
});
/* footer [END]*/

