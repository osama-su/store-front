import ProductInterface from "./productInterface";

interface OrderProductInterface {
  id?: number;
  quantity: number;
  productId: number;
  orderId: number;
  products?: ProductInterface[];
  created_at?: Date;
  updated_at?: Date;
}

export default OrderProductInterface;
