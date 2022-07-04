import { useFormContext } from "react-hook-form";
interface SelectProps {
  input: {
    id: string;
    label: string;
    name: string;
    options: Array<{ text: string; value: string }>;
  };
}

export default function Select({ input }: SelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const formError: any = errors;

  return (
    <>
      <div className="form-element">
        {input.label && <label htmlFor={input.id}>{input.label}</label>}
        <select
          id={input.id}
          className="select"
          {...register(input.name)}
          name={input.name}
        >
          {input.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        {formError[input.name] && (
          <p className="error">{formError[input.name]?.message}</p>
        )}
      </div>
      <style jsx>{`
        .select {
          border: 1px solid var(--mall-blue);
          padding: 5px 10px;
          color: var(--faded-text);
          border-radius: 5px;
          margin: 2px 0px;p
          display: flex;
          width: 100%;
          align-items: center;
          padding: 5px 8px;
          height: 40px;
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
