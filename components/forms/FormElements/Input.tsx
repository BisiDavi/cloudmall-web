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

export default function Input({ input }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  {
    const formError: any = errors;
    return (
      <>
        <div className="form-element">
          {input.label && <label htmlFor={input.id}>{input.label}</label>}
          <input
            id={input.id}
            type={input.type}
            className="input"
            placeholder={input.placeholder}
            {...register(input.name)}
          />
          {formError[input.name] && (
            <p className="error">{formError[input.name]?.message}</p>
          )}
        </div>

        <style global jsx>{`
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
        `}</style>
      </>
    );
  }
}
