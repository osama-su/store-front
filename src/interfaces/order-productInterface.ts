import ProductInterface from "./productInterface";

interface OrderProductInterface {
  id?: number;
  quantity: number;
  productId: number;
  orderId: number;
  products?: ProductInterface[];
}

export default OrderProductInterface;
