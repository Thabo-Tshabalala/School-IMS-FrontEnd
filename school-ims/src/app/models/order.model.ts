import { User } from "./user.model";
import { Product } from "./product.model";

export interface Order {
    orderId?: number; 
    user: User | null; 
    product: Product | null; 
    orderDate: string; 
    status: string; 
    quantity: number;
}
