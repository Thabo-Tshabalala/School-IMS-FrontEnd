import { Product } from './product.model'; 
// request.model.ts
export interface Request {
    requestId: number | null;
    product: Product | null; 
    quantity: number;
    status: string | null;
    productName: string | null;
    imageUrl: string | null;
}
