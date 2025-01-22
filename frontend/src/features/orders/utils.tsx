import { OrderItemData } from "./orderItemData";
import { OrderItem } from "./OrderItem";
import utilStyles from "../../App/utilStyles.module.css";


// transform backend datetime string to "dd/mm/yyyy, hh:mm" format
export function getDateTimeString(rawString: string) {
  const n: "numeric" = "numeric";
  const options = { year: n, month: n, day: n, hour: n, minute: n };
  return new Date(rawString).toLocaleString("en-GB", options);
}



// unpack object to get item detail information
export function renderOrderItems(orderItemsData: OrderItemData[], editable: boolean) {
  const itemsCount = orderItemsData.length;
  if (itemsCount === 0) {
    return <p className={utilStyles.emptyFeedMessage}>Your cart is empty.</p>;
  }
  const orderItems = orderItemsData.map((item, index) => {
    if (index + 1 === itemsCount) {
      return <OrderItem key={item.product_id} orderItemData={item} editable={editable} lastItem={true} />;
    }
    return <OrderItem key={item.product_id} orderItemData={item} editable={editable} />;
  }
  );
  return <div>{orderItems}</div>;
}
