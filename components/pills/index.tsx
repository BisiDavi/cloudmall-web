import React, { useState } from "react";

interface PillProps {
  text: string;
  type: "restaurant" | "store";
}

export default function Pill({ text, type }: PillProps) {
  const pillType = type === "restaurant" ? "pill" : "link";
  const [selected, setSelected] = useState(false);
  const selectedClassName = selected ? "active" : "inactive";

  function onClickHandler() {
    setSelected(!selected);
  }
  return (
    <>
      <button
        type="button"
        onClick={onClickHandler}
        className={`${pillType} ${selectedClassName}`}
      >
        {text}
      </button>
      <style jsx>
        {`
          .pill {
            border: 1px solid rgba(0, 0, 0, 0.4);
            border-radius: 5px;
            background-color: white;
            color: var(--mall-blue);
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            letter-spacing: 0.0125em;
            margin-right: 20px;
            padding: 10px;
          }
          .pill.active {
            background-color: var(--mall-blue);
            color: white;
          }
          .pill.inactive {
            background-color: white;
            color: var(--mall-blue);
          }
          .link {
            margin-right: 20px;
            padding: 4px 10px;
          }
          .link.active {
            background-color: var(--mall-blue);
            color: white;
            border: none;
            border-radius: 5px;
          }
          .link.inactive {
            color: var(--mall-blue);
            border: none;
          }
        `}
      </style>
    </>
  );
}
