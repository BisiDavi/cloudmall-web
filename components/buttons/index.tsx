/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
interface Props {
  text: string;
  icon?: any;
  type?: "button" | "reset" | "submit";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
export default function Button({
  text,
  icon,
  type = "button",
  className,
  loading,
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
        {loading && <img src="/dot-loading.gif" className="loadingIcon" />}
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
          .loadingIcon {
            width: 40px;
          }
        `}
      </style>
    </>
  );
}
