"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash2, Info, User, Train } from "lucide-react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import StepIndicator from "@/components/StepIndicator";
import { useBooking, Passenger } from "@/context/BookingContext";

const STEPS = [
  { label: "Search", shortLabel: "Search" },
  { label: "Select", shortLabel: "Select" },
  { label: "Passengers", shortLabel: "Pax" },
  { label: "Review", shortLabel: "Review" },
  { label: "Payment", shortLabel: "Pay" },
];

interface PassengerScreenProps {
  onBack: () => void;
  onNext: () => void;
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

const emptyPassenger: Omit<Passenger, "id"> = {
  name: "",
  age: "",
  gender: "",
  berthPreference: "no-preference",
  idType: "",
  idNumber: "",
};

export default function PassengerScreen({ onBack, onNext }: PassengerScreenProps) {
  const { state, dispatch } = useBooking();
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  // Initialize with one passenger if empty
  useEffect(() => {
    if (state.passengers.length === 0) {
      dispatch({
        type: "ADD_PASSENGER",
        payload: { ...emptyPassenger, id: generateId() },
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function addPassenger() {
    if (state.passengers.length < 6) {
      dispatch({
        type: "ADD_PASSENGER",
        payload: { ...emptyPassenger, id: generateId() },
      });
    }
  }

  function removePassenger(id: string) {
    if (state.passengers.length > 1) {
      dispatch({ type: "REMOVE_PASSENGER", payload: id });
    }
  }

  function updatePassenger(id: string, data: Partial<Passenger>) {
    dispatch({ type: "UPDATE_PASSENGER", payload: { id, data } });
  }

  function validate(): boolean {
    const newErrors: Record<string, Record<string, string>> = {};
    const newContactErrors: Record<string, string> = {};
    let valid = true;

    state.passengers.forEach((p) => {
      const pErrors: Record<string, string> = {};
      if (!p.name.trim()) { pErrors.name = "Name is required"; valid = false; }
      if (!p.age || parseInt(p.age) < 1 || parseInt(p.age) > 125) { pErrors.age = "Enter valid age"; valid = false; }
      if (!p.gender) { pErrors.gender = "Select gender"; valid = false; }
      if (Object.keys(pErrors).length > 0) newErrors[p.id] = pErrors;
    });

    if (!state.contactPhone || state.contactPhone.length < 10) {
      newContactErrors.phone = "Enter a valid 10-digit mobile number";
      valid = false;
    }
    if (!state.contactEmail || !state.contactEmail.includes("@")) {
      newContactErrors.email = "Enter a valid email address";
      valid = false;
    }

    setErrors(newErrors);
    setContactErrors(newContactErrors);
    return valid;
  }

  function handleNext() {
    if (validate()) {
      onNext();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="min-h-dvh flex flex-col pb-28"
    >
      {/* Header */}
      <div className="screen-header space-y-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-primary-50 active:bg-primary-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
          <h1 className="text-base font-bold text-text-primary">Passenger Details</h1>
        </div>
        <StepIndicator steps={STEPS} currentStep={2} />
      </div>

      <div className="flex-1 page-padding mt-4 space-y-4">
        {/* Train summary */}
        <div className="rounded-2xl p-4 border border-primary-100 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>
                <Train className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">
                  {state.selectedTrain?.name} <span className="text-xs font-mono text-primary">({state.selectedTrain?.number})</span>
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {state.selectedClass?.name} · {state.date}
                </p>
              </div>
            </div>
            <p className="text-base font-extrabold" style={{ color: "#4F46E5" }}>₹{state.selectedClass?.fare}</p>
          </div>
        </div>

        {/* Passenger cards */}
        <AnimatePresence>
          {state.passengers.map((passenger, index) => (
            <motion.div
              key={passenger.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, height: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl p-4 space-y-3 border border-border-light"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-text-primary">
                    Passenger {index + 1}
                  </span>
                </div>
                {state.passengers.length > 1 && (
                  <button
                    onClick={() => removePassenger(passenger.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-error-light transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                )}
              </div>

              <InputField
                label="Full Name (as on ID)"
                placeholder="e.g. Rahul Kumar"
                value={passenger.name}
                onChange={(e) => updatePassenger(passenger.id, { name: (e.target as HTMLInputElement).value })}
                error={errors[passenger.id]?.name}
              />

              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Age"
                  type="number"
                  placeholder="e.g. 28"
                  value={passenger.age}
                  onChange={(e) => updatePassenger(passenger.id, { age: (e.target as HTMLInputElement).value })}
                  error={errors[passenger.id]?.age}
                  helperText={parseInt(passenger.age) >= 60 ? "Senior citizen benefits may apply" : undefined}
                />
                <SelectField
                  label="Gender"
                  options={[
                    { value: "", label: "Select" },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  value={passenger.gender}
                  onChange={(e) =>
                    updatePassenger(passenger.id, {
                      gender: (e.target as HTMLSelectElement).value as Passenger["gender"],
                    })
                  }
                  error={errors[passenger.id]?.gender}
                />
              </div>

              <SelectField
                label="Berth Preference"
                options={[
                  { value: "no-preference", label: "No Preference" },
                  { value: "lower", label: "Lower Berth" },
                  { value: "middle", label: "Middle Berth" },
                  { value: "upper", label: "Upper Berth" },
                  { value: "side-lower", label: "Side Lower" },
                  { value: "side-upper", label: "Side Upper" },
                ]}
                value={passenger.berthPreference}
                onChange={(e) =>
                  updatePassenger(passenger.id, {
                    berthPreference: (e.target as HTMLSelectElement).value as Passenger["berthPreference"],
                  })
                }
                helperText="Berth preference is not guaranteed"
              />

              <div className="grid grid-cols-2 gap-3">
                <SelectField
                  label="ID Proof Type"
                  options={[
                    { value: "", label: "Select (Optional)" },
                    { value: "aadhaar", label: "Aadhaar" },
                    { value: "pan", label: "PAN Card" },
                    { value: "passport", label: "Passport" },
                  ]}
                  value={passenger.idType}
                  onChange={(e) =>
                    updatePassenger(passenger.id, {
                      idType: (e.target as HTMLSelectElement).value as Passenger["idType"],
                    })
                  }
                />
                <InputField
                  label="ID Number"
                  placeholder="Optional"
                  value={passenger.idNumber}
                  onChange={(e) => updatePassenger(passenger.id, { idNumber: (e.target as HTMLInputElement).value })}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add passenger */}
        {state.passengers.length < 6 && (
          <button
            onClick={addPassenger}
            className="w-full py-3.5 rounded-2xl border-2 border-dashed border-primary-100 text-sm font-bold text-primary flex items-center justify-center gap-2 hover:bg-primary-50 transition-colors active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Add Passenger ({state.passengers.length}/6)
          </button>
        )}

        {/* Contact details */}
        <div className="bg-white rounded-2xl p-4 space-y-3 mt-4 border border-border-light" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-accent-light flex items-center justify-center">
              <Info className="w-3.5 h-3.5 text-accent-dark" />
            </div>
            <span className="text-sm font-bold text-text-primary">Contact Details</span>
          </div>
          <p className="text-xs text-text-tertiary -mt-2">
            Ticket and booking updates will be sent here
          </p>
          <InputField
            label="Mobile Number"
            type="tel"
            placeholder="10-digit mobile number"
            value={state.contactPhone}
            onChange={(e) =>
              dispatch({
                type: "SET_CONTACT",
                payload: { email: state.contactEmail, phone: (e.target as HTMLInputElement).value },
              })
            }
            error={contactErrors.phone}
          />
          <InputField
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            value={state.contactEmail}
            onChange={(e) =>
              dispatch({
                type: "SET_CONTACT",
                payload: { email: (e.target as HTMLInputElement).value, phone: state.contactPhone },
              })
            }
            error={contactErrors.email}
          />
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky-bottom">
        <motion.button whileTap={{ scale: 0.97 }} className="btn-primary" onClick={handleNext}>
          Review Booking
        </motion.button>
      </div>
    </motion.div>
  );
}
