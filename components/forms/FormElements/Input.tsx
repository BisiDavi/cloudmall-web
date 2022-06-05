interface Props {
  input: {
    type: string;
    placeholder: string;
  };
}

export default function Input({ input }: Props) {
  return (
    <>
      <input
        type={input.type}
        className="input"
        placeholder={input.placeholder}
      />
      <style jsx>{`
        .input {
          border: 1px solid var(--mall-blue);
          padding: 5px 10px;
          color: var(--faded-text);
          border-radius: 5px;
        }
      `}</style>
    </>
  );
}
