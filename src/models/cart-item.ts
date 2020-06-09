import { ProductDTO } from './produto.dto';

export interface CartItem{
    quantity: number,
    product: ProductDTO
}