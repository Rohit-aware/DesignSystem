
export type BottomStackParamList = {
    Home: undefined
    Cart: undefined
    Groove: undefined
}

export type MainStackParamList = {
    BottomTab: BottomStackParamList
    ProductDetails: {
        product: {
            id: string;
            title: string;
            brand: string;
            price: number;
            originalPrice: number;
            discount: number;
            image: string;
            rating: number;
            reviews: number;
            tag?: string;
        }
    }
}