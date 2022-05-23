interface Props {
  text: string;
  icon?: any;
  type?: "button" | "reset" | "submit";
  className?: string;
}
export default function Button({
  text,
  icon,
  type = "button",
  className,
}: Props) {
  return (
    <>
      <button className={`button ${className}`} type={type}>
        {icon && <span>{icon}</span>}
        {text}
      </button>
      <style jsx>
        {`
          button.button {
            background-color: var(--mall-blue);
            display: flex;
            align-items: center;
          }
          .button span {
            margin-right: 5px;
          }
        `}
      </style>
    </>
  );
}
