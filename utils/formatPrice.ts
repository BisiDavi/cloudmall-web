function numberWithCommas(x: number | string) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function formatPrice(price: number) {
  const productPrice = price?.toFixed(2);
  return numberWithCommas(productPrice);
}
