import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" in window ? "instant" : "auto",
    });
  }, [pathname]);
  return null;
}

// Routes that should NOT show the global footer.
// Add or remove paths here — no other file needs to change.
const HIDE_FOOTER_ON = [
  "/portfolio",
  "/review",
  "/about",
  "/southkorea",
  "/uk",
  "/australia",
  "/europe",
  "/admin",
];

// Routes with their own full page layout (own header, own background) —
// these also hide the public Navbar, not just the Footer.
const HIDE_CHROME_ON = ["/admin"];

function App() {
  const { pathname } = useLocation();
  const hideFooter = HIDE_FOOTER_ON.includes(pathname);
  const hideChrome = HIDE_CHROME_ON.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      {/* page-offset compensates for the fixed navbar so content never hides underneath it */}
      <main className={hideChrome ? "flex-1" : "page-offset flex-1"}>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
