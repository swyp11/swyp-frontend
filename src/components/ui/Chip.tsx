"use client";

import React from "react";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Chip label text */
  label: string;
  /** Whether chip is selected */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional className */
  className?: string;
  /** Chip variant */
  variant?: "default" | "outlined" | "pill";
  /** Size variant */
  size?: "small" | "medium";
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      label,
      selected = false,
      onClick,
      className = "",
      variant = "default",
      size = "medium",
      ...props
    },
    ref
  ) => {
    const getChipClass = () => {
      let baseClass = "inline-flex items-center justify-center transition-colors";

      // Size classes
      if (size === "small") {
        baseClass += " gap-2.5 px-3 py-1.5";
      } else {
        baseClass += " gap-2.5 px-4 py-2";
      }

      // Variant classes
      if (variant === "pill") {
        baseClass += " rounded-[999px] border border-solid";
        if (selected) {
          baseClass += " border-primary bg-primary";
        } else {
          baseClass += " border-border";
        }
      } else if (variant === "outlined") {
        baseClass += " rounded-lg border";
        if (selected) {
          baseClass += " bg-primary text-on-primary border-primary";
        } else {
          baseClass += " bg-surface border-border-default text-on-surface hover:bg-surface-2";
        }
      } else {
        // default variant - uses CSS classes
        baseClass = `chip ${selected ? "chip-selected" : ""}`;
      }

      return baseClass;
    };

    const getTextClass = () => {
      if (variant === "pill") {
        return `relative flex items-center justify-center w-fit body-3 font-[number:var(--body-3-font-weight)] ${selected ? "text-on-primary" : "text-on-surface-subtle"
          } text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] whitespace-nowrap [font-style:var(--body-3-font-style)]`;
      } else if (variant === "outlined") {
        return `relative w-fit mt-[-1.00px] body-2 font-[number:var(--body-2-font-weight)] text-[length:var(--body-2-font-size)] tracking-[var(--body-2-letter-spacing)] leading-[var(--body-2-line-height)] whitespace-nowrap [font-style:var(--body-2-font-style)]`;
      }
      return "";
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={`${getChipClass()} ${className}`}
        aria-pressed={selected}
        {...props}
      >
        {variant === "default" ? (
          label
        ) : (
          <span className={getTextClass()}>
            {label}
          </span>
        )}
      </button>
    );
  }
);

Chip.displayName = "Chip";
