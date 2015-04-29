///<reference path="../../../typings/winjs.d.ts" />
///<reference path="../../../typings/winjs-store.d.ts" />

(() => {
    WinJS.UI.Pages.define("/pages/david/david.html", {
        ready: function(element, options) {

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
      }
    });

})();