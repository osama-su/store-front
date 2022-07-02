import OrderProductInterface from "./order-productInterface";

interface OrderInterface {
  id?: number;
  status: string;
  userId: number;
  username?: string;
  products?: OrderProductInterface[];
  created_at?: Date;
  updated_at?: Date;
}

export default OrderInterface;
