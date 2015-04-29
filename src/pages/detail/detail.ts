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
      return WinJS.Binding.processAll(element, context);
    },
    unload: function () {
    }
  });
})();