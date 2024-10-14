import { Product } from './product.model'; 
import { User } from './user.model';

export interface Request {
    requestId: number | null;
    product: Product | null; 
    user:User | null,
    quantity: number;
    status: string | null;

}
