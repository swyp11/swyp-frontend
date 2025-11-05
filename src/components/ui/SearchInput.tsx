"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

export interface SearchInputProps {
  /** Current search value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Additional className */
  className?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, placeholder = "검색어를 입력해보세요.", className = "", ariaLabel }, ref) => {
    return (
      <div className={`flex w-full h-12 items-center gap-2.5 px-3 py-2 relative bg-white rounded-lg overflow-hidden border border-solid border-color-border-default-default ${className}`}>
        <Image
          className="relative w-6 h-6"
          alt="Search"
          src={getAssetPath("/img/search.svg")}
          width={24}
          height={24}
        />

        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="body-2 font-[number:var(--body-2-font-weight)] text-on-surface-subtlest text-[length:var(--body-2-font-size)] leading-[var(--body-2-line-height)] relative flex items-center justify-center w-full tracking-[var(--body-2-letter-spacing)] [font-style:var(--body-2-font-style)] placeholder:text-on-surface-subtlest bg-transparent border-none outline-none"
          aria-label={ariaLabel || placeholder}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";