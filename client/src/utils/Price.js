// src/utils/PriceUtils.js
export const Charges = (price, discount = 0) => {
  const discountAmount = Math.ceil((Number(price) * Number(discount)) / 100);
  const actualPrice = Number(price) - discountAmount;
  const deliveryCharge = actualPrice >= 1000 ? 0 : 99;
  const totalAmount = actualPrice + deliveryCharge;
  return { actualPrice, deliveryCharge, totalAmount };
};

export const DisplayPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(price);
};
