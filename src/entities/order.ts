export class Obu {
    ap!: number;
    as!: number;
    bp!: number;
    bs!: number;
}

export class Order {
    price!: number;
    quantity!: number;
}

export class Orderbook {
    asks!: Array<Order>;
    bids!: Array<Order>;
}