import React from "react";
import orderSuccessImg from "../assets/order_success.png";
import RootLayout from "../layout/RootLayout";
const OrderSuccess = () => {
  return (
    <RootLayout>
      <img className="w-1/2 h-[550px]" src={orderSuccessImg} alt="" />
    </RootLayout>
  );
};

export default OrderSuccess;
