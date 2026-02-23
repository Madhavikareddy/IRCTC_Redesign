"use client";

import { useState, Component, ErrorInfo, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { BookingProvider, useBooking } from "@/context/BookingContext";
import SearchScreen from "@/screens/SearchScreen";
import ResultsScreen from "@/screens/ResultsScreen";
import PassengerScreen from "@/screens/PassengerScreen";
import ReviewScreen from "@/screens/ReviewScreen";
import PaymentScreen from "@/screens/PaymentScreen";
import ConfirmationScreen from "@/screens/ConfirmationScreen";
import ErrorScreen from "@/screens/ErrorScreen";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, textAlign: "center" }}>
          <h2 style={{ color: "red", fontSize: 18, fontWeight: 700 }}>
            Something went wrong
          </h2>
          <pre
            style={{
              fontSize: 12,
              color: "#666",
              marginTop: 12,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {this.state.error?.message}
            {"\n"}
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

type Screen =
  | "search"
  | "results"
  | "passenger"
  | "review"
  | "payment"
  | "confirmation"
  | "error-payment"
  | "error-timeout";

function BookingFlow() {
  const [screen, setScreen] = useState<Screen>("search");
  const { dispatch } = useBooking();

  function goTo(s: Screen) {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNewBooking() {
    dispatch({ type: "RESET" });
    goTo("search");
  }

  return (
    <AnimatePresence mode="wait">
      {screen === "search" && (
        <SearchScreen key="search" onNext={() => goTo("results")} />
      )}

      {screen === "results" && (
        <ResultsScreen
          key="results"
          onBack={() => goTo("search")}
          onNext={() => goTo("passenger")}
        />
      )}

      {screen === "passenger" && (
        <PassengerScreen
          key="passenger"
          onBack={() => goTo("results")}
          onNext={() => goTo("review")}
        />
      )}

      {screen === "review" && (
        <ReviewScreen
          key="review"
          onBack={() => goTo("passenger")}
          onNext={() => goTo("payment")}
        />
      )}

      {screen === "payment" && (
        <PaymentScreen
          key="payment"
          onBack={() => goTo("review")}
          onNext={() => goTo("confirmation")}
          onPaymentFail={() => goTo("error-payment")}
        />
      )}

      {screen === "confirmation" && (
        <ConfirmationScreen
          key="confirmation"
          onNewBooking={handleNewBooking}
        />
      )}

      {screen === "error-payment" && (
        <ErrorScreen
          key="error-payment"
          type="payment-failed"
          onRetry={() => goTo("payment")}
          onGoHome={handleNewBooking}
        />
      )}

      {screen === "error-timeout" && (
        <ErrorScreen
          key="error-timeout"
          type="session-timeout"
          onRetry={handleNewBooking}
          onGoHome={handleNewBooking}
        />
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <ErrorBoundary>
      <BookingProvider>
        <BookingFlow />
      </BookingProvider>
    </ErrorBoundary>
  );
}
