import React, { useRef, useEffect, useState, useCallback } from "react";
import { TimepickerUI } from "timepicker-ui";

type detailsType = {
  detail: {
    hour: number;
    minutes: number;
    type: number;
  };
};

export default function DeliveryTime() {
  const tmRef = useRef<HTMLDivElement | any>(null);

  const [inputValue, setInputValue] = useState("12:00 PM");
  const testHandler = useCallback(
    ({ detail: { hour, minutes, type } }: detailsType) => {
      setInputValue(`${hour}:${minutes} ${type}`);
    },
    []
  );

  useEffect(() => {
    if (inputValue === "10:00 PM") {
      alert("You selected 10:00 PM");
    }
  }, [inputValue]);

  useEffect(() => {
    const tm = tmRef.current;

    const newPicker = new TimepickerUI(tm, {});
    newPicker.create();

    tm.addEventListener("accept", testHandler);

    return () => {
      tm.removeEventListener("accept", testHandler);
    };
  }, [testHandler]);

  return (
    <div className="form-element timepicker-ui" ref={tmRef}>
      <label>Delivery Time</label>
      <input
        className="input deliveryTime timepicker-ui-input"
        type="test"
        defaultValue={inputValue}
      />

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
