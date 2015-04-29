
declare module Store {
    catalog: ICatalogItem[];
    categories: string[];
    companies: string[];
}

interface ICatalogItem {
    id: number;
    name: string;
    desc: string;
    category: string;
    company: string;
    ratingAvg: number;
    ratingCount: number;
    reviews: string[];
    price: number;
}

declare module Application {
    export var navigator = {
        home: string
    }
}