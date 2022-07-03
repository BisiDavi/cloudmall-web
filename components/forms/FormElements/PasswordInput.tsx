/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  input: {
    type: string;
    placeholder: string;
    id: string;
    name: string;
    label?: string;
    borderLine?: boolean;
  };
}

export default function PasswordInput({ input }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  {
    const [showPassword, setShowPassword] = useState(false);

    const formError: any = errors;
    const imageUrl = showPassword
      ? "/visiblityIcon.png"
      : "/invisiblityIcon.png";

    const inputType = showPassword ? "text" : "password";

    const passwordVisibilityHandler = () => setShowPassword(!showPassword);

    return (
      <>
        <div className="form-element">
          {input.label && <label htmlFor={input.id}>{input.label}</label>}
          <input
            id={input.id}
            type={inputType}
            className="input"
            placeholder={input.placeholder}
            {...register(input.name)}
          />
          <button
            className="passwordVisiblity"
            type="button"
            onClick={passwordVisibilityHandler}
          >
            <img
              src={imageUrl}
              alt="password visiblity"
              width="24px"
              height="24px"
            />
          </button>
          {formError[input.name] && (
            <p className="error">{formError[input.name]?.message}</p>
          )}
        </div>

        <style jsx>{`
          .input {
            border: 1px solid var(--mall-blue);
            border-radius: 5px;
            padding: 5px 10px;
            color: var(--faded-text);
            margin: 2px 0px;
            display: flex;
            align-items: center;
            padding: 5px 8px;
            height: 40px;
          }
          .form-element {
            display: flex;
            flex-direction: column;
            margin: 10px 0px;
            font-family: Roboto;
            font-style: normal;
            position: relative;
          }
          .form-element label {
            font-weight: 400;
            color: var(--text-color);
            font-size: 14px;
            line-height: 16px;
          }
          .form-element .error {
            color: red;
            font-size: 11px;
            padding: 0px;
            margin: 5px 0px;
          }
          .passwordVisiblity {
            width: 40px;
            border: none;
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-items: center;
            position: absolute;
            right: 0px;
            top: 25px;
          }
          .passwordVisiblity img {
            height: 24px;
            width: 24px;
          }
        `}</style>
      </>
    );
  }
}
