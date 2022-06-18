interface Props {
  input: {
    type: string;
    placeholder: string;
    id: string;
    name: string;
    label?: string;
    value?: string;
    defaultValue?: string;
    borderLine?: boolean;
  };
}

export default function Input({ input }: Props) {
  console.log("input", input);
  return (
    <>
      <div className="form-element">
        {input.label && <label htmlFor={input.id}>{input.label}</label>}
        <input
          id={input.id}
          name={input.name}
          type={input.type}
          value={input?.value}
          defaultValue={input?.defaultValue}
          className="input"
          placeholder={input.placeholder}
        />
      </div>

      <style jsx>{`
        .input {
          border: ${input.borderLine ? "none" : "1px solid var(--mall-blue)"};
          border-bottom: ${input.borderLine
            ? "1px solid var(--mall-blue)"
            : "none"};
          border-radius: ${input.borderLine ? "0px" : "5px"};
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
      `}</style>
    </>
  );
}
