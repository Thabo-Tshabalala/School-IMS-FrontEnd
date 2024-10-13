import { User } from "./user.model";

export interface Order {
    orderId?: number;
    user: User | null; 
    orderDate: string; 
    status: string; 
    quantity: number;
    items: {
        itemId: number; 
        quantity: number; 
        imageUrl: string;
    }[];
}
