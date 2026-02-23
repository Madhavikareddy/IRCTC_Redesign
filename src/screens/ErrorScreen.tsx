"use client";

import { motion } from "framer-motion";
import { XCircle, AlertTriangle, Clock, RefreshCw, Home } from "lucide-react";

type ErrorType = "payment-failed" | "session-timeout" | "no-trains" | "waitlist-heavy";

interface ErrorScreenProps {
  type: ErrorType;
  onRetry: () => void;
  onGoHome: () => void;
}

const errorConfig: Record<ErrorType, {
  icon: typeof XCircle;
  gradient: string;
  title: string;
  message: string;
  retryLabel: string;
}> = {
  "payment-failed": {
    icon: XCircle,
    gradient: "linear-gradient(135deg, #EF4444, #F43F5E)",
    title: "Payment Failed",
    message: "Your payment could not be processed. No amount has been deducted from your account. Please try again or use a different payment method.",
    retryLabel: "Retry Payment",
  },
  "session-timeout": {
    icon: Clock,
    gradient: "linear-gradient(135deg, #F59E0B, #F97316)",
    title: "Session Expired",
    message: "Your booking session has timed out for security reasons. Please start a new search to continue booking.",
    retryLabel: "Start New Search",
  },
  "no-trains": {
    icon: AlertTriangle,
    gradient: "linear-gradient(135deg, #F59E0B, #F97316)",
    title: "No Trains Available",
    message: "No trains found for your selected route and date. Try adjusting your search with different dates or nearby stations.",
    retryLabel: "Modify Search",
  },
  "waitlist-heavy": {
    icon: AlertTriangle,
    gradient: "linear-gradient(135deg, #F59E0B, #F97316)",
    title: "Heavy Waitlist",
    message: "All classes on this train have a long waitlist. Chances of confirmation are low. We recommend choosing an alternate train or date.",
    retryLabel: "View Other Trains",
  },
};

export default function ErrorScreen({ type, onRetry, onGoHome }: ErrorScreenProps) {
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-dvh flex flex-col items-center justify-center px-8 text-center"
      style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)" }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 18 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: config.gradient, boxShadow: `0 8px 24px ${type === "payment-failed" ? "rgba(239,68,68,0.25)" : "rgba(245,158,11,0.25)"}` }}
      >
        <Icon className="w-9 h-9 text-white" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-2xl font-extrabold text-text-primary mb-2"
      >
        {config.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-sm text-text-secondary leading-relaxed max-w-[300px] mb-8"
      >
        {config.message}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="w-full max-w-[300px] space-y-3"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {config.retryLabel}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onGoHome}
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </motion.button>
      </motion.div>

      {type === "payment-failed" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 py-2 px-4 bg-emerald-light rounded-full"
        >
          <p className="text-xs text-emerald-dark font-medium">
            If any amount was deducted, it will be refunded within 5-7 business days
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
