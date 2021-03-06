﻿///<reference path="../typings/winjs.d.ts" />
///<reference path="../typings/winjs-store.d.ts" />

module Store {
    export var catalog: ICatalogItem[];
    export var categories: WinJS.Binding.List<string>;
    export var companies: WinJS.Binding.List<string>;

    export function showCart() {
        var contentDialog = document.querySelector("#cartDialog").winControl;
        var numItems = 0;
        Cart.items.forEach(x => numItems += x.quantity)
        document.querySelector("#cartContent").textContent = "You have " + numItems + " item(s) in your cart.";
        contentDialog.show().then((e) => {
            if (e.result === 'primary') {
                Cart.items.length = 0;
            }
        });
    }

    export function showProfile() {
        var dialogElement = document.querySelector("#profileDialog");
        var dialog = dialogElement.winControl;
        var inputElement = (<HTMLInputElement>dialogElement.querySelector("input"));
        inputElement.value = "";
        dialog.show().then(e => {
            if (e.result === "primary" && inputElement.value.trim()) {
                document.querySelector("#appbarLabel").textContent = "Hi, " + inputElement.value.trim();
            }
        });
    }

    export function showSettings() {
        var dialogElement = document.querySelector("#settingsDialog");
        var dialog = dialogElement.winControl;
        var inputElement = (<HTMLInputElement>dialogElement.querySelector("input"));
        var searchBox: WinJS.UI.SearchBox = document.querySelector(".win-searchbox").winControl;
        inputElement.checked = !searchBox.searchHistoryDisabled;
        dialog.show().then(e => {
            searchBox.searchHistoryDisabled = !inputElement.checked;
        });
    }

    // Static Data Class
    export class Data {
        private static _sortingFunc: (left: ICatalogItem, right: ICatalogItem) => number = (a, b) => 0;

        static filteredData = new WinJS.Binding.List<ICatalogItem>();

        static filterFunction = (item: ICatalogItem): boolean => {
            return Data.categoryFilterFunction(item) &&
                Data.queryFilterFunction(item);
        }

        static queryFilterFunction = (item: ICatalogItem): boolean => {
            return item.name.toLowerCase().indexOf(Data.currentQuery.toLowerCase()) >= 0 ||
                item.category.toLowerCase().indexOf(Data.currentQuery.toLowerCase()) >= 0 ||
                item.company.toLowerCase().indexOf(Data.currentQuery.toLowerCase()) >= 0;
        }

        static categoryFilterFunction = (item: ICatalogItem): boolean => {
            if (Data.numCategoriesChecked > 0 && !Data.currentCategories[item.category])
                return false;

            if (Data.numCompaniesChecked > 0 && !Data.currentCompanies[item.company])
                return false;

            return true;
        }

        private static _currentQuery = "";
        static get currentQuery() {
            return Data._currentQuery;
        }
        static set currentQuery(value: string) {
            value = value || "";
            if (value !== Data._currentQuery) {
                Data._currentQuery = value;
                Data.refreshData();
            }
        }

        static numCategoriesChecked = 0;
        static numCompaniesChecked = 0;
        static numPricesChecked = 0;
        static numRatingsChecked = 0;
        static currentCategories = {};
        static currentCompanies = {};
        static currentPrices = {};
        static currentRatings = {};

        static get sortingFunc() {
            return Data._sortingFunc;
        }
        static set sortingFunc(value: (left: ICatalogItem, right: ICatalogItem) => number) {
            Data._sortingFunc = value;
            Data.refreshData();
        }

        static refreshData() {
            var tempCatalog: ICatalogItem[] = catalog.filter(Data.filterFunction);
            tempCatalog = tempCatalog.sort(Data.sortingFunc).slice(0, 100);

            Data.filteredData.length = 0;
            Data.filteredData.splice.apply(Data.filteredData, (<any>[0, 0]).concat(tempCatalog));
        }
    }

    export class Cart {
        static items = new WinJS.Binding.List<ICartItem>();

        static addToCart(newCartItem: ICartItem): void {
            for (var i = 0, len = Cart.items.length; i < len; i++) {
                if (Cart.items.getAt(i).item.id === newCartItem.item.id) {
                    var cartItem = Cart.items.getAt(i);
                    cartItem.quantity += newCartItem.quantity;
                    Cart.items.setAt(i, cartItem);
                    return;
                }
            }

            Cart.items.push(newCartItem);
        }
    }
}

(() => {
    Math.seedrandom("WinJS");

    var categories = ["Electronics", "Kitchen", "Books", "Furniture", "Outdoor"];
    var companies = ["MoneyGrab Inc.", "Rip-Off Corporation", "Buy Lo Sell Hi LLC", "Cheap Stuff Market", "No Support Retailer"];

    var loremIpsum = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
    ];
    var catalog: ICatalogItem[] = [];

    for (var i = 0; i < 1000; i++) {
        var category = categories[Math.random() * categories.length | 0];
        var popular = Math.random() > 0.8;
        var featured = popular ? (Math.random() > 0.9) : false;
        var numReviews = popular ? (50 + Math.random() * 100) : (5 + Math.random() * 10);

        var reviews: string[] = [];
        for (var j = 0; j < numReviews; j++) {
            reviews.push(loremIpsum[j % loremIpsum.length]);
        }

        catalog.push({
            category: category,
            company: companies[Math.random() * companies.length | 0],
            desc: loremIpsum[i % loremIpsum.length],
            featured: featured,
            id: i,
            name: (featured ? "Featured " : "") + category + " item " + (i + 0),
            price: +(1 + Math.random() * 200).toFixed(2),
            ratingAvg: +(popular ? (3 + Math.random() * 2) : 1 + Math.random() * 4).toFixed(2),
            ratingCount: (popular ? (100 + Math.random() * 10000) : (Math.random() * 50)) | 0,
            reviews: reviews,
        });
    }

    Store.catalog = catalog;
    Store.categories = new WinJS.Binding.List(categories);
    Store.companies = new WinJS.Binding.List(companies);

    window.addEventListener("DOMContentLoaded", () => {
        WinJS.UI.processAll().then(() => {
            WinJS.Navigation.navigate(Application.navigator.home);
            Store.Data.refreshData();
        });
    });
})();
