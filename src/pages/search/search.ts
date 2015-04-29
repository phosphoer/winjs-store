///<reference path="../../index.ts" />
///<reference path="../../../typings/winjs-store.d.ts" />

(() => {
    WinJS.UI.Pages.define("/pages/search/search.html", {
        ready: function (element, options) {
            this._handleFilterChanged = this._handleFilterChanged.bind(this);

            this._commands = document.querySelectorAll(".sortingCommand");
            for (var i = 0; i < this._commands.length; i++) {
                var cmd = this._commands[i];
                cmd.addEventListener("click", this._handleFilterChanged);
            }
            this._commands[0].click();
        },
        unload: function () {
        },

        _commands: [],

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
})();