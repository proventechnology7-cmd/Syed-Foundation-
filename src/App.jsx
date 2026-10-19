import * as React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import StickyMobileCTA from "./components/StickyMobileCTA";
import { LeadPopupProvider } from "./components/LeadPopupContext";

// Route-based code splitting: each page loads on demand,
// shrinking the initial bundle for faster first paint.
const Home = React.lazy(() => import("./pages/Home"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const Courses = React.lazy(() => import("./pages/Courses"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogDetail = React.lazy(() => import("./pages/BlogDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function ScrollManager() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" aria-label="Loading page">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-700" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <LeadPopupProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </div>
        <Footer />
        <WhatsAppFloat />
        <StickyMobileCTA />
      </div>
      </LeadPopupProvider>
    </BrowserRouter>
  );
}
