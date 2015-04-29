///<reference path="../../../typings/winjs.d.ts" />
///<reference path="../../../typings/winjs-store.d.ts" />

(() => {
  WinJS.UI.Pages.define("/pages/david/david.html", {
    ready: function(element, options) {
      for (var i = 0; i < window['Store'].categories.length; ++i) {
        var item = window['Store'].categories.getAt(i);
        window['Application'].Pane.categories[item] = false;
      }
    },
    unload: function() {
    }
  });

  WinJS.Namespace.define('Application.Pane', {
    numCategoriesChecked: 0,
    categories: {},
    expandPane: function() {
      var splitview: WinJS.UI.SplitView = document.querySelector("#splitview").winControl;
      splitview.openPane();
    },
    checkboxChanged: function(checkbox) {
      this.categories[checkbox.name] = checkbox.checked;
      if (checkbox.checked)
        ++this.numCategoriesChecked;
      else
        --this.numCategoriesChecked;

      window['Store'].Data.refreshData();
    }
  });
})();