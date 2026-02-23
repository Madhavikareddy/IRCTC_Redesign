"use client";

import { motion } from "framer-motion";
import { useState, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export default function InputField({
  label,
  error,
  helperText,
  icon,
  className = "",
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      <label className="label-base">{label}</label>
      <motion.div
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="relative"
      >
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary">
            {icon}
          </div>
        )}
        <input
          className={`input-base ${icon ? "pl-11" : ""} ${error ? "input-error" : ""} ${className}`}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
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
