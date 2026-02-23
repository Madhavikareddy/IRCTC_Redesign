"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, CalendarDays, ArrowUpDown, Train, Sparkles, Clock, Shield, Zap } from "lucide-react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import { useBooking } from "@/context/BookingContext";
import { classOptions, quotaOptions, popularStations } from "@/data/mock";

export default function SearchScreen({ onNext }: { onNext: () => void }) {
  const { state, dispatch } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fromSuggestions, setFromSuggestions] = useState(false);
  const [toSuggestions, setToSuggestions] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!state.fromStation) newErrors.from = "Please select a departure station";
    if (!state.toStation) newErrors.to = "Please select an arrival station";
    if (!state.date) newErrors.date = "Please select a travel date";
    if (state.fromStation && state.toStation && state.fromStation === state.toStation) {
      newErrors.to = "Arrival station must be different from departure";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSearch() {
    if (validate()) {
      onNext();
    }
  }

  function swapStations() {
    const from = state.fromStation;
    const to = state.toStation;
    dispatch({ type: "SET_SEARCH", payload: { fromStation: to, toStation: from } });
  }

  const filteredFromStations = popularStations.filter((s) =>
    s.name.toLowerCase().includes(state.fromStation.toLowerCase()) ||
    s.code.toLowerCase().includes(state.fromStation.toLowerCase())
  );

  const filteredToStations = popularStations.filter((s) =>
    s.name.toLowerCase().includes(state.toStation.toLowerCase()) ||
    s.code.toLowerCase().includes(state.toStation.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-dvh flex flex-col pb-28"
    >
      {/* Gradient Hero Header */}
      <div className="relative overflow-hidden px-5 pt-14 pb-20" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #4F46E5 50%, #7C3AED 100%)" }}>
        {/* Decorative circles */}
        <div className="absolute top-[-40px] right-[-40px] w-[160px] h-[160px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-20px] left-[-30px] w-[100px] h-[100px] rounded-full bg-white/5" />
        <div className="absolute top-[30px] right-[60px] w-[8px] h-[8px] rounded-full bg-cyan-400/40" />
        <div className="absolute top-[70px] right-[30px] w-[5px] h-[5px] rounded-full bg-amber-400/40" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
              <Train className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">IRCTC</h1>
              <p className="text-xs text-white/50 font-medium">Indian Railways</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Book Your Journey</h2>
          <p className="text-sm text-white/60">Fast, secure & hassle-free train booking</p>
        </motion.div>
      </div>

      {/* Search Form Card — overlaps the hero */}
      <div className="flex-1 px-4 -mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white rounded-3xl p-5 space-y-4 border border-border-light"
          style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-text-primary">Search Trains</span>
          </div>

          {/* From / To with swap */}
          <div className="relative space-y-3">
            <div className="relative">
              <InputField
                label="From"
                placeholder="Enter departure station"
                value={state.fromStation}
                onChange={(e) => {
                  dispatch({ type: "SET_SEARCH", payload: { fromStation: (e.target as HTMLInputElement).value } });
                  setFromSuggestions(true);
                }}
                onFocus={() => setFromSuggestions(true)}
                onBlur={() => setTimeout(() => setFromSuggestions(false), 200)}
                error={errors.from}
                icon={<MapPin className="w-4 h-4 text-primary" />}
              />
              {fromSuggestions && state.fromStation && filteredFromStations.length > 0 && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-2xl border border-border-light max-h-44 overflow-y-auto" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}>
                  {filteredFromStations.slice(0, 5).map((s) => (
                    <button
                      key={s.code}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-primary-50 active:bg-primary-100 transition-colors flex items-center justify-between first:rounded-t-2xl last:rounded-b-2xl"
                      onMouseDown={() => {
                        dispatch({ type: "SET_SEARCH", payload: { fromStation: `${s.name} (${s.code})` } });
                        setFromSuggestions(false);
                      }}
                    >
                      <span className="text-text-primary font-medium">{s.name}</span>
                      <span className="text-xs text-primary font-mono font-bold bg-primary-50 px-2 py-0.5 rounded-md">{s.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Swap button */}
            <motion.button
              whileTap={{ scale: 0.85, rotate: 180 }}
              onClick={swapStations}
              className="absolute right-4 top-[66px] z-10 w-9 h-9 rounded-xl flex items-center justify-center shadow-card-colored border-2 border-white"
              style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}
            >
              <ArrowUpDown className="w-4 h-4 text-white" />
            </motion.button>

            <div className="relative">
              <InputField
                label="To"
                placeholder="Enter arrival station"
                value={state.toStation}
                onChange={(e) => {
                  dispatch({ type: "SET_SEARCH", payload: { toStation: (e.target as HTMLInputElement).value } });
                  setToSuggestions(true);
                }}
                onFocus={() => setToSuggestions(true)}
                onBlur={() => setTimeout(() => setToSuggestions(false), 200)}
                error={errors.to}
                icon={<MapPin className="w-4 h-4 text-rose" />}
              />
              {toSuggestions && state.toStation && filteredToStations.length > 0 && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-2xl border border-border-light max-h-44 overflow-y-auto" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}>
                  {filteredToStations.slice(0, 5).map((s) => (
                    <button
                      key={s.code}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-primary-50 active:bg-primary-100 transition-colors flex items-center justify-between first:rounded-t-2xl last:rounded-b-2xl"
                      onMouseDown={() => {
                        dispatch({ type: "SET_SEARCH", payload: { toStation: `${s.name} (${s.code})` } });
                        setToSuggestions(false);
                      }}
                    >
                      <span className="text-text-primary font-medium">{s.name}</span>
                      <span className="text-xs text-primary font-mono font-bold bg-primary-50 px-2 py-0.5 rounded-md">{s.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date */}
          <InputField
            label="Journey Date"
            type="date"
            value={state.date}
            min={today}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH", payload: { date: (e.target as HTMLInputElement).value } })
            }
            error={errors.date}
            icon={<CalendarDays className="w-4 h-4 text-accent" />}
          />

          {/* Class & Quota */}
          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Class"
              options={classOptions.map((c) => ({ value: c.code, label: c.name }))}
              value={state.travelClass}
              onChange={(e) =>
                dispatch({ type: "SET_SEARCH", payload: { travelClass: (e.target as HTMLSelectElement).value } })
              }
            />
            <SelectField
              label="Quota"
              options={quotaOptions.map((q) => ({ value: q.code, label: q.name }))}
              value={state.quota}
              onChange={(e) =>
                dispatch({ type: "SET_SEARCH", payload: { quota: (e.target as HTMLSelectElement).value } })
              }
            />
          </div>

          {/* Search Button inside card */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn-primary flex items-center justify-center gap-2 mt-2"
            onClick={handleSearch}
          >
            <Sparkles className="w-4 h-4" />
            Search Trains
          </motion.button>
        </motion.div>

        {/* Quick info cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 grid grid-cols-3 gap-2.5"
        >
          <div className="bg-white rounded-2xl p-3 text-center border border-border-light">
            <div className="w-9 h-9 rounded-xl bg-accent-light flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-accent" />
            </div>
            <p className="text-2xs font-semibold text-text-primary">Tatkal</p>
            <p className="text-2xs text-text-tertiary">10AM AC</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center border border-border-light">
            <div className="w-9 h-9 rounded-xl bg-emerald-light flex items-center justify-center mx-auto mb-2">
              <Shield className="w-4 h-4 text-emerald" />
            </div>
            <p className="text-2xs font-semibold text-text-primary">Secure</p>
            <p className="text-2xs text-text-tertiary">Encrypted</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center border border-border-light">
            <div className="w-9 h-9 rounded-xl bg-amber-light flex items-center justify-center mx-auto mb-2">
              <Zap className="w-4 h-4 text-amber" />
            </div>
            <p className="text-2xs font-semibold text-text-primary">120 Days</p>
            <p className="text-2xs text-text-tertiary">Advance</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
