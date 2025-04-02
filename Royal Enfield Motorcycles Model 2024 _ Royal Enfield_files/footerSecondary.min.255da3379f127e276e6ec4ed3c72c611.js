$(function() {
    $(document).on("click",".secondaryFooterAna",function(){
        let ctaText = $(this).children(".footerSublink").children(".footersubText").children(".custom-btn").text().trim();
        let nextPageURL =$(this).children(".footerSublink").attr("href");
        if(nextPageURL == undefined){
            nextPageURL = ""
        }
        dataLayer.push({
            'event':'secondaryFooter',
            'eventCategory':'secondaryFooter',
            'eventAction':ctaText,
            'eventLabel':nextPageURL
         })
    });
    
});
