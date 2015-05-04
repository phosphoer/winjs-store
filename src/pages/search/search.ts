///<reference path="../../index.ts" />
///<reference path="../../../typings/winjs-store.d.ts" />

(() => {
    WinJS.UI.Pages.define("./pages/search/search.html", {
        _commands: <HTMLButtonElement[]>[],
        
        ready: function(element, options) {
            this._handleFilterChanged = this._handleFilterChanged.bind(this);

            this._commands = <HTMLButtonElement[]><any>document.querySelectorAll(".sortingCommand");
            for (var i = 0; i < this._commands.length; i++) {
                var cmd = this._commands[i];
                cmd.addEventListener("click", this._handleFilterChanged);
            }
            this._commands[0].click();

            for (var i = 0; i < window['Store'].Data.currentCategories.length; ++i) {
                var item = window['Store'].categories.getAt(i);
                window['Store'].Data.currentCategories[item] = false;
            }

            var searchBox = document.querySelector("#searchbox");
            searchBox.addEventListener("suggestionsrequested", this._suggestionsRequestedHandler);
            searchBox.addEventListener("querysubmitted", this._querySubmittedHandler);
        },

        unload: function() {
            this._commands = document.querySelectorAll(".sortingCommand");
            for (var i = 0; i < this._commands.length; i++) {
                var cmd = this._commands[i];
                cmd.removeEventListener("click", this._handleFilterChanged);
            }

            var searchBox = document.querySelector("#searchbox");
            searchBox.removeEventListener("suggestionsrequested", this._suggestionsRequestedHandler);
            searchBox.removeEventListener("querysubmitted", this._querySubmittedHandler);
        },

        _suggestionsRequestedHandler: function(eventObject) {
            var queryText = eventObject.detail.queryText,
                query = queryText.toLowerCase(),
                suggestionCollection = eventObject.detail.searchSuggestionCollection;
            if (queryText.length > 0) {

                var catalog = Store.catalog;
                var len = catalog.length;

                var matchesFound = 0;
                for (var i = 0; i < len && matchesFound < 6; i++) {
                    if (catalog[i].name.toLowerCase().indexOf(query) >= 0) {
                        suggestionCollection.appendQuerySuggestion(catalog[i].name);
                        matchesFound++;
                    }
                }
            }
        },

        _querySubmittedHandler: function(eventObject) {
            var queryText = eventObject.detail.queryText;
            Store.Data.currentQuery = queryText;
            Store.Data.refreshData();
        },

        _handleFilterChanged(e) {
            var target = e.currentTarget;
            for (var i = 0; i < this._commands.length; i++) {
                var cmd = this._commands[i];
                cmd.winControl.selected = cmd === target;
            }

            switch (target.winControl.id) {
                case "featured":
                    Store.Data.sortingFunc = (a, b) => a.featured ? -1 : (b.featured ? 1 : 0);
                    break;

                case "mostReviews":
                    Store.Data.sortingFunc = (a, b) => a.reviews.length > b.reviews.length ? -1 : (a.reviews.length === b.reviews.length ? 0 : 1);
                    break;

                case "price":
                    Store.Data.sortingFunc = (a, b) => a.price < b.price ? -1 : (a.price === b.price ? 0 : 1);
                    break;

                case "priceDesc":
                    Store.Data.sortingFunc = (a, b) => a.price < b.price ? 1 : (a.price === b.price ? 0 : -1);
                    break;

                case "ratings":
                    Store.Data.sortingFunc = (a, b) => a.ratingAvg < b.ratingAvg ? 1 : (a.ratingAvg === b.ratingAvg ? 0 : -1);
                    break;

                case "ratingsDesc":
                    Store.Data.sortingFunc = (a, b) => a.ratingAvg < b.ratingAvg ? -1 : (a.ratingAvg === b.ratingAvg ? 0 : 1);
                    break;
            }
        },
    });

    WinJS.Namespace.define('Application.Pane', {
        expandPane: function() {
            var splitview: WinJS.UI.SplitView = document.querySelector("#splitview").winControl;
            splitview.openPane();
        },
        checkboxChanged: function(checkbox) {
            window['Store'].Data.currentCategories[checkbox.name] = checkbox.checked;
            if (checkbox.checked)
                ++window['Store'].Data.numCategoriesChecked;
            else
                --window['Store'].Data.numCategoriesChecked;

            window['Store'].Data.refreshData();
        },
        companyCheckboxChanged: function(checkbox) {
            window['Store'].Data.currentCompanies[checkbox.name] = checkbox.checked;
            if (checkbox.checked)
                ++window['Store'].Data.numCompaniesChecked;
            else
                --window['Store'].Data.numCompaniesChecked;

            window['Store'].Data.refreshData();
        }

    });
})();