import * as React from "react";
import LeadPopup from "./LeadPopup";

const PopupContext = React.createContext(null);

/** Wraps the app; any component can call useLeadPopup().openPopup({ planLabel, course, source }). */
export function LeadPopupProvider({ children }) {
  const [state, setState] = React.useState({ open: false, context: {} });

  const openPopup = React.useCallback((context = {}) => {
    setState({ open: true, context });
  }, []);

  const closePopup = React.useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const value = React.useMemo(() => ({ openPopup, closePopup }), [openPopup, closePopup]);

  return (
    <PopupContext.Provider value={value}>
      {children}
      <LeadPopup open={state.open} context={state.context} onClose={closePopup} />
    </PopupContext.Provider>
  );
}

export function useLeadPopup() {
  const ctx = React.useContext(PopupContext);
  if (!ctx) throw new Error("useLeadPopup must be used inside <LeadPopupProvider>");
  return ctx;
}
