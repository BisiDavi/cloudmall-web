import React from "react";
import CaretIcon from "@/components/icons/CaretIcon";
import { useAppSelector } from "@/hooks/useRedux";

export default function UpdateLocation() {
  const { completeAddress } = useAppSelector((state) => state?.location);

  const defaultAddress = completeAddress[0];
  return (
    <>
      <div className="updatelocation">
        <span>{defaultAddress?.title}</span>
        <div>
          <h3>{defaultAddress?.location}</h3>
          <CaretIcon />
        </div>
      </div>
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
