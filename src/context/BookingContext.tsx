"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface Passenger {
  id: string;
  name: string;
  age: string;
  gender: "male" | "female" | "other" | "";
  berthPreference: "lower" | "middle" | "upper" | "side-lower" | "side-upper" | "no-preference";
  idType: "aadhaar" | "pan" | "passport" | "";
  idNumber: string;
}

export interface TrainResult {
  id: string;
  name: string;
  number: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureStation: string;
  arrivalStation: string;
  classes: ClassInfo[];
}

export interface ClassInfo {
  code: string;
  name: string;
  fare: number;
  availability: "available" | "waitlist" | "rac" | "unavailable";
  availableSeats?: number;
  waitlistNumber?: number;
}

export interface BookingState {
  step: number;
  fromStation: string;
  toStation: string;
  date: string;
  travelClass: string;
  quota: string;
  selectedTrain: TrainResult | null;
  selectedClass: ClassInfo | null;
  passengers: Passenger[];
  contactEmail: string;
  contactPhone: string;
  paymentMethod: string;
  pnr: string;
  bookingStatus: "idle" | "searching" | "booking" | "payment" | "confirmed" | "failed";
  error: string | null;
}

type BookingAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_SEARCH"; payload: Partial<Pick<BookingState, "fromStation" | "toStation" | "date" | "travelClass" | "quota">> }
  | { type: "SET_TRAIN"; payload: TrainResult }
  | { type: "SET_CLASS"; payload: ClassInfo }
  | { type: "SET_PASSENGERS"; payload: Passenger[] }
  | { type: "ADD_PASSENGER"; payload: Passenger }
  | { type: "UPDATE_PASSENGER"; payload: { id: string; data: Partial<Passenger> } }
  | { type: "REMOVE_PASSENGER"; payload: string }
  | { type: "SET_CONTACT"; payload: { email: string; phone: string } }
  | { type: "SET_PAYMENT_METHOD"; payload: string }
  | { type: "SET_BOOKING_STATUS"; payload: BookingState["bookingStatus"] }
  | { type: "SET_PNR"; payload: string }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };

const initialState: BookingState = {
  step: 0,
  fromStation: "",
  toStation: "",
  date: "",
  travelClass: "SL",
  quota: "general",
  selectedTrain: null,
  selectedClass: null,
  passengers: [],
  contactEmail: "",
  contactPhone: "",
  paymentMethod: "",
  pnr: "",
  bookingStatus: "idle",
  error: null,
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_SEARCH":
      return { ...state, ...action.payload };
    case "SET_TRAIN":
      return { ...state, selectedTrain: action.payload };
    case "SET_CLASS":
      return { ...state, selectedClass: action.payload };
    case "SET_PASSENGERS":
      return { ...state, passengers: action.payload };
    case "ADD_PASSENGER":
      return { ...state, passengers: [...state.passengers, action.payload] };
    case "UPDATE_PASSENGER":
      return {
        ...state,
        passengers: state.passengers.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload.data } : p
        ),
      };
    case "REMOVE_PASSENGER":
      return {
        ...state,
        passengers: state.passengers.filter((p) => p.id !== action.payload),
      };
    case "SET_CONTACT":
      return { ...state, contactEmail: action.payload.email, contactPhone: action.payload.phone };
    case "SET_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };
    case "SET_BOOKING_STATUS":
      return { ...state, bookingStatus: action.payload };
    case "SET_PNR":
      return { ...state, pnr: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const BookingContext = createContext<{
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
} | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
