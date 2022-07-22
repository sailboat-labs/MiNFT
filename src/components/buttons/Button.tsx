/* eslint-disable react/display-name */
import * as React from "react";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/lib/clsxm";

enum ButtonVariant {
  "primary",
  "danger",
  "outline",
  "ghost",
  "light",
  "dark",
  "success",
  "gray",
  "cancel",
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
          "inline-flex items-center rounded-md px-6 py-2 text-sm font-semibold",
          "focus:outline-none focus-visible:ring focus-visible:ring-primary-500",
          "shadow-sm",
          "transition-colors duration-75",
          //#region  //*=========== Variants ===========
          [
            variant === "primary" && [
              "bg-green text-white",
              "dark:border-gray-800 dark:bg-gray-800",
              "border border-primary-600",
              "hover:bg-primary-50 hover:text-white",
              "active:bg-primary-50",
              "disabled:bg-primary-50 disabled:hover:bg-primary-400",
            ],
            variant === "gray" && [
              "bg-light-gray text-gray",
              "border border-primary-600",
              "hover:bg-primary-50 hover:text-white",
              "active:bg-primary-50",
              "disabled:bg-primary-50 disabled:hover:bg-primary-400",
            ],
            variant === "danger" && [
              "bg-red-400 text-white",
              "border border-red-400",
              "hover:bg-red-400 hover:text-white",
              "active:bg-red-400",
              "disabled:bg-red-100 disabled:hover:bg-red-100",
            ],
            variant === "success" && [
              "bg-green-600 text-white",
              "border border-green-600",
              "hover:bg-green-600 hover:text-white",
              "active:bg-green-600",
              "disabled:bg-green-100 disabled:hover:bg-green-100",
            ],
            variant === "outline" && [
              "text-primary-500",
              "border border-primary-500",
              "hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100",
              isDarkBg &&
                "hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800",
            ],
            variant === "ghost" && [
              "text-primary-500",
              "shadow-none",
              "hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100",
              isDarkBg &&
                "hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800",
            ],
            variant === "light" && [
              "bg-primary-100 text-primary-50 ",
              "border border-gray-300",
              "hover:bg-gray-100 hover:text-dark",
              "active:bg-white/80 disabled:bg-gray-200",
            ],
            variant === "dark" && [
              "bg-gray-900 text-white",
              "border border-gray-600",
              "hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700",
            ],
            variant === "cancel" && [
              "bg-transparent text-red-500",
              "border border-red-500",
              "hover:bg-transparent active:bg-transparent disabled:bg-gray-700",
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
                "text-primary-500": ["outline", "ghost"].includes(variant),
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
