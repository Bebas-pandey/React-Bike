$(document).ready(function () {
    const onPassDataLayer = (eventObject) => {
        dataLayer.push(eventObject);
    };

    $(".list-nav").click(function () {
        const navTitle = $(this).children(".desktop-title-text").text().trim(),
            eventLabel = $(this).attr("href");
        
        if ($(this).siblings(".desk-nav-dd").length <= 0) { 
            onPassDataLayer({
                event: "navigation",
                eventCategory: "navigation",
                eventAction: navTitle,
                eventLabel: eventLabel ? eventLabel : "NA",
                headingName: "NA",
                primaryText: "NA",
            });
        }
        
    });

    $(".mobile-list-nav").click(function () {
        const navTitle = $(this).children(".mobile-title-text").text().trim();
            eventLabel = $(this).attr("href");
        $(this)
            .siblings(".mobile-nav-dd")
            .children(".mob-nav-options")
            .children(".nav-opt")
            .each(function () {
                $(this)
                    .children(".nav-opt-caption")
                    .children("a")
                    .each(function () {
                        $(this).attr("nav-title", navTitle);
                    });
            });
        
         onPassDataLayer({
            event: "navigation",
            eventCategory: "navigation",
            eventAction: navTitle,
            eventLabel: eventLabel ? eventLabel : "NA",
            headingName: "NA",
            primaryText: "NA",
        });
    });

    $(".sub-nav").click(function () {
        let eventLabel = $(this).attr("href"),
            eventAction = $(this).text().trim(),
            headingName = "NA",
            primaryText = $(this).attr("nav-title");

        onPassDataLayer({
            event: "navigation",
            eventCategory: "navigation",
            eventAction,
            eventLabel,
            headingName,
            primaryText,
        });
    });

    $(".mobile-nav-cta").click(function () {
        let eventLabel = $(this).attr("href"),
            eventAction = $(this).text().trim(),
            headingName = $(this).siblings("h4").text().trim(),
            primaryText = $(this).attr("nav-title");

        onPassDataLayer({
            event: "navigation",
            eventCategory: "navigation",
            eventAction,
            eventLabel,
            headingName,
            primaryText,
        });
    });
});
