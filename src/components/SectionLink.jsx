import { useLocation, useNavigate } from "react-router-dom";

/** Text-link styled button that navigates home (if needed) and smooth-scrolls to a section id. */
export default function SectionLink({ id, children, className }) {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 140);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button type="button" onClick={go} className={className}>
      {children}
    </button>
  );
}
