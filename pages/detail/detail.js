///<reference path="../../../typings/winjs.d.ts" />
///<reference path="../../../typings/winjs-store.d.ts" />
///<reference path="../../index.ts" />
function merge(a, b) {
    var result = {};
    for (var k in a) {
        result[k] = a[k];
    }
    for (var k in b) {
        result[k] = b[k];
    }
    return result;
}
(function () {
    WinJS.UI.Pages.define("./pages/detail/detail.html", {
        ready: function (element, options) {
            var _this = this;
            var seletedId = options.id;
            var data = Store.Data.filteredData;
            var item;
            for (var i = 0, len = data.length; i < len && !item; i++) {
                if (data.getAt(i).id === seletedId) {
                    item = data.getAt(i);
                }
            }
            this._item = item;
            var specParams = [
                { label: "Name", prop: "name" },
                { label: "Category", prop: "category" },
                { label: "Company", prop: "company" },
                { label: "Avg Rating", prop: "ratingAvg" },
                { label: "Rating Count", prop: "ratingCount" },
            ];
            var context = WinJS.Binding.as({
                specParams: new WinJS.Binding.List(specParams.map(function (entry) {
                    return merge(entry, {
                        value: item[entry.prop]
                    });
                })),
                item: item,
                reviews: new WinJS.Binding.List(item.reviews),
            });
            return WinJS.Binding.processAll(element, context).then(function () {
                _this._addEventListener(".addToCartBtn", "click", _this._addToCart);
            });
        },
        unload: function () {
            (this._unloadActions || []).forEach(function (callback) {
                callback();
            });
        },
        _addEventListener: function (qs, eventName, handler) {
            var el = document.querySelector(qs);
            var handlerBound = handler.bind(this);
            el.addEventListener(eventName, handlerBound);
            this._unloadActions = this._unloadActions || [];
            this._unloadActions.push(function () {
                el.removeEventListener(eventName, handlerBound);
            });
        },
        _addToCart: function (eventObject) {
            var amountInput = this.element.querySelector(".amountInput");
            var addToCartBtn = this.element.querySelector(".addToCartBtn");
            Store.Cart.addToCart({
                item: this._item,
                quantity: parseInt(amountInput.value, 10)
            });
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = "Cart Updated";
            amountInput.disabled = true;
            setTimeout(function () {
                addToCartBtn.disabled = false;
                addToCartBtn.textContent = "Add to Cart";
                amountInput.value = 1;
                amountInput.disabled = false;
            }, 1500);
        }
    });
    WinJS.Namespace.define("Application", {
        MediaPlayer: WinJS.Class.define(function (element, options) {
            // This control works around a WinJS.UI.MediaPlayer control
            // bug where the video element doesn't get reparented in
            // browsers that don't support canHaveHTML.
            var videoElement = element.firstElementChild;
            videoElement.parentNode.removeChild(videoElement);
            var mediaPlayer = new WinJS.UI.MediaPlayer(element, options);
            setTimeout(function () {
                var container = element.querySelector(".win-mediaplayer-container");
                container.insertBefore(videoElement, container.firstElementChild);
                mediaPlayer.mediaElementAdapter.mediaElement = videoElement;
            }, 200);
        }, {})
    });
})();
