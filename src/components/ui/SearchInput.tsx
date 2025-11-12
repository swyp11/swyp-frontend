"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

export interface SearchInputProps {
  /** Current search value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Search handler (when Enter is pressed or search icon clicked) */
  onSearch?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Additional className */
  className?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onSearch, placeholder = "검색어를 입력해보세요.", className = "", ariaLabel }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch();
      }
    };

    const handleClear = () => {
      onChange('');
    };

    return (
      <div className={`flex w-full h-12 items-center gap-2.5 px-3 py-2 relative bg-white rounded-lg overflow-hidden border border-solid border-color-border-default-default ${className}`}>
        <button
          type="button"
          onClick={onSearch}
          className="relative w-6 h-6 cursor-pointer flex items-center justify-center"
          aria-label="검색"
        >
          <Image
            className="relative w-6 h-6"
            alt="Search"
            src={getAssetPath("/img/search.svg")}
            width={24}
            height={24}
          />
        </button>

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="body-2 font-[number:var(--body-2-font-weight)] text-on-surface text-[length:var(--body-2-font-size)] leading-[var(--body-2-line-height)] relative flex items-center justify-center w-full tracking-[var(--body-2-letter-spacing)] [font-style:var(--body-2-font-style)] placeholder:text-on-surface-subtlest bg-transparent border-none outline-none"
          aria-label={ariaLabel || placeholder}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="relative w-6 h-6 cursor-pointer flex items-center justify-center"
            aria-label="지우기"
          >
            <Image
              className="relative w-6 h-6"
              alt="Clear"
              src={getAssetPath("/img/close.svg")}
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";