/* eslint-disable unused-imports/no-unused-vars */
import type { ChangeEvent } from "react";

interface Props {
  type: string;
  placeholder: string;
  id: string;
  name: string;
  label?: string;
  value?: string;
  className?: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function BorderlineInput({
  type,
  placeholder,
  id,
  name,
  label,
  className,
  value,
  onChangeHandler,
}: Props) {
  return (
    <>
      <div className="form-element">
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          className={className}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
      </div>

      <style jsx>{`
        .form-element input {
          border: none;
          border-bottom: 2px solid var(--mall-blue);
          border-radius: 0px;
          padding: 5px 10px;
          color: var(--faded-text);
          margin: 2px 0px;
          display: flex;
          align-items: center;
          padding: 5px 8px;
          height: 20px;
        }
        .form-element {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
          height: 20px;
          font-family: Roboto;
          font-style: normal;
        }
        .form-element label {
          font-weight: 400;
          color: var(--text-color);
          font-size: 14px;
          line-height: 16px;
        }
      `}</style>
    </>
  );
}
