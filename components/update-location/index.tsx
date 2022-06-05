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
            background-color: var(--light-blue);
            font-size: 12px;
            font-style: normal;
            line-height: 18px;
            padding: 10px 15px;
            height: 90%;
            box-shadow: 0px 4px 3px 0px #00000059;
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
