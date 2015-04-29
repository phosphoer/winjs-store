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

(() => {
  WinJS.UI.Pages.define("/pages/detail/detail.html", {
    ready: function (element, options) {
      var index = Math.random() * Store.Data.filteredData.length | 0;
      var item = Store.Data.filteredData.getAt(index);
      this._item = item;
      var specParams = [
        { label: "Name", prop: "name" },
        { label: "Category", prop: "category" },
        { label: "Company", prop: "company" },
        { label: "Avg Rating", prop: "ratingAvg" },
        { label: "Rating Count", prop: "ratingCount" },
      ];

      var context = WinJS.Binding.as({
        specParams: new WinJS.Binding.List(
          specParams.map(function (entry) {
            return merge(entry, {
              value: item[entry.prop]
            });
          })
        ),
        item: item,
        reviews: new WinJS.Binding.List(item.reviews),
      });
      return WinJS.Binding.processAll(element, context).then(() => {
        this._addEventListener(".addToCartBtn", "click", this._addToCart);
      });
    },
    unload: function () {
      (this._unloadActions || []).forEach((callback) => {
        callback();
      });
    },
    _addEventListener: function (qs, eventName, handler) {
      var el = document.querySelector(qs);
      var handlerBound = handler.bind(this);
      el.addEventListener(eventName, handlerBound);

      this._unloadActions = this._unloadActions || [];
      this._unloadActions.push(() => {
        el.removeEventListener(eventName, handlerBound);
      });
    },
    _addToCart: function (eventObject) {
      var contentDialog = document.querySelector(".win-contentdialog").winControl;
      contentDialog.show().then((e) => {
        if (e.result === 'primary') {
          var amountInput = this.element.querySelector(".amountInput");
          var addToCartBtn = this.element.querySelector(".addToCartBtn");
          Store.Cart.addToCart({
          item: this._item,
          quantity: parseInt(amountInput.value, 10)
          });
          addToCartBtn.disabled = true;
          addToCartBtn.textContent = "Cart Updated";
          amountInput.disabled = true;
          setTimeout(() => {
          addToCartBtn.disabled = false;
          addToCartBtn.textContent = "Add to Cart";
          amountInput.value = 1;
          amountInput.disabled = false;
          }, 1500);
          } else {
            alert('cancelled');
          }
      });
    }
  });

  WinJS.Namespace.define("Application", {
      MediaPlayer: WinJS.Class.define((element, options) => {
          // This control works around a WinJS.UI.MediaPlayer control
          // bug where the video element doesn't get reparented in
          // browsers that don't support canHaveHTML.
          var videoElement = element.firstElementChild;
          videoElement.parentNode.removeChild(videoElement);
          var mediaPlayer = new WinJS.UI.MediaPlayer(element, options);
          setTimeout(function() {
              var container = element.querySelector(".win-mediaplayer-container");
              container.insertBefore(videoElement, container.firstElementChild);
              mediaPlayer.mediaElementAdapter.mediaElement = videoElement;
          }, 200);
      }, {

      })
  });
})();
