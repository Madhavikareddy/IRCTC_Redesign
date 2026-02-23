"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ChevronDown, Shield, Users, Train, MapPin, Phone, Mail, Receipt } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import { useBooking } from "@/context/BookingContext";

const STEPS = [
  { label: "Search", shortLabel: "Search" },
  { label: "Select", shortLabel: "Select" },
  { label: "Passengers", shortLabel: "Pax" },
  { label: "Review", shortLabel: "Review" },
  { label: "Payment", shortLabel: "Pay" },
];

interface ReviewScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export default function ReviewScreen({ onBack, onNext }: ReviewScreenProps) {
  const { state } = useBooking();
  const [fareExpanded, setFareExpanded] = useState(true);

  const baseFare = (state.selectedClass?.fare ?? 0) * state.passengers.length;
  const convenienceFee = 35;
  const gst = Math.round(baseFare * 0.05);
  const total = baseFare + convenienceFee + gst;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="min-h-dvh flex flex-col pb-32"
    >
      {/* Header */}
      <div className="screen-header space-y-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-primary-50 active:bg-primary-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
          <h1 className="text-base font-bold text-text-primary">Review Booking</h1>
        </div>
        <StepIndicator steps={STEPS} currentStep={3} />
      </div>

      <div className="flex-1 page-padding mt-4 space-y-3">
        {/* Journey card with gradient accent */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl overflow-hidden border border-border-light"
          style={{ boxShadow: "0 2px 12px rgba(79,70,229,0.06)" }}
        >
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #4F46E5, #06B6D4)" }} />
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>
                <Train className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-text-primary">Journey Details</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-tertiary font-medium">Train</span>
                <span className="text-sm font-bold text-text-primary">{state.selectedTrain?.name} <span className="text-primary font-mono text-xs">({state.selectedTrain?.number})</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-tertiary font-medium">Route</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-text-primary">{state.selectedTrain?.departureStation}</span>
                  <MapPin className="w-3 h-3 text-accent" />
                  <span className="text-sm font-semibold text-text-primary">{state.selectedTrain?.arrivalStation}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-tertiary font-medium">Departure</span>
                <span className="text-sm font-semibold text-text-primary">{state.selectedTrain?.departureTime} · <span className="text-primary">{state.date}</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-tertiary font-medium">Class</span>
                <span className="text-sm font-semibold text-primary bg-primary-50 px-2 py-0.5 rounded-md">{state.selectedClass?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-tertiary font-medium">Duration</span>
                <span className="text-sm font-semibold text-accent">{state.selectedTrain?.duration}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Passengers card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 border border-border-light"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-light flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-emerald-dark" />
            </div>
            <span className="text-sm font-bold text-text-primary">Passengers ({state.passengers.length})</span>
          </div>
          <div className="space-y-0">
            {state.passengers.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-border-light last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{p.name || "—"}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">
                    {p.age ? `${p.age} yrs` : "—"} · {p.gender || "—"} · {p.berthPreference !== "no-preference" ? p.berthPreference : "No pref."}
                  </p>
                </div>
                <span className="text-xs font-bold text-white w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>{i + 1}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 border border-border-light"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <p className="text-sm font-bold text-text-primary mb-2.5">Contact</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span className="text-sm text-text-secondary font-medium">{state.contactPhone || "—"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm text-text-secondary font-medium">{state.contactEmail || "—"}</span>
            </div>
          </div>
        </motion.div>

        {/* Fare breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-border-light overflow-hidden"
          style={{ boxShadow: "0 2px 12px rgba(79,70,229,0.06)" }}
        >
          <button
            className="w-full flex items-center justify-between p-4"
            onClick={() => setFareExpanded(!fareExpanded)}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-light flex items-center justify-center">
                <Receipt className="w-3.5 h-3.5 text-amber-dark" />
              </div>
              <span className="text-sm font-bold text-text-primary">Fare Breakdown</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold" style={{ color: "#4F46E5" }}>₹{total}</span>
              <motion.div animate={{ rotate: fareExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center">
                <ChevronDown className="w-3.5 h-3.5 text-primary" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {fareExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Base fare (₹{state.selectedClass?.fare} × {state.passengers.length})</span>
                    <span className="text-sm font-semibold text-text-primary">₹{baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Convenience fee</span>
                    <span className="text-sm font-semibold text-text-primary">₹{convenienceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">GST (5%)</span>
                    <span className="text-sm font-semibold text-text-primary">₹{gst}</span>
                  </div>
                  <div className="flex justify-between pt-2.5 border-t-2 border-dashed border-border">
                    <span className="text-sm font-bold text-text-primary">Total Amount</span>
                    <span className="text-lg font-extrabold" style={{ color: "#4F46E5" }}>₹{total}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-2 py-2">
          <Shield className="w-3.5 h-3.5 text-emerald" />
          <span className="text-xs text-text-tertiary font-medium">Prices are inclusive of all applicable taxes</span>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky-bottom">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-secondary font-medium">Total Payable</span>
          <span className="text-xl font-extrabold" style={{ color: "#4F46E5" }}>₹{total}</span>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} className="btn-primary" onClick={onNext}>
          Proceed to Payment
        </motion.button>
      </div>
    </motion.div>
  );
}
