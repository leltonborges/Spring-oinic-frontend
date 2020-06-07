import { ItemOrderDTO } from './item-order.dto';
import { PaymentDTO } from './payment.dto';
import { RefDTO } from './ref.dto';

export interface OrderDTO{
    client: RefDTO
    AddressDelivery: RefDTO;
    payment: PaymentDTO;
    itens: ItemOrderDTO[];
}