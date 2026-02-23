"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Clock, ChevronDown, ArrowRight, Train } from "lucide-react";
import { TrainResult, ClassInfo } from "@/context/BookingContext";

interface TrainCardProps {
  train: TrainResult;
  onSelectClass: (train: TrainResult, cls: ClassInfo) => void;
}

function AvailabilityChip({ cls }: { cls: ClassInfo }) {
  if (cls.availability === "available") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-2xs font-bold bg-emerald-light text-emerald-dark border border-emerald/20">
        ✓ AVL {cls.availableSeats}
      </span>
    );
  }
  if (cls.availability === "waitlist") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-2xs font-bold bg-amber-light text-amber-dark border border-amber/20">
        WL {cls.waitlistNumber}
      </span>
    );
  }
  if (cls.availability === "rac") {
    return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-2xs font-bold bg-amber-light text-amber-dark border border-amber/20">RAC</span>;
  }
  return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-2xs font-bold bg-rose-light text-rose-dark border border-rose/20">N/A</span>;
}

export default function TrainCard({ train, onSelectClass }: TrainCardProps) {
  const [expanded, setExpanded] = useState(false);

  const lowestFare = Math.min(...train.classes.map((c) => c.fare));

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl overflow-hidden border border-border-light"
      style={{ boxShadow: expanded ? "0 8px 30px rgba(79,70,229,0.1)" : "0 1px 3px rgba(0,0,0,0.04)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="w-full text-left p-4"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Train name & number badge */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>
            <Train className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-bold text-text-primary truncate block">{train.name}</span>
            <span className="text-2xs font-mono font-semibold text-primary bg-primary-50 px-1.5 py-0.5 rounded">{train.number}</span>
          </div>
        </div>

        {/* Time route */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1">
            <p className="text-xl font-extrabold text-text-primary">{train.departureTime}</p>
            <p className="text-xs text-text-tertiary font-medium mt-0.5">{train.departureStation}</p>
          </div>

          <div className="flex flex-col items-center flex-1 px-2">
            <div className="flex items-center gap-1 mb-1.5">
              <Clock className="w-3 h-3 text-accent" />
              <span className="text-2xs font-bold text-accent">{train.duration}</span>
            </div>
            <div className="w-full h-[2px] rounded-full relative" style={{ background: "linear-gradient(90deg, #4F46E5, #06B6D4)" }}>
              <div className="absolute -right-0.5 -top-[3px] w-2 h-2 rounded-full bg-accent" />
              <div className="absolute -left-0.5 -top-[3px] w-2 h-2 rounded-full bg-primary" />
            </div>
          </div>

          <div className="flex-1 text-right">
            <p className="text-xl font-extrabold text-text-primary">{train.arrivalTime}</p>
            <p className="text-xs text-text-tertiary font-medium mt-0.5">{train.arrivalStation}</p>
          </div>
        </div>

        {/* Bottom: chips + price */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-light">
          <div className="flex items-center gap-1.5 flex-wrap">
            {train.classes.map((cls) => (
              <AvailabilityChip key={cls.code} cls={cls} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-xs text-text-tertiary">from</span>
              <span className="text-base font-extrabold ml-1" style={{ color: "#4F46E5" }}>₹{lowestFare}</span>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center"
            >
              <ChevronDown className="w-3.5 h-3.5 text-primary" />
            </motion.div>
          </div>
        </div>
      </button>

      {/* Expanded class selection */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-1">Select Class</p>
              {train.classes.map((cls) => (
                <motion.button
                  key={cls.code}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition-all ${
                    cls.availability === "unavailable"
                      ? "bg-surface opacity-40 cursor-not-allowed border-transparent"
                      : "bg-white hover:border-primary hover:bg-primary-50 border-border-light active:bg-primary-100"
                  }`}
                  disabled={cls.availability === "unavailable"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectClass(train, cls);
                  }}
                >
                  <div>
                    <p className="text-sm font-bold text-text-primary">{cls.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <AvailabilityChip cls={cls} />
                      {cls.availability === "waitlist" && (
                        <span className="text-2xs text-amber-dark font-medium">Moderate chance</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-extrabold" style={{ color: "#4F46E5" }}>₹{cls.fare}</p>
                    <p className="text-2xs text-text-tertiary font-medium">/person</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
