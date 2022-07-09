import React from "react";
import CaretIcon from "@/components/icons/CaretIcon";
import { useAppSelector } from "@/hooks/useRedux";

export default function UpdateLocation() {
  const { user } = useAppSelector((state) => state?.user);

  const userAddress = user?.addresses[0]?.address;
  const isDefault = user?.addresses[0]?.isDefault ? "Home" : "";
  return (
    <>
      {user !== null && (
        <div className="updatelocation">
          <span>{isDefault}</span>
          <div>
            <h3>{userAddress}</h3>
            <CaretIcon />
          </div>
        </div>
      )}
      <style jsx>
        {`
          .updatelocation {
            width: 100%;
            font-size: 12px;
            font-style: normal;
            line-height: 18px;
            padding: 0px;
            margin-top: 0px;
            margin-left: 0px;
          }
          .updatelocation span {
            font-weight: 300;
          }
          .updatelocation h3 {
            font-weight: 500;
            margin-right: 10px;
            font-size: 12px;
            line-height: 14px;
          }
          .updatelocation div {
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </>
  );
}
