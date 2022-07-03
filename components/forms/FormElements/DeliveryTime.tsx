import React from "react";

export default function DeliveryTime() {
  return (
    <div className="form-element">
      <label>Delivery Time</label>
      <button className="input deliveryTime">Select Delivery Time</button>

      <style jsx>
        {`
          .deliveryTime {
            background-color: transparent;
          }
        `}
      </style>
    </div>
  );
}
