///<reference path="winjs.d.ts" />
///<reference path="seedrandom.d.ts" />

interface ICartItem {
    item: ICatalogItem;
    quantity: number;
}

interface ICatalogItem {
    id: number;
    name: string;
    desc: string;
    category: string;
    company: string;
    featured: boolean;
    ratingAvg: number;
    ratingCount: number;
    reviews: string[];
    price: number;
}

declare module Application {
    export var navigator: {
        home: string
    }
}