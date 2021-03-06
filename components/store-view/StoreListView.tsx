import StoreIcon from "@/components/store-view/store-icon";
import MapIcon from "@/components/icons/MapIcon";
import Image from "next/image";
import { storeType } from "@/types/store-types";
import useBaseUrl from "@/hooks/useBaseUrl";

interface Props {
  store: storeType;
  status?: "closed";
}

export default function StoreListView({ store, status }: Props) {
  const statusClassName = store.isCurrentlyOpen ? "active" : "inactive";
  const storeStatus = store.isCurrentlyOpen ? "OPEN" : "CLOSED";
  const [, formattedImage] = useBaseUrl();

  return (
    <>
      <div className={`store-view-list ${status}`}>
        {store.logo ? (
          <Image
            src={`${formattedImage}${store.logo}`}
            alt="logo"
            height={100}
            width={100}
            blurDataURL={`${formattedImage}${store.logo}`}
            placeholder="blur"
          />
        ) : (
          <StoreIcon storeName={store.name} />
        )}
        <div className="content">
          <div className="layer">
            <div className="store-name">
              <h4>{store.name}</h4>
              <h6>{store.category.name}</h6>
            </div>
            <div className={`status ${statusClassName}`}>{storeStatus}</div>
          </div>
          {store.address && (
            <div className="layer">
              <div className="address">
                <MapIcon />
                <span>{store.address}</span>
              </div>
              <h6>4km</h6>
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .store-view-list.closed {
            background-color: #dddcdc33;
          }
          .store-view-list {
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(62, 64, 68, 0.25);
            height: 110px;
            padding: 10px 20px;
          }
          .content {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            justify-content: space-between;
          }
          .status {
            border-radius: 5px;
            padding: 5px;
            font-size: 12px;
            line-height: 14px;
            font-weight: 400;
            font-family: "Ambit", sans-serif;
          }
          .status.active {
            background-color: var(--light-green);
            color: var(--text-green);
          }
          .status.inactive {
            background-color: var(--light-red);
            color: var(--text-red);
          }
          .layer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }

          .store-name h4 {
            margin: 8px 0px;
            font-size: 14px;
            line-height: 16px;
            font-weight: 700;
          }
          .layer h6 {
            font-size: 11px;
            line-height: 13px;
            font-style: italic;
            font-weight: 400;
          }
          .store-name h6 {
            line-height: 14px;
            font-size: 12px;
            font-style: normal;
          }
          .address span {
            font-size: 12px;
            margin-left: 5px;
            color: var(--neutral-gray);
            line-height: 14px;
            font-style: normal;
          }
        `}
      </style>
    </>
  );
}
