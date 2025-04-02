$(document).ready(function() {
    $("#pageLoader").fadeOut(1000);
    $(".redirectionPath").each(function () {
            let link = $(this).attr("href");
            if (link == undefined) {
                $(this).attr("href", "#");
            } else {
                link = link.replace("/content/royal-enfield", "");
                $(this).attr("href", link);
            }
    });
});
