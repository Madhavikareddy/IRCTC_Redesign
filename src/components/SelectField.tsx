"use client";

import { motion } from "framer-motion";
import { useState, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
  helperText?: string;
}

export default function SelectField({
  label,
  options,
  error,
  helperText,
  className = "",
  ...props
}: SelectFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      <label className="label-base">{label}</label>
      <motion.div
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ duration: 0.15 }}
        className="relative"
      >
        <select
          className={`input-base appearance-none pr-10 ${error ? "input-error" : ""} ${className}`}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-error mt-1.5 ml-0.5"
        >
          {error}
        </motion.p>
      )}
      {helperText && !error && (
        <p className="text-xs text-text-tertiary mt-1.5 ml-0.5">{helperText}</p>
      )}
    </div>
  );
}
