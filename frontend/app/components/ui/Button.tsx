"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
  /** Button color type */
  colorType?: "accent" | "default" | "alert";
  /** Whether to show icon/logo */
  withIcon?: boolean;
  /** Children elements */
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      colorType = "accent",
      withIcon = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    // Determine button class based on variant and colorType
    const getButtonClass = () => {
      const baseClass = "btn";

      if (colorType === "accent") {
        // Accent uses primary color
        return `${baseClass} btn-${variant}`;
      } else if (colorType === "default") {
        // Default uses secondary/black color
        return `${baseClass} btn-default-${variant}`;
      } else if (colorType === "alert") {
        // Alert uses alert/red color
        return `${baseClass} btn-alert-${variant}`;
      }

      return `${baseClass} btn-${variant}`;
    };

    return (
      <button
        ref={ref}
        className={`${getButtonClass()} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
