interface Props {
  input: {
    type: string;
    placeholder: string;
    id: string;
    name: string;
    label: string;
  };
}

export default function Input({ input }: Props) {
  return (
    <>
      <div className="form-element">
        {input.label && <label htmlFor={input.id}>{input.label}</label>}
        <input
          id={input.id}
          name={input.name}
          type={input.type}
          className="input"
          placeholder={input.placeholder}
        />
      </div>

      <style jsx>{`
        .input {
          border: 1px solid var(--mall-blue);
          padding: 5px 10px;
          color: var(--faded-text);
          border-radius: 5px;
          margin: 5px 0px;
          display: flex;
          align-items: center;
          padding: 5px;
          height: 40px;
        }
        .form-element {
          display: flex;
          flex-direction: column;
          margin: 5px 0px;
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
