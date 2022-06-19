import ContentLoader from "react-content-loader";

function PillLoaderComponent(props: any) {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={30}
      viewBox="0 0 100 30"
      backgroundColor="#e6d6d6"
      foregroundColor="#cbc8c8"
      title="loading..."
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width="100" height="30" />
    </ContentLoader>
  );
}

export default function PillLoader() {
  const productArray = new Array(4).fill(0);

  return (
    <div className="pills">
      {productArray.map((_, index) => (
        <PillLoaderComponent key={index} />
      ))}
      <style jsx>
        {`
          .pills {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 0px 20px;
          }
        `}
      </style>
    </div>
  );
}
