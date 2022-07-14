import NairaIcon from "@/components/icons/NairaIcon";

function numberWithCommas(x: number | string) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface FormatPriceProps {
  price: number;
}

export default function FormatPrice({ price }: FormatPriceProps) {
  const productPrice = price?.toFixed(2);
  const formattedPrice = numberWithCommas(productPrice);

  return (
    <>
      <NairaIcon />
      <span className="price">{formattedPrice}</span>
      <style jsx>
        {`
          .price {
            margin-left: 2px;
          }
        `}
      </style>
    </>
  );
}
