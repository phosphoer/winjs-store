///<reference path="../../../typings/winjs.d.ts" />
///<reference path="../../../typings/winjs-store.d.ts" />

(() => {
    WinJS.UI.Pages.define("/pages/david/david.html", {
        ready: function(element, options) {
        },
        unload: function() {
        }
    });

    window['Store'].expandPane = function() {
        console.log('test');
    };
})();