export interface ProductRecord {
    readonly name: string;
    readonly category: string;
    readonly price: number;
    readonly stock: number;
}

export const PRODUCTS: readonly ProductRecord[] = [
    { name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 142 },
    { name: 'Mechanical Keyboard', category: 'Electronics', price: 89.99, stock: 56 },
    { name: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 0 },
    { name: 'Monitor Stand', category: 'Furniture', price: 79.99, stock: 23 },
    { name: 'Webcam HD', category: 'Electronics', price: 59.99, stock: 87 },
    { name: 'Desk Lamp', category: 'Furniture', price: 34.99, stock: 15 },
];
