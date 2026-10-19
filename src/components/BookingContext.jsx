import * as React from "react";
import BookingModal from "./BookingModal";

const BookingContext = React.createContext(null);

/** Wraps the app; any component can call useBooking().openBooking({ plan, regionId, course, source }). */
export function BookingProvider({ children }) {
  const [state, setState] = React.useState({ open: false, context: {} });

  const openBooking = React.useCallback((context = {}) => {
    setState({ open: true, context });
  }, []);

  const closeBooking = React.useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const value = React.useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal open={state.open} context={state.context} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = React.useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
