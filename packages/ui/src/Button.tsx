import React from "react";

export const Button = ({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) => {
  const base = "px-4 py-2 rounded";
  const styles =
    variant === "primary" ? "bg-blue-600 text-white" : "bg-gray-200 text-black";
  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
};
