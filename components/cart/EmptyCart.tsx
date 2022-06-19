import Image from "next/image";

export default function EmptyCart() {
  return (
    <>
      <div className="noProducts">
        <div className="image-wrapper">
          <Image
            src="/errorIcon.webp"
            alt="error-404"
            height={200}
            width={280}
          />
        </div>
        <p>No Product in this Store</p>
      </div>
      <style jsx>
        {`
          .noProducts {
            display: flex;
            flex-direction: column;
          }
          .image-wrapper {
            display: flex;
            align-items: center;
            margin: auto;
          }
          .noProducts p {
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
