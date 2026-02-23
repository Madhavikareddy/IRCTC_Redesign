"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  CreditCard,
  Building2,
  Wallet,
  Shield,
  Lock,
  Loader2,
  Sparkles,
} from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import { useBooking } from "@/context/BookingContext";

const STEPS = [
  { label: "Search", shortLabel: "Search" },
  { label: "Select", shortLabel: "Select" },
  { label: "Passengers", shortLabel: "Pax" },
  { label: "Review", shortLabel: "Review" },
  { label: "Payment", shortLabel: "Pay" },
];

const paymentMethods = [
  { id: "upi", name: "UPI", description: "Google Pay, PhonePe, Paytm", icon: Smartphone, popular: true, gradient: "linear-gradient(135deg, #4F46E5, #7C3AED)" },
  { id: "card", name: "Credit / Debit Card", description: "Visa, Mastercard, RuPay", icon: CreditCard, popular: false, gradient: "linear-gradient(135deg, #06B6D4, #3B82F6)" },
  { id: "netbanking", name: "Net Banking", description: "All major banks supported", icon: Building2, popular: false, gradient: "linear-gradient(135deg, #10B981, #06B6D4)" },
  { id: "wallet", name: "Wallet", description: "IRCTC eWallet, Paytm", icon: Wallet, popular: false, gradient: "linear-gradient(135deg, #F97316, #F43F5E)" },
];

interface PaymentScreenProps {
  onBack: () => void;
  onNext: () => void;
  onPaymentFail: () => void;
}

export default function PaymentScreen({ onBack, onNext, onPaymentFail }: PaymentScreenProps) {
  const { state, dispatch } = useBooking();
  const [selected, setSelected] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const baseFare = (state.selectedClass?.fare ?? 0) * state.passengers.length;
  const convenienceFee = 35;
  const gst = Math.round(baseFare * 0.05);
  const total = baseFare + convenienceFee + gst;

  function handlePay() {
    if (!selected) {
      setError("Please select a payment method");
      return;
    }
    setError("");
    setProcessing(true);
    dispatch({ type: "SET_PAYMENT_METHOD", payload: selected });
    dispatch({ type: "SET_BOOKING_STATUS", payload: "payment" });

    setTimeout(() => {
      const success = Math.random() > 0.15;
      if (success) {
        const pnr = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        dispatch({ type: "SET_PNR", payload: pnr });
        dispatch({ type: "SET_BOOKING_STATUS", payload: "confirmed" });
        setProcessing(false);
        onNext();
      } else {
        dispatch({ type: "SET_BOOKING_STATUS", payload: "failed" });
        setProcessing(false);
        onPaymentFail();
      }
    }, 2500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="min-h-dvh flex flex-col pb-28"
    >
      {/* Processing overlay */}
      {processing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 mx-6 text-center max-w-[320px] w-full"
            style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-5"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>
                <Loader2 className="w-7 h-7 text-white" />
              </div>
            </motion.div>
            <h3 className="text-lg font-bold text-text-primary mb-1">Processing Payment</h3>
            <p className="text-sm text-text-secondary">Please do not close this window</p>
            <div className="flex items-center justify-center gap-1.5 mt-5 py-2 px-4 bg-emerald-light rounded-full mx-auto w-fit">
              <Lock className="w-3 h-3 text-emerald-dark" />
              <span className="text-2xs text-emerald-dark font-semibold">256-bit encrypted</span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <div className="screen-header space-y-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-primary-50 active:bg-primary-100 transition-colors" disabled={processing}>
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
          <h1 className="text-base font-bold text-text-primary">Payment</h1>
        </div>
        <StepIndicator steps={STEPS} currentStep={4} />
      </div>

      <div className="flex-1 page-padding mt-4 space-y-4">
        {/* Amount summary - gradient card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1E1B4B, #4F46E5, #7C3AED)" }}
        >
          <div className="absolute top-[-20px] right-[-20px] w-[80px] h-[80px] rounded-full bg-white/5" />
          <div className="absolute bottom-[-10px] left-[-10px] w-[50px] h-[50px] rounded-full bg-white/5" />
          <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-1">Amount to Pay</p>
          <p className="text-3xl font-extrabold text-white">₹{total}</p>
          <p className="text-xs text-white/50 mt-1">{state.passengers.length} passenger{state.passengers.length > 1 ? "s" : ""} · {state.selectedClass?.name}</p>
        </motion.div>

        {/* Payment methods */}
        <div>
          <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-3">Select Payment Method</h2>
          <div className="space-y-2.5">
            {paymentMethods.map((method, i) => {
              const Icon = method.icon;
              const isSelected = selected === method.id;
              return (
                <motion.button
                  key={method.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelected(method.id); setError(""); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected ? "border-primary bg-primary-50" : "border-border-light bg-white hover:border-primary/30"
                  }`}
                  style={isSelected ? { boxShadow: "0 4px 14px rgba(79,70,229,0.12)" } : {}}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ background: isSelected ? method.gradient : "#E2E8F0" }}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-text-secondary"}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-text-primary">{method.name}</span>
                      {method.popular && (
                        <span className="text-2xs font-bold text-white px-2 py-0.5 rounded-full" style={{ background: "linear-gradient(135deg, #F97316, #F43F5E)" }}>Popular</span>
                      )}
                    </div>
                    <p className="text-xs text-text-tertiary mt-0.5">{method.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-primary" : "border-border"}`}>
                    {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 rounded-full" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }} />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-error text-center font-medium">{error}</motion.p>
        )}

        {/* Trust section */}
        <div className="flex flex-col items-center gap-2.5 py-3">
          <div className="flex items-center gap-2 py-1.5 px-4 bg-emerald-light rounded-full">
            <Shield className="w-3.5 h-3.5 text-emerald-dark" />
            <span className="text-xs font-semibold text-emerald-dark">Secure Payment Gateway</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-text-tertiary" />
            <span className="text-2xs text-text-tertiary">Your payment information is encrypted</span>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky-bottom">
        <motion.button whileTap={{ scale: 0.97 }} className="btn-primary flex items-center justify-center gap-2" onClick={handlePay} disabled={processing}>
          <Sparkles className="w-4 h-4" />
          {processing ? "Processing..." : `Pay ₹${total}`}
        </motion.button>
      </div>
    </motion.div>
  );
}
