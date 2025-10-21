import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrder = () => {
  const orders = useSelector((state) => state.order.order);

  return (
    <section>
      <div>
        <div className="bg-slate-200 shadow-md p-3 font-semibold">
          <h1>Order</h1>
        </div>
        {!orders[0] && <NoData />}
        {orders.map((order, index) => {
          return (
            <div
              key={order._id + index + "Order"}
              className="order rounded p-4 text-sm"
            >
              <p>Order No:{order?.orderId} </p>
              <div className="flex gap-3">
                <img
                  src={order.product_details.image[0]}
                  className="w-14 h-14"
                />
                <p className="font-medium">{order.product_details.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyOrder;
