$(document).ready(function () {
    var suggestionCount = parseInt($(".searchInp").attr("data-auto-suggest-count"));
    var searchCount = parseInt($(".searchInp").attr("data-auto-search-count"));
    var array = [];
    var input = document.getElementById("header-search");

    var awesomplete = new Awesomplete(input, {
        minChars: 1,
        maxItems: suggestionCount, //how many items are needed to be displayed
        autoFirst: true,
    });

    $("#header-search").on("keypress", function (e) {
        var data = $("#header-search").val();
        var key = e.which;
        var url = $("#header-search").attr("data-search-url");
        if (key == 13) {
            var selected = $("#header-search").val();
            var resultPage = $(".hiddenSearch").attr("data-location-url");
            resultPage = resultPage.replace("/content/royal-enfield", "");
            window.location.assign(resultPage + "?searchInput=" + selected);
        }

        if (data.length >= searchCount) {
            $.ajax({
                url: url + "?query=" + data + "*",
                success: function (result) {
                    var resultSolr = result.data;
                    for (var i = 0; i < resultSolr.length; i++) {
                        array.push(resultSolr[i].title[0]);
                    }

                    awesomplete.list = array.unique();
                },
            });
        }
    });
    $("#searchIcon").click(function () {
        let nextUrl = $(this).attr("href");
        if (nextUrl == undefined) {
            nextUrl = "";
        }
        dataLayer.push({
            event: "header",
            eventCategory: "header",
            eventAction: "",
            eventLabel: nextUrl,
            iconText: "search",
        });
    });

    $("#header-search").on("awesomplete-selectcomplete", function (e) {
        var selected = $("#header-search").val();
        var resultPage = $(".hiddenSearch").attr("data-location-url");
        resultPage = resultPage.replace("/content/royal-enfield", "");
        window.location.assign(resultPage + "?searchInput=" + selected);
    });
});

Array.prototype.unique = function () {
    return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
};
