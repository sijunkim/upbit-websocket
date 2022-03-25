export class ObuVO {
    ap!: number;
    as!: number;
    bp!: number;
    bs!: number;
}

export class OrderVO {
    price!: number;
    quantity!: number;
}

export class OrderbookVO {
    asks!: Array<OrderVO>;
    bids!: Array<OrderVO>;
}