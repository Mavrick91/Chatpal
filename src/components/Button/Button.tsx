import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  testId?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, testId, type = "button", className, ...buttonAttributes }: Props) => (
  <button
    data-testid={testId}
    type={type}
    {...buttonAttributes}
    className={`${buttonAttributes.disabled ? "disabled:opacity-50" : ""} ${className}`}
  >
    {children}
  </button>
);

export default Button;
