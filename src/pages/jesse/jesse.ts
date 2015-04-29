///<reference path="../../../typings/winjs.d.ts" />

(() => {
    WinJS.UI.Pages.define("/pages/jesse/jesse.html", {
        init: function (element, options) {
            // runs before process all
        },
        ready: function (element, options) {
            // runs after process all.

            //Store.catalog = catalog;
            //Store.categories = new WinJS.Binding.List(categories);
            //Store.companies = new WinJS.Binding.List(companies);
            //Store.Data.refreshData();


            //function suggestionsRequestedHandler(eventObject) {
            //    var queryText = eventObject.detail.queryText,
            //        query = queryText.toLowerCase(),
            //        suggestionCollection = eventObject.detail.searchSuggestionCollection;
            //    if (queryText.length > 0) {
            //        for (var i = 0, len = suggestionList.length; i < len; i++) {
            //            if (suggestionList[i].substr(0, query.length).toLowerCase() === query) {
            //                suggestionCollection.appendQuerySuggestion(suggestionList[i]);
            //            }
            //        }
            //    }
            //}

            function querySubmittedHandler(eventObject) {
                var queryText = eventObject.detail.queryText;
                WinJS.log && WinJS.log(queryText, "sample", "status");
                window["Store"].Data.filterFunction(queryText);
            }

            var statusEl = <HTMLElement>(document.querySelector("#status"));

            WinJS.log = function (msg, source, type) {
                if (type === "status") {
                    statusEl.innerHTML += msg + "<br/>";
                }
            }

            var searchBox = document.querySelector("#searchbox");
            //searchBox.addEventListener("suggestionsrequested", suggestionsRequestedHandler);
            searchBox.addEventListener("querysubmitted", querySubmittedHandler);

        },
        unload: function () {
        }
    });
})();