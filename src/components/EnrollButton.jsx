import { useLocation, useNavigate } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";

/** CTA button that navigates home (if needed) and smooth-scrolls to the enrollment form.
 *  Pass `plan` + `regionId` to pre-select that plan, or `course` to pre-select that course. */
export default function EnrollButton({ className, variant = "default", size = "default", children, plan, regionId, course }) {
  const navigate = useNavigate();
  const location = useLocation();

  const go = () => {
    const state = (plan || course) ? { plan, regionId, course } : undefined;
    const scroll = () =>
      setTimeout(
        () => document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    if (location.pathname !== "/") {
      navigate("/", { state });
      scroll();
    } else {
      if (state) navigate(".", { state, replace: true });
      document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button type="button" onClick={go} className={cn(buttonVariants({ variant, size }), className)}>
      <CalendarCheck className="h-4 w-4" />
      {children || "Book Free Trial"}
    </button>
  );
}
