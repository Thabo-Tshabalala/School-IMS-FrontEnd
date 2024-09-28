// request.model.ts
export interface Request {
    requestId: number| null;
    productId: number | null;
    quantity: number;
    status: string | null;
    productName: string| null;
    imageUrl: string | null;     
  }
  