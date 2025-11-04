"use client";

import React from "react";
import Image from "next/image";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: "primary" | "secondary" | "tertiary" | "quaternary" | "filter";
  /** Button color type */
  colorType?: "accent" | "default" | "alert";
  /** Whether to show icon/logo */
  withIcon?: boolean;
  /** Children elements */
  children: React.ReactNode;
  /** Whether button is selected (for filter variant) */
  selected?: boolean;
  /** Icon source for filter variant */
  iconSrc?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      colorType = "accent",
      withIcon = false,
      selected = false,
      iconSrc = "/img/keyboard-arrow-down-1.svg",
      ariaLabel,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    // Filter variant has special handling
    if (variant === "filter") {
      return (
        <button
          ref={ref}
          type="button"
          className={`inline-flex items-center justify-center pl-4 pr-2 py-2 relative flex-[0_0_auto] bg-surface-2 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${selected ? "bg-primary text-on-primary" : ""
            } ${className}`}
          aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
          aria-expanded="false"
          {...props}
        >
          <span className="w-fit m3-body-medium-emphasized font-[number:var(--m3-body-medium-emphasized-font-weight)] text-on-surface-subtle text-[length:var(--m3-body-medium-emphasized-font-size)] tracking-[var(--m3-body-medium-emphasized-letter-spacing)] leading-[var(--m3-body-medium-emphasized-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--m3-body-medium-emphasized-font-style)]">
            {children}
          </span>

          <Image
            className="relative w-6 h-6 aspect-[1]"
            alt=""
            src={iconSrc}
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
      );
    }

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
