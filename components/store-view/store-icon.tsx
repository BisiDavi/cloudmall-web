interface storeNameProps {
  storeName: string;
}
export default function StoreIcon({ storeName }: storeNameProps) {
  const storeNameIndex = storeName.split("")[0];
  return (
    <>
      <div className="store-icon">{storeNameIndex}</div>
      <style jsx>{`
        .store-icon {
          height: 80px;
          background-color: var(--cloud-orange);
          color: white;
          font-weight: bold;
          width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
}
