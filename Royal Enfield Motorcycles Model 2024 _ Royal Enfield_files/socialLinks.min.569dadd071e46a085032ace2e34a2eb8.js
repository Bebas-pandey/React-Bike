
$(function() {
    $(document).on("click",".socialLinkAna",function(){
        let ctaText = $(this).attr("title");
        let nextPageURL = $(this).attr("href");
        let heading = $(this).parent("li").parent("ul").siblings(".socialLinkMainHeading").text().trim();
        dataLayer.push({
            'event':'socialLinks',
            'eventCategory':'socialLinks',
            'eventAction':ctaText,
            'eventLabel':nextPageURL,
            'headingName':heading,
            'iconText':ctaText
         })
    });
    
});

