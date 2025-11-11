"use client";

import React from "react";

export interface FieldLabelProps {
  /** Label text */
  label: string;
  /** Whether field is required */
  required?: boolean;
  /** Helptext to show below field */
  helptext?: string;
  /** Whether to show helptext */
  showHelptext?: boolean;
  /** Field type */
  fieldType?: "input" | "textarea";
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Additional className for container */
  className?: string;
  /** Field props */
  fieldProps?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** Error message to display */
  error?: string;
}

export const FieldLabel = React.forwardRef<HTMLDivElement, FieldLabelProps>(
  (
    {
      label,
      required = false,
      helptext,
      showHelptext = true,
      fieldType = "input",
      placeholder = "",
      value,
      onChange,
      className = "",
      fieldProps,
      error,
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <div ref={ref} className={`field-label ${className}`}>
        {/* Label */}
        <div className="field-label-text">
          <span>{label}</span>
          {required && <span className="field-required">*</span>}
        </div>

        {/* Field */}
        {fieldType === "textarea" ? (
          <textarea
            className={`field field-textbox ${hasError ? "field-error" : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...(fieldProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            type="text"
            className={`field ${hasError ? "field-error" : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...(fieldProps as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {/* Error Message */}
        {hasError && (
          <div className="field-error-text">{error}</div>
        )}

        {/* Helptext */}
        {showHelptext && helptext && !hasError && (
          <div className="field-helptext">{helptext}</div>
        )}
      </div>
    );
  }
);

FieldLabel.displayName = "FieldLabel";
