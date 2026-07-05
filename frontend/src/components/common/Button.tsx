import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  isLoading,
  className = "",
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`btn btn-${variant} ${className}`.trim()}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Đang tra cứu..." : children}
    </button>
  );
}
