import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/arzlogo.jpeg";
import ApplyNow from "../Component2/ApplyNow";

function ARZLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 md:gap-3 flex-shrink-0 no-underline"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0 rounded-full overflow-hidden ring-1 ring-slate-200">
        <img
          src={logo}
          alt="ARZ International logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-display font-bold text-sm md:text-base text-navy tracking-wide whitespace-nowrap">
          ARZ International
        </span>
        <span className="text-[8px] md:text-[9px] uppercase text-gold-dark tracking-[0.15em] md:tracking-[0.2em] font-semibold whitespace-nowrap">
          Support Until Success
        </span>
      </div>
    </Link>
  );
}

const countries = [
  { name: "South Korea", flag: "kr", path: "/southkorea" },
  { name: "United Kingdom", flag: "gb", path: "/uk" },
  { name: "Australia", flag: "au", path: "/australia" },
  { name: "Europe", flag: "eu", path: "/europe" },
];

// Added "Review" safely to the desktop navigation row tracking array
const navLinks = [
  "Home",
  "Countries",
  "Portfolio",
  "Review",
  "About",
  "Contact",
];

// Added the target routing mapping for the "/review" page
const linkPaths = {
  Home: "/",
  Portfolio: "/portfolio",
  Review: "/review",
  About: "/about",
  Contact: "/contact",
};

const countryPaths = countries.map((c) => c.path);

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCountriesOpen, setMobileCountriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);

  const getIsActive = (link) => {
    if (link === "Home") return location.pathname === "/";
    if (link === "Countries") return countryPaths.includes(location.pathname);
    return location.pathname === linkPaths[link];
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setMobileCountriesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToContact = () => navigate("/contact");

  return (
    <div className="h-[76px] w-full relative z-50">
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[76px] px-4 md:px-6 lg:px-8 flex items-center justify-between font-sans transition-all duration-200 max-w-full box-border"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: scrolled
            ? "0 4px 16px rgba(26,42,108,0.08)"
            : "0 1px 0 rgba(26,42,108,0.04)",
          borderBottom: "3px solid #b01c2e",
        }}
      >
        <ARZLogo />

        {/* DESKTOP LINKS */}
        <ul className="hidden lg:flex items-center gap-1 xl:gap-3 flex-shrink-0 m-0 p-0 list-none">
          {navLinks.map((link) => {
            const isCountries = link === "Countries";
            const isActive = getIsActive(link);

            if (isCountries) {
              return (
                <li key={link} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="relative flex items-center gap-1 text-xs xl:text-sm font-semibold px-3 py-2 transition-colors duration-200 bg-transparent border-none cursor-pointer whitespace-nowrap hover:text-[#b01c2e]"
                    style={{ color: isActive ? "#b01c2e" : "#1a2a6c" }}
                  >
                    Countries
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{
                        transition: "transform 0.2s",
                        transform: dropdownOpen
                          ? "rotate(180deg)"
                          : "rotate(0)",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-0.5"
                        style={{ backgroundColor: "#b01c2e" }}
                      />
                    )}
                  </button>

                  {dropdownOpen && (
                    <div
                      className="absolute top-full left-1/2 mt-1 rounded-xl overflow-hidden z-50 shadow-xl border border-solid border-slate-100 bg-white w-[220px]"
                      style={{ transform: "translateX(-50%)" }}
                    >
                      <div className="px-4 py-2 bg-slate-50/80 border-b border-solid border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Study Destinations
                        </span>
                      </div>

                      {countries.map((c) => (
                        <Link
                          key={c.name}
                          to={c.path}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-155 no-underline text-xs font-semibold text-slate-700 hover:text-[#b01c2e] hover:bg-slate-50"
                        >
                          <img
                            src={`https://flagcdn.com/w40/${c.flag}.png`}
                            alt=""
                            className="rounded-sm object-cover flex-shrink-0 w-[20px] h-[14px] border border-solid border-slate-200"
                          />
                          {c.name}
                          <svg
                            className="ml-auto opacity-40 group-hover:opacity-100"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={link}>
                <Link
                  to={linkPaths[link]}
                  className="relative text-xs xl:text-sm font-semibold px-3 py-2 transition-colors duration-200 no-underline whitespace-nowrap hover:text-[#b01c2e]"
                  style={{ color: isActive ? "#b01c2e" : "#1a2a6c" }}
                >
                  {link}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5"
                      style={{ backgroundColor: "#b01c2e" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* DESKTOP BUTTONS */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
          <button
            onClick={goToContact}
            className="flex items-center gap-1.5 px-3 py-2 rounded text-xs xl:text-sm font-semibold transition-all duration-200 bg-transparent border-2 border-solid cursor-pointer whitespace-nowrap"
            style={{ borderColor: "#1a2a6c", color: "#1a2a6c" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1a2a6c";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#1a2a6c";
            }}
          >
            <svg
              className="flex-shrink-0"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <span>Free Counseling</span>
          </button>

          <ApplyNow className="flex bg-brand text-white border-none items-center gap-1.5 px-4 py-2 rounded text-xs xl:text-sm font-bold transition-all duration-200 cursor-pointer hover:bg-brand-dark whitespace-nowrap flex-shrink-0 shadow-sm">
            Apply Now →
          </ApplyNow>
        </div>

        {/* MOBILE HAMBURGER TOGGLE */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2 bg-transparent border-none cursor-pointer flex-shrink-0"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "#1a2a6c",
                transform:
                  i === 0 && menuOpen
                    ? "rotate(45deg) translateY(7px)"
                    : i === 2 && menuOpen
                      ? "rotate(-45deg) translateY(-7px)"
                      : "none",
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>

        {/* MOBILE DRAWER EXTENSION */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full z-50 flex flex-col px-5 py-4 gap-1.5 lg:hidden max-h-[calc(100vh-76px)] overflow-y-auto bg-white border-t-2 border-solid border-[#b01c2e] shadow-lg">
            {navLinks.map((link) => {
              const isCountries = link === "Countries";
              const isActive = getIsActive(link);

              if (isCountries) {
                return (
                  <div key={link} className="w-full">
                    <button
                      onClick={() => setMobileCountriesOpen((v) => !v)}
                      className="w-full flex items-center justify-between text-xs font-bold py-2 px-3 rounded text-left border-none bg-transparent cursor-pointer"
                      style={{
                        color: isActive ? "#b01c2e" : "#1a2a6c",
                        backgroundColor: isActive
                          ? "rgba(176,28,46,0.04)"
                          : "transparent",
                      }}
                    >
                      Countries
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        style={{
                          transition: "transform 0.2s",
                          transform: mobileCountriesOpen
                            ? "rotate(180deg)"
                            : "rotate(0)",
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {mobileCountriesOpen && (
                      <div className="mt-1 ml-2 rounded-lg border border-solid border-slate-100 overflow-hidden bg-slate-50/50">
                        {countries.map((c) => (
                          <Link
                            key={c.name}
                            to={c.path}
                            className="flex items-center gap-3 px-4 py-2 no-underline text-xs font-semibold text-slate-700 border-b border-solid border-slate-100/60"
                            style={{
                              color:
                                location.pathname === c.path
                                  ? "#b01c2e"
                                  : "#1a2a6c",
                              backgroundColor:
                                location.pathname === c.path
                                  ? "#f0f2ff"
                                  : "transparent",
                            }}
                          >
                            <img
                              src={`https://flagcdn.com/w40/${c.flag}.png`}
                              alt=""
                              className="rounded-sm object-cover flex-shrink-0 w-[18px] h-[13px]"
                            />
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link}
                  to={linkPaths[link]}
                  className="text-xs font-bold py-2 px-3 rounded no-underline transition-all"
                  style={{
                    color: isActive ? "#b01c2e" : "#1a2a6c",
                    backgroundColor: isActive
                      ? "rgba(176,28,46,0.04)"
                      : "transparent",
                  }}
                >
                  {link}
                </Link>
              );
            })}

            <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-solid border-slate-100">
              <button
                onClick={goToContact}
                className="flex items-center justify-center gap-2 w-full py-2 rounded text-xs font-bold cursor-pointer border-2 border-solid bg-transparent"
                style={{ borderColor: "#1a2a6c", color: "#1a2a6c" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                Free Counseling
              </button>
              <ApplyNow className="w-full py-2 rounded text-xs font-bold cursor-pointer bg-brand text-white border-none text-center" />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
