interface Props {
  text: string;
  icon?: any;
  type?: "button" | "reset" | "submit";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
export default function Button({
  text,
  icon,
  type = "button",
  className,
  disabled = false,
  onClick,
}: Props) {
  return (
    <>
      <button
        onClick={onClick}
        className={`button ${className}`}
        type={type}
        disabled={disabled}
      >
        {icon && <span>{icon}</span>}
        {text}
      </button>
      <style jsx>
        {`
          .button {
            background-color: var(--mall-blue);
            display: flex;
            align-items: center;
          }
          .button span {
            margin-right: 5px;
          }

          .button.filled {
            background-color: var(--deep-green);
          }
          .button.empty {
            background-color: var(--mall-blue);
          }
        `}
      </style>
    </>
  );
}
