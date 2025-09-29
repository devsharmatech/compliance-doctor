// components/ui/Button.tsx

import { cn } from "@/libs/utils"; // optional for class merging

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "accent"; // add more if needed
}

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-primary text-white bg-primary-hover hover:text- cursor-pointer",
    secondary: "bg-secondary text-secondary hover:bg-gray-200 hover:text-black cursor-pointer",
    danger: "bg-red-500 text-white hover:bg-red-600 cursor-pointer",
    accent: "bg-accent text-white hover:bg-teal-500 cursor-pointer"
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
};
