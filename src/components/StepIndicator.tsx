"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  label: string;
  shortLabel?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between px-1">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{ scale: isCurrent ? 1.05 : 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: isCompleted
                    ? "linear-gradient(135deg, #10B981, #06B6D4)"
                    : isCurrent
                    ? "linear-gradient(135deg, #4F46E5, #7C3AED)"
                    : "#E2E8F0",
                  boxShadow: isCurrent
                    ? "0 2px 8px rgba(79,70,229,0.3)"
                    : isCompleted
                    ? "0 2px 8px rgba(16,185,129,0.2)"
                    : "none",
                }}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                ) : (
                  <span className={`text-xs font-bold ${isCurrent ? "text-white" : "text-text-tertiary"}`}>
                    {index + 1}
                  </span>
                )}
              </motion.div>
              <span
                className={`text-2xs mt-1.5 font-semibold text-center leading-tight ${
                  isCurrent ? "text-primary" : isCompleted ? "text-emerald" : "text-text-tertiary"
                }`}
              >
                {step.shortLabel || step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 mx-1 mt-[-14px]">
                <div className="h-[3px] bg-border-light rounded-full overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #10B981, #06B6D4)" }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
