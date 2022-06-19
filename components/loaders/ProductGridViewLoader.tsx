import ContentLoader from "react-content-loader";

function ProductGridViewLoaderComponent(props: any) {
  return (
    <ContentLoader
      speed={2}
      width={150}
      height={150}
      viewBox="0 0 150 150"
      backgroundColor="#e6d6d6"
      foregroundColor="#cbc8c8"
      title="loading..."
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width="150" height="150" />
    </ContentLoader>
  );
}

export default function ProductGridViewLoader() {
  const productArray = new Array(8).fill(0);

  return (
    <div className="product-grid">
      {productArray.map((_, index) => (
        <ProductGridViewLoaderComponent key={index} />
      ))}
      <style jsx>
        {`
          .product-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 10px 20px;
            place-items: center;
          }
        `}
      </style>
    </div>
  );
}
