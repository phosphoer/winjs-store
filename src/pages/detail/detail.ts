///<reference path="../../../typings/winjs.d.ts" />

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
      var item = {
        id: 1,
        name: "Car",
        desc: "It's fast!",
        category: "Vehicles",
        company: "Edison",
        ratingAvg: 3.8,
        ratingCount: 10,
        reviews: [
          "5 stars, hated it!",
          "Great!",
          "Meh"
        ],
        price: 24.99
      };
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