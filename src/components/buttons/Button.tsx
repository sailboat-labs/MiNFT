import * as React from "react";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/lib/clsxm";

enum ButtonVariant {
  "primary",
  "success",
  "outline",
  "ghost",
  "light",
  "dark",
}

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = "primary",
      isDarkBg = false,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsxm(
          "inline-flex items-center rounded px-4 py-2 font-semibold",
          "focus:outline-none focus-visible:ring focus-visible:ring-primary-500",
          "shadow-sm",
          "transition-colors duration-75",
          //#region  //*=========== Variants ===========
          [
            variant === "primary" && [
              "bg-indigo-500 text-white",
              "border border-indigo-600",
              "hover:bg-indigo-600 hover:text-white",
              "active:bg-indigo-500",
              "disabled:bg-indigo-400 disabled:hover:bg-indigo-400",
            ],
            variant === "success" && [
              "bg-green-500 text-white",
              "border border-green-600",
              "hover:bg-green-600 hover:text-white",
              "active:bg-green-500",
              "disabled:bg-green-400 disabled:hover:bg-indigo-400",
            ],
            variant === "outline" && [
              "text-range-500",
              "border border-indigo-500",
              "hover:bg-indigo-50 active:bg-indigo-100 disabled:bg-indigo-100",
              isDarkBg &&
                "hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800",
            ],
            variant === "ghost" && [
              "text-range-500",
              "shadow-none",
              "hover:bg-indigo-50 active:bg-indigo-100 disabled:bg-indigo-100",
              isDarkBg &&
                "hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800",
            ],
            variant === "light" && [
              "bg-white text-dark dark:bg-[color:var(--dark)] ",
              "border border-gray-300",
              "hover:bg-gray-100 hover:text-dark",
              "dark:bg-[color:var(--dark)]/80 active:bg-white disabled:bg-gray-200",
            ],
            variant === "dark" && [
              "bg-gray-900 text-white",
              "border border-gray-600",
              "hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700",
            ],
          ],
          //#endregion  //*======== Variants ===========
          "disabled:cursor-not-allowed",
          isLoading &&
            "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              {
                "text-white": ["primary", "dark"].includes(variant),
                "text-black": ["light"].includes(variant),
                "text-range-500": ["outline", "ghost"].includes(variant),
              }
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {children}
      </button>
    );
  }
);

export default Button;
