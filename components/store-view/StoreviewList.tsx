import Link from "next/link";

import StoreIcon from "@/components/store-view/store-icon";
import MapIcon from "@/components/icons/MapIcon";

interface Props {
  store: {
    name: string;
    type: string;
    status: string;
    distance: string;
    location: string;
  };
}

export default function StoreviewList({ store }: Props) {
  const statusClassName = store.status === "Open" ? "active" : "inactive";
  return (
    <>
      <Link passHref href={`/store/${store.name}`}>
        <div className="store-view-list">
          <StoreIcon storeName={store.name} />
          <div className="content">
            <div className="layer">
              <div className="store-name">
                <h4>{store.name}</h4>
                <h6>{store.type}</h6>
              </div>
              <div className={`status ${statusClassName}`}>{store.status}</div>
            </div>
            <div className="layer">
              <div className="address">
                <MapIcon />
                <span>{store.location}</span>
              </div>
              <h6>{store.distance}</h6>
            </div>
          </div>
        </div>
      </Link>
      <style jsx>
        {`
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
