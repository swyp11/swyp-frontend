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
    },
    ref
  ) => {
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
            className="field field-textbox"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...(fieldProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            type="text"
            className="field"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...(fieldProps as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {/* Helptext */}
        {showHelptext && helptext && (
          <div className="field-helptext">{helptext}</div>
        )}
      </div>
    );
  }
);

FieldLabel.displayName = "FieldLabel";
