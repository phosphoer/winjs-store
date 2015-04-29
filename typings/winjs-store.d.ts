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