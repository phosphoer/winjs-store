interface Window {
    Store: {
        catalog: ICatalogItem[]
    };
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
