import { useRef, useEffect, useState, useCallback } from "react";
import { TimepickerUI } from "timepicker-ui";
import { useFormContext } from "react-hook-form";

type detailsType = {
  detail: {
    hour: number;
    minutes: number;
    type: number;
  };
};

export default function DeliveryTime() {
  const tmRef = useRef<HTMLDivElement | any>(null);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [inputValue, setInputValue] = useState("12:00 PM");

  const testHandler = useCallback(
    ({ detail: { hour, minutes, type } }: detailsType) => {
      const time = `${hour}:${minutes} ${type}`;
      setInputValue(time);
      setValue("deliveryTime", time);
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

  const formError: any = errors;

  return (
    <div className="form-element timepicker-ui" ref={tmRef}>
      <label>Delivery Time</label>
      <input
        className="input deliveryTime timepicker-ui-input"
        type="test"
        defaultValue={inputValue}
        {...register("time")}
      />
      {formError["time"] && (
        <p className="error">{formError["time"]?.message}</p>
      )}
      <style jsx>
        {`
          .deliveryTime {
            background-color: transparent;
          }
          .form-element .error {
            color: red;
            font-size: 11px;
            padding: 0px;
            margin: 5px 0px;
          }
        `}
      </style>
    </div>
  );
}
