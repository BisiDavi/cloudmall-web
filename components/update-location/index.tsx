import React from "react";
import CaretIcon from "@/components/icons/CaretIcon";

export default function UpdateLocation() {
  return (
    <>
      <div className="updatelocation">
        <span>Now</span>
        <div>
          <h3>9, Omoole Estate Mayfair</h3>
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
            height: 90%;
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
