export const PriceWithDiscount = (price, discount = 1) => {
  const discountAmount = Math.ceil((Number(price) * Number(discount)) / 100);
  const ActualPrice = Number(price) - Number(discountAmount);

  return ActualPrice;
};
