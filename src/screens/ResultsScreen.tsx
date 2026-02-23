"use client";

import { motion } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, AlertTriangle, MapPin, Calendar } from "lucide-react";
import TrainCard from "@/components/TrainCard";
import { useBooking, TrainResult, ClassInfo } from "@/context/BookingContext";
import { mockTrains } from "@/data/mock";

interface ResultsScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export default function ResultsScreen({ onBack, onNext }: ResultsScreenProps) {
  const { state, dispatch } = useBooking();

  const trains = mockTrains;

  function handleSelectClass(train: TrainResult, cls: ClassInfo) {
    dispatch({ type: "SET_TRAIN", payload: train });
    dispatch({ type: "SET_CLASS", payload: cls });
    onNext();
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="min-h-dvh flex flex-col pb-6"
    >
      {/* Gradient header with route info */}
      <div className="relative overflow-hidden px-5 pt-5 pb-4" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #4F46E5 60%, #7C3AED 100%)" }}>
        <div className="absolute top-[-20px] right-[-20px] w-[80px] h-[80px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-10px] left-[40%] w-[60px] h-[60px] rounded-full bg-white/5" />

        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white truncate">{state.fromStation}</span>
              <MapPin className="w-3 h-3 text-cyan-300 flex-shrink-0" />
              <span className="text-sm font-bold text-white truncate">{state.toStation}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <Calendar className="w-3 h-3 text-white/50" />
              <p className="text-xs text-white/60 font-medium">
                {state.date} · {state.travelClass}
              </p>
            </div>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Results count pill */}
        <div className="flex items-center justify-center">
          <span className="text-xs font-bold text-white/80 bg-white/10 px-3 py-1 rounded-full">
            {trains.length} train{trains.length !== 1 ? "s" : ""} found
          </span>
        </div>
      </div>

      {/* Train list */}
      <div className="flex-1 page-padding mt-4 space-y-3">
        {trains.length === 0 ? (
          <NoTrainsFound />
        ) : (
          trains.map((train, i) => (
            <motion.div
              key={train.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <TrainCard train={train} onSelectClass={handleSelectClass} />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function NoTrainsFound() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #F59E0B, #F97316)", boxShadow: "0 6px 20px rgba(245,158,11,0.25)" }}>
        <AlertTriangle className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-lg font-extrabold text-text-primary mb-1">No Trains Found</h3>
      <p className="text-sm text-text-secondary leading-relaxed max-w-[260px]">
        No trains are available for this route and date. Try a different date or check nearby stations.
      </p>
    </motion.div>
  );
}
