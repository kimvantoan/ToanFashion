export const formatPrice = (price) => {
  if (typeof price !== "number" || isNaN(price)) return "0₫";
  return `${price.toLocaleString("vi-VN")}₫`;
};