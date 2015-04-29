///<reference path="../../../typings/winjs.d.ts" />
///<reference path="../../../typings/winjs-store.d.ts" />

(() => {
  WinJS.UI.Pages.define("/pages/david/david.html", {
    ready: function(element, options) {
      for (var i = 0; i < window['Store'].Data.currentCategories.length; ++i) {
        var item = window['Store'].categories.getAt(i);
        window['Store'].Data.currentCategories[item] = false;
      }
    },
    unload: function() {
    }
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
    }
  });
})();