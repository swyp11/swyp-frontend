"use client";

import React from "react";
import { Chip } from "./Chip";

export interface OptionGroupProps {
  /** Group label */
  label: string;
  /** Available options */
  options: string[];
  /** Currently selected option */
  selectedOption?: string;
  /** Selection handler */
  onOptionSelect?: (option: string) => void;
  /** Additional className */
  className?: string;
  /** Button variant */
  variant?: "default" | "outlined" | "pill";
}

export const OptionGroup = React.forwardRef<HTMLDivElement, OptionGroupProps>(
  ({ label, options, selectedOption, onOptionSelect, className = "", variant = "default" }, ref) => {
    if (variant === "pill") {
      return (
        <div ref={ref} className={`flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto] ${className}`}>
          <div className="flex items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <span className="relative flex items-center justify-center flex-1 mt-[-1.00px] body-2-medium font-[number:var(--body-2-medium-font-weight)] text-black text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] [font-style:var(--body-2-medium-font-style)]">
              {label}
            </span>
          </div>

          <div
            className="flex items-start gap-2 relative self-stretch w-full flex-[0_0_auto]"
            role="group"
            aria-labelledby={`${label.toLowerCase().replace(/\s+/g, '-')}-label`}
          >
            {options.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={selectedOption === option}
                onClick={() => onOptionSelect?.(option)}
                variant="pill"
                className="flex-1 grow h-11"
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={`flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto] ${className}`}>
        <h3 className="relative self-stretch mt-[-1.00px] font-heading-4 font-[number:var(--heading-4-font-weight)] text-on-surface text-[length:var(--heading-4-font-size)] tracking-[var(--heading-4-letter-spacing)] leading-[var(--heading-4-line-height)] [font-style:var(--heading-4-font-style)]">
          {label}
        </h3>

        <div className="inline-flex items-start gap-2 relative flex-[0_0_auto] flex-wrap">
          {options.map((option) => (
            <Chip
              key={option}
              label={option}
              selected={selectedOption === option}
              onClick={() => onOptionSelect?.(option)}
              variant={variant}
            />
          ))}
        </div>
      </div>
    );
  }
);

OptionGroup.displayName = "OptionGroup";