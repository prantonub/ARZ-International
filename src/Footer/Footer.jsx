import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ApplyButton from "../Component2/ApplyButton";
import { goToApplicationForm } from "../utils/scrollToForm";


function getOfficeStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  if (day === 5) return false; // Friday closed
  return hour >= 10 && hour < 18;
}

const SocialIcon = ({ title, href, icon: Icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#b01c2e] text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
    >
      {Icon}
    </a>
  );
};

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState("idle");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(getOfficeStatus());
    const t = setInterval(() => setIsOpen(getOfficeStatus()), 60_000);
    return () => clearInterval(t);
  }, []);

const subscribe = async () => {
  if (!email.trim()) return;

  setSubState("loading");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (response.ok) {
      setSubState("done");
      setEmail("");

      console.log(result.message);

      setTimeout(() => {
        setSubState("idle");
      }, 2000);
    } else {
      console.error(result.message);
      setSubState("error");
    }
  } catch (error) {
    console.error(error);
    setSubState("error");
  }
};
  const handleApply = () => goToApplicationForm(navigate, location.pathname);

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Our Portfolio", to: "/portfolio" },
    { label: "Our Review", to: "/review" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ];

  const destinations = [
    { label: "South Korea", to: "/southkorea" },
    { label: "United Kingdom", to: "/uk" },
    { label: "Australia", to: "/australia" },
    { label: "Europe", to: "/europe" },
  ];

  const company = [
    { label: "Blog & Resources", href: "#" },
    { label: "Success Stories", href: "#" },
    { label: "Testimonials", href: "#" },
    { label: "Career Support", href: "#" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-[#1a2a6c] to-[#0f1b47] text-white font-sans">
      {/* Top CTA Section */}
      <div className="bg-[#b01c2e] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Ready to Start Your Journey?
              </h3>
              <p className="text-white/90">
                Get expert guidance for your international education aspirations
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <button
                onClick={handleApply}
                className="px-8 py-3 bg-white text-[#b01c2e] font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
              >
                Apply Now
              </button>
              <Link
                to="/contact"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-6">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">ARZ</h2>
              <p className="text-sm text-[#c9a84c] font-semibold">
                International
              </p>
            </div>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for international education. We help students
              achieve their dreams of studying abroad.
            </p>

            {/* Office Status */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <p className="text-xs font-semibold text-gray-300 mb-3">
                Office Status
              </p>
              <div
                className={`flex items-center gap-2 text-sm font-semibold ${
                  isOpen ? "text-green-400" : "text-red-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-400" : "bg-red-400"} animate-pulse`}
                />
                {isOpen ? "Open Now" : "Closed"}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Sat-Thu: 10:00 AM - 6:00 PM
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <SocialIcon
                title="Facebook"
                href="https://facebook.com"
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                }
              />
              <SocialIcon
                title="Instagram"
                href="https://instagram.com"
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                }
              />
              <SocialIcon
                title="LinkedIn"
                href="https://linkedin.com"
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                }
              />
              <SocialIcon
                title="WhatsApp"
                href="https://wa.me/8801308821404"
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-[#c9a84c] text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Study Destinations */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              Destinations
            </h4>
            <ul className="space-y-3">
              {destinations.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-[#c9a84c] text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#c9a84c] text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li>
                <p className="text-xs text-gray-400 mb-1">Phone</p>
                <a
                  href="tel:+8801308821404"
                  className="text-gray-300 hover:text-[#c9a84c] text-sm transition-colors duration-300 block"
                >
                  +880 1308 821404
                </a>
              </li>
              <li>
                <p className="text-xs text-gray-400 mb-1">Email</p>
                <a
                  href="mailto:info@arzinternational.com"
                  className="text-gray-300 hover:text-[#c9a84c] text-sm transition-colors duration-300 block"
                >
                  info@arzinternational.com
                </a>
              </li>
              <li>
                <p className="text-xs text-gray-400 mb-1">Address</p>
                <p className="text-gray-300 text-sm">
                  Dhaka & Sylhet,
                  <br />
                  Bangladesh
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold text-white mb-3">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-gray-300 text-sm">
                Get latest updates on scholarship opportunities, admission
                deadlines, and visa guidelines.
              </p>
            </div>
            <div>
              {subState === "done" ? (
                <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-4 text-center">
                  <p className="text-green-300 font-semibold text-sm">
                    ✓ Successfully subscribed!
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && subscribe()}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#c9a84c] transition-all duration-300"
                  />
                  <button
                    onClick={subscribe}
                    disabled={subState === "loading"}
                    className="px-6 py-3 bg-[#b01c2e] hover:bg-[#8b1421] text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {subState === "loading" ? "..." : "Subscribe"}
                  </button>
                </div>
              )}
              {subState === "error" && (
                <p className="text-red-400 text-sm mt-2">
                  Subscription failed. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0f1b47] py-3 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p className="text-xs text-gray-300">
              &copy; {new Date().getFullYear()} ARZ International. All rights
              reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="#"
                className="text-xs text-gray-300 hover:text-[#c9a84c] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-xs text-gray-300 hover:text-[#c9a84c] transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-xs text-gray-300 hover:text-[#c9a84c] transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
