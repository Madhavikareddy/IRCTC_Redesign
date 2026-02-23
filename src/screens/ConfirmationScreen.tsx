"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download, Share2, Train, Copy, Sparkles } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { useState } from "react";

interface ConfirmationScreenProps {
  onNewBooking: () => void;
}

export default function ConfirmationScreen({ onNewBooking }: ConfirmationScreenProps) {
  const { state } = useBooking();
  const [copied, setCopied] = useState(false);

  function copyPNR() {
    navigator.clipboard?.writeText(state.pnr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const total = ((state.selectedClass?.fare ?? 0) * state.passengers.length) + 35 + Math.round((state.selectedClass?.fare ?? 0) * state.passengers.length * 0.05);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-dvh flex flex-col pb-8"
    >
      {/* Success gradient header */}
      <div className="relative overflow-hidden px-5 pt-14 pb-12 text-center" style={{ background: "linear-gradient(135deg, #059669 0%, #10B981 40%, #06B6D4 100%)" }}>
        {/* Decorative */}
        <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-20px] left-[-20px] w-[80px] h-[80px] rounded-full bg-white/5" />

        {/* Celebration particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2, background: i % 2 === 0 ? "rgba(255,255,255,0.3)" : "rgba(251,191,36,0.4)" }}
            initial={{ x: 180 + (i % 4) * 25 - 50, y: 70, scale: 0, opacity: 0 }}
            animate={{
              y: [70, -10 - i * 12],
              x: [180 + (i % 4) * 25 - 50, 180 + (i - 4) * 35],
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 2, delay: 0.3 + i * 0.12, ease: "easeOut" }}
          />
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-18 h-18 rounded-full bg-white/20 backdrop-blur-sm mb-4 border border-white/10"
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-2xl font-extrabold text-white mb-1">
          Booking Confirmed!
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-sm text-white/70">
          Your ticket has been booked successfully
        </motion.p>
      </div>

      <div className="flex-1 page-padding -mt-6 space-y-4 relative z-10">
        {/* PNR card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-5 text-center border border-border-light"
          style={{ boxShadow: "0 4px 20px rgba(16,185,129,0.1)" }}
        >
          <p className="text-xs text-text-tertiary font-bold uppercase tracking-widest mb-2">PNR Number</p>
          <div className="flex items-center justify-center gap-3">
            <p className="text-3xl font-extrabold tracking-wider font-mono" style={{ color: "#4F46E5" }}>{state.pnr}</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={copyPNR}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-primary-100 hover:bg-primary-50 transition-colors"
            >
              <Copy className="w-4 h-4 text-primary" />
            </motion.button>
          </div>
          {copied && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald font-semibold mt-1.5">Copied to clipboard!</motion.p>
          )}
          <p className="text-xs text-text-tertiary mt-2">Save this PNR for tracking and reference</p>
        </motion.div>

        {/* Ticket details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl overflow-hidden border border-border-light"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #4F46E5, #06B6D4)" }} />
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>
                <Train className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-text-primary">Ticket Details</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-xs text-text-tertiary font-medium">Train</span>
                <span className="text-sm font-bold text-text-primary">{state.selectedTrain?.name} <span className="text-primary text-xs font-mono">({state.selectedTrain?.number})</span></span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-text-tertiary font-medium">Route</span>
                <span className="text-sm font-semibold text-text-primary">{state.selectedTrain?.departureStation} → {state.selectedTrain?.arrivalStation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-text-tertiary font-medium">Date & Time</span>
                <span className="text-sm font-semibold text-primary">{state.date} · {state.selectedTrain?.departureTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-text-tertiary font-medium">Class</span>
                <span className="text-sm font-semibold text-primary bg-primary-50 px-2 py-0.5 rounded-md">{state.selectedClass?.name}</span>
              </div>

              <div className="border-t border-dashed border-border pt-2.5 mt-2.5">
                {state.passengers.map((p, i) => (
                  <div key={p.id} className="flex justify-between py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xs font-bold text-white w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>{i + 1}</span>
                      <span className="text-xs font-semibold text-text-primary">{p.name}</span>
                    </div>
                    <span className="text-xs text-text-tertiary">{p.age}yrs · {p.gender}</span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-border pt-3 mt-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-text-primary">Amount Paid</span>
                  <span className="text-xl font-extrabold" style={{ color: "#4F46E5" }}>₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="grid grid-cols-2 gap-3">
          <button className="btn-secondary flex items-center justify-center gap-2 py-3 rounded-2xl">
            <Download className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">Download</span>
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2 py-3 rounded-2xl">
            <Share2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">Share</span>
          </button>
        </motion.div>

        {/* New booking */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <button onClick={onNewBooking} className="btn-primary mt-2 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Book Another Ticket
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
