import ContentLoader from "react-content-loader";

function StoreListLoaderComponent(props: any) {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={120}
      viewBox="0 0 400 120"
      backgroundColor="#e6d6d6"
      foregroundColor="#cbc8c8"
      title="loading..."
      {...props}
    >
      <rect x="4" y="0" rx="10" ry="10" width="100%" height="120" />
    </ContentLoader>
  );
}

export default function StoreListLoader() {
  const loaderArray = new Array(4).fill(0);
  return (
    <>
      <div className="storeListLoader">
        {loaderArray.map((_, index) => (
          <StoreListLoaderComponent key={index} />
        ))}
      </div>
      <style jsx>
        {`
          .storeListLoader {
            margin: 0px 10px;
          }
        `}
      </style>
    </>
  );
}
