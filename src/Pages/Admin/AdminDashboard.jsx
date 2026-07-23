import { useEffect, useMemo, useRef, useState } from "react";
import "@fontsource/inter";
import { apiGet, adminRequest } from "../../config/api";
import {
  Database,
  GraduationCap,
  Trophy,
  Globe2,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  MapPin,
  Calendar,
  Inbox,
  SearchX,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  Building2,
  Mail,
  Users,
  FileText,
} from "lucide-react";

/* ── Brand tokens (kept from the original ARZ palette) ──────────────
   Only the presentation changes here — colors, endpoints, and all
   CRUD/auth logic are 100% unchanged from the previous version.    */

const BRAND = {
  navy: "#1a2a6c",
  navyDark: "#0f1730",
  navySoft: "#2b3d8f",
  gold: "#c9a84c",
  crimson: "#b01c2e",
};

const COUNTRIES = [
  { value: "south-korea", label: "South Korea", flag: "kr" },
  { value: "uk", label: "United Kingdom", flag: "gb" },
  { value: "australia", label: "Australia", flag: "au" },
  { value: "europe", label: "Europe", flag: "eu" },
];

const DB_TABS = [
  { value: "applications", label: "Applications", icon: FileText },
  { value: "contacts", label: "Contact Messages", icon: Mail },
  { value: "subscribers", label: "Newsletter Subscribers", icon: Users },
];

const NAV_ITEMS = [
  { value: "database", label: "Database", icon: Database },
  { value: "universities", label: "Universities", icon: GraduationCap },
  { value: "stories", label: "Success Stories", icon: Trophy },
];

const emptyUniForm = {
  name: "",
  location: "",
  tag: "",
  image: "",
  description: "",
  requirementsText: "",
  tuition: "",
  intake: "",
};

const emptyStoryForm = {
  name: "",
  university: "",
  city: "",
  country: "",
  flagCode: "",
  course: "",
  tuition: "",
  intake: "",
  image: "",
};

const STATUS_VARIANT = {
  pending: "warning",
  new: "info",
  unread: "info",
  read: "neutral",
  approved: "success",
  accepted: "success",
  subscribed: "success",
  active: "success",
  rejected: "danger",
  declined: "danger",
  cancelled: "danger",
  unsubscribed: "danger",
};

const BADGE_STYLES = {
  success: { bg: "#eafaf0", color: "#1a8a4c", dot: "#22c55e" },
  warning: { bg: "#fff7e6", color: "#a4720a", dot: "#f59e0b" },
  danger: { bg: "#fdeceb", color: "#b01c2e", dot: "#ef4444" },
  info: { bg: "#eef0ff", color: "#1a2a6c", dot: "#3b4fd6" },
  neutral: { bg: "#f0f2f8", color: "#666", dot: "#9aa0b4" },
};

function focusHandlers(color = BRAND.navy) {
  return {
    onFocus: (e) => {
      e.target.style.borderColor = color;
      e.target.style.boxShadow = `0 0 0 3px ${color}1a`;
    },
    onBlur: (e) => {
      e.target.style.borderColor = "#e5e7f0";
      e.target.style.boxShadow = "none";
    },
  };
}

/* ── Small shared UI primitives ───────────────────────────────────── */

function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-md bg-slate-200/70 ${className}`} />
  );
}

function SkeletonRows({ rows = 6, cols = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r}>
          {Array.from({ length: cols }).map((__, c) => (
            <td key={c} className="px-4 py-3.5">
              <Skeleton className="h-3.5 w-full max-w-[140px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function SkeletonTableWrap({ columns = 5 }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid #f0f2f8" }}
    >
      <table className="w-full text-xs">
        <tbody>
          <SkeletonRows rows={6} cols={columns} />
        </tbody>
      </table>
    </div>
  );
}

function SkeletonCardGrid({ count = 6 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid #eef0f8" }}
        >
          <Skeleton className="h-28 w-full rounded-none" />
          <div className="p-4 space-y-2.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-7 flex-1" />
              <Skeleton className="h-7 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Badge({ children, variant = "neutral", icon: Icon, className = "" }) {
  const s = BADGE_STYLES[variant] || BADGE_STYLES.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${className}`}
      style={{ background: s.bg, color: s.color }}
    >
      {Icon ? (
        <Icon size={12} strokeWidth={2.5} />
      ) : (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: s.dot }}
        />
      )}
      {children}
    </span>
  );
}

function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  loading,
  disabled,
  className = "",
  children,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold border-none cursor-pointer transition-all duration-150 hover:brightness-110 hover:shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:active:scale-100";
  const sizes = {
    sm: "text-xs px-3 py-1.5 rounded-lg",
    md: "text-sm px-4 py-2.5 rounded-xl",
    lg: "text-sm px-6 py-3.5 rounded-xl",
  };
  const variants = {
    primary: { background: BRAND.navy, color: "#fff" },
    accent: { background: BRAND.crimson, color: "#fff" },
    secondary: { background: "#f0f2f8", color: "#444" },
    ghost: { background: "transparent", color: "#666" },
    danger: { background: "#fdeceb", color: BRAND.crimson },
    solidDanger: { background: BRAND.crimson, color: "#fff" },
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${className}`}
      style={variants[variant] || variants.primary}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : Icon ? (
        <Icon size={14} strokeWidth={2.5} />
      ) : null}
      {children}
    </button>
  );
}

function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div
      className="text-center py-16 px-6 rounded-2xl"
      style={{ background: "#fff", border: "1px dashed #e5e7f0" }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: "#f0f2f8", color: "#a7acc4" }}
      >
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <p className="text-sm font-semibold" style={{ color: "#555" }}>
        {title}
      </p>
      {description && (
        <p className="text-xs mt-1 max-w-xs mx-auto" style={{ color: "#999" }}>
          {description}
        </p>
      )}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  loading,
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center px-4"
      style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6"
        style={{ boxShadow: "0 30px 70px -20px rgba(0,0,0,0.4)" }}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
          style={{ background: "#fdeceb", color: BRAND.crimson }}
        >
          <AlertCircle size={20} />
        </div>
        <h3
          className="font-bold text-base mb-1.5"
          style={{ color: BRAND.navy }}
        >
          {title}
        </h3>
        <p className="text-sm mb-6" style={{ color: "#777" }}>
          {message}
        </p>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="solidDanger"
            className="flex-1"
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  accent = BRAND.navy,
  loading,
  valueClassName = "text-2xl",
}) {
  return (
    <div
      className="group rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "#fff",
        border: "1px solid #eef0f8",
        boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ background: `${accent}14`, color: accent }}
      >
        <Icon size={20} strokeWidth={1.9} />
      </div>
      <div className="min-w-0">
        {loading ? (
          <Skeleton className="h-7 w-16 mb-1.5" />
        ) : (
          <div
            className={`font-bold ${valueClassName} leading-none truncate`}
            style={{ color: BRAND.navy }}
          >
            {value}
          </div>
        )}
        <div className="text-xs font-semibold mt-2" style={{ color: "#555" }}>
          {label}
        </div>
        {description && (
          <div className="text-[11px] mt-0.5" style={{ color: "#a2a6ba" }}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

function SegmentedTabs({ items, active, onChange }) {
  return (
    <div
      className="inline-flex flex-wrap gap-1 p-1 rounded-xl"
      style={{ background: "#eef0f8" }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border-none cursor-pointer transition-all duration-150"
            style={{
              background: isActive ? "#fff" : "transparent",
              color: isActive ? BRAND.navy : "#777",
              boxShadow: isActive ? "0 1px 3px rgba(15,23,42,0.1)" : "none",
            }}
          >
            <Icon size={15} strokeWidth={2} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function SubTab({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none transition-colors whitespace-nowrap"
      style={{
        background: active ? BRAND.navy : "#fff",
        color: active ? "#fff" : "#555",
        border: active ? `1px solid ${BRAND.navy}` : "1px solid #e5e7f0",
      }}
    >
      {Icon && <Icon size={13} strokeWidth={2.25} />}
      {children}
    </button>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label
        className="block text-xs font-bold uppercase tracking-wide mb-1.5"
        style={{ color: "#888" }}
      >
        {label} {required && <span style={{ color: BRAND.crimson }}>*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-[11px] mt-1" style={{ color: "#aaa" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

function TextInput({ className = "", ...props }) {
  return (
    <input
      {...props}
      {...focusHandlers()}
      className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 ${className}`}
      style={{ border: "1.5px solid #e5e7f0" }}
    />
  );
}

function TextArea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      {...focusHandlers()}
      className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none transition-all duration-150 ${className}`}
      style={{ border: "1.5px solid #e5e7f0" }}
    />
  );
}

function FileDropInput({ onFile, currentName }) {
  const inputRef = useRef(null);
  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors"
      style={{ border: "1.5px dashed #d5d9ec", background: "#fff" }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "#f0f2ff", color: BRAND.navy }}
      >
        <Upload size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold truncate" style={{ color: "#444" }}>
          {currentName || "Click to upload a photo"}
        </p>
        <p className="text-[11px]" style={{ color: "#aaa" }}>
          PNG or JPG
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files[0])}
      />
    </div>
  );
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;
  const isError = toast.type === "error";
  return (
    <div
      className="fixed bottom-5 right-5 left-5 sm:left-auto z-[120] flex items-center gap-3 px-4 py-3.5 rounded-xl sm:max-w-sm"
      style={{
        background: "#fff",
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.25)",
        border: `1px solid ${isError ? "#fbdada" : "#d7f4e2"}`,
      }}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: isError ? "#fdeceb" : "#eafaf0",
          color: isError ? BRAND.crimson : "#1a8a4c",
        }}
      >
        {isError ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />}
      </div>
      <p className="text-sm font-semibold" style={{ color: "#333" }}>
        {toast.message}
      </p>
    </div>
  );
}

function CellValue({ column, value }) {
  if (value === null || value === undefined || value === "")
    return <span style={{ color: "#ccc" }}>—</span>;
  const str = String(value);
  const colLower = column.toLowerCase();

  if (colLower === "status" || STATUS_VARIANT[str.toLowerCase()]) {
    return (
      <Badge variant={STATUS_VARIANT[str.toLowerCase()] || "neutral"}>
        {str}
      </Badge>
    );
  }
  if (colLower.includes("email")) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <Mail size={11} style={{ color: "#aaa" }} />
        {str}
      </span>
    );
  }
  if (
    (colLower.includes("date") ||
      colLower.includes("createdat") ||
      colLower.includes("updatedat")) &&
    !isNaN(Date.parse(str))
  ) {
    const d = new Date(str);
    return (
      <span className="inline-flex items-center gap-1.5">
        <Calendar size={11} style={{ color: "#aaa" }} />
        {d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    );
  }
  if (colLower === "_id") {
    return (
      <span
        className="font-mono"
        style={{ color: "#a2a6ba", fontSize: "11px" }}
      >
        {str.slice(-8)}
      </span>
    );
  }
  return str;
}

function RecordDetailModal({ row, onClose }) {
  const entries = Object.entries(row).filter(([k]) => k !== "__v");
  return (
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6"
        style={{ boxShadow: "0 30px 70px -20px rgba(0,0,0,0.4)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base" style={{ color: BRAND.navy }}>
            Record Details
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer"
            style={{ background: "#f0f2f8", color: "#888" }}
          >
            <X size={14} />
          </button>
        </div>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {entries.map(([k, v]) => (
            <div
              key={k}
              className="pb-2.5"
              style={{ borderBottom: "1px solid #f5f6fa" }}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-wide mb-0.5"
                style={{ color: "#a2a6ba" }}
              >
                {k}
              </div>
              <div className="text-sm break-words" style={{ color: "#333" }}>
                {String(v ?? "—")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Login screen ─────────────────────────────────────────────────── */

function LoginScreen({ onAuthed }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      // Only the password is actually checked by the server —
      // username is stored for display only ("Logged in as ...").
      await adminRequest("/admin/applications", password);
      sessionStorage.setItem("arz_admin_password", password);
      sessionStorage.setItem("arz_admin_username", username || "Admin");
      onAuthed(password);
    } catch (err) {
      setError(err.message || "Incorrect password.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          background: "#fff",
          boxShadow: "0 25px 60px -20px rgba(15,23,42,0.25)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{
            background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.navySoft})`,
          }}
        >
          <GraduationCap size={22} color="#fff" strokeWidth={2} />
        </div>
        <h1 className="text-xl font-bold mb-1" style={{ color: BRAND.navy }}>
          Admin Dashboard
        </h1>
        <p className="text-sm mb-6" style={{ color: "#888" }}>
          ARZ International — sign in to continue.
        </p>

        <div className="space-y-4">
          <Field label="Username">
            <TextInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoFocus
            />
          </Field>

          <Field label="Password">
            <div className="relative">
              <TextInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer p-1"
                style={{ color: "#aaa" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>
        </div>

        {error && (
          <p
            className="text-sm mt-4 flex items-center gap-1.5"
            style={{ color: BRAND.crimson }}
          >
            <AlertCircle size={14} />
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={checking}
          disabled={!password}
          className="w-full mt-6 hover:-translate-y-0.5"
        >
          {checking ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}

/* ── Sticky top navbar ────────────────────────────────────────────── */

function Navbar({ username, onLogout, mobileNavOpen, setMobileNavOpen }) {
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "rgba(15,23,48,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.navySoft})`,
            }}
          >
            <GraduationCap size={18} color="#fff" strokeWidth={2} />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">ARZ Admin</span>
              <span
                className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(201,168,76,0.16)",
                  color: BRAND.gold,
                }}
              >
                Admin
              </span>
            </div>
            <div className="text-[11px]" style={{ color: "#8892b0" }}>
              Dashboard
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden sm:flex items-center gap-2.5 pr-3"
            style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
              style={{ background: BRAND.gold }}
            >
              {username.slice(0, 1).toUpperCase()}
            </div>
            <span className="text-xs font-semibold text-white">{username}</span>
          </div>
          <button
            onClick={onLogout}
            className="hidden sm:flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-lg border-none cursor-pointer transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", color: "#c7ccdf" }}
          >
            <LogOut size={14} />
            Log Out
          </button>
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            className="sm:hidden p-2 border-none bg-transparent cursor-pointer text-white"
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div
          className="sm:hidden px-4 pb-4 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2.5 pt-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
              style={{ background: BRAND.gold }}
            >
              {username.slice(0, 1).toUpperCase()}
            </div>
            <span className="text-xs font-semibold text-white">{username}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-lg border-none cursor-pointer mt-4"
            style={{ background: "rgba(255,255,255,0.06)", color: "#c7ccdf" }}
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      )}
    </header>
  );
}

/* ── Top-level statistics overview ────────────────────────────────── */

function StatsOverview({ password }) {
  const [universityCount, setUniversityCount] = useState(null);
  const [storyCount, setStoryCount] = useState(null);
  const [dbStatus, setDbStatus] = useState("checking"); // checking | ok | error

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      COUNTRIES.map((c) => apiGet(`/universities/${c.value}`).catch(() => [])),
    ).then((lists) => {
      if (!cancelled)
        setUniversityCount(lists.reduce((sum, l) => sum + l.length, 0));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    apiGet("/success-stories")
      .then((list) => {
        if (!cancelled) setStoryCount(list.length);
      })
      .catch(() => {
        if (!cancelled) setStoryCount(0);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    adminRequest("/admin/applications", password)
      .then(() => {
        if (!cancelled) setDbStatus("ok");
      })
      .catch(() => {
        if (!cancelled) setDbStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [password]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        label="Universities"
        value={universityCount ?? "—"}
        loading={universityCount === null}
        description="Across all destinations"
        icon={GraduationCap}
        accent={BRAND.navy}
      />
      <StatCard
        label="Success Stories"
        value={storyCount ?? "—"}
        loading={storyCount === null}
        description="Published on homepage"
        icon={Trophy}
        accent={BRAND.gold}
      />
      <StatCard
        label="Countries"
        value={COUNTRIES.length}
        description="Supported destinations"
        icon={Globe2}
        accent={BRAND.crimson}
      />
      <StatCard
        label="Database Status"
        value={
          dbStatus === "checking"
            ? "—"
            : dbStatus === "ok"
              ? "Operational"
              : "Issue"
        }
        loading={dbStatus === "checking"}
        description={
          dbStatus === "ok"
            ? "All systems normal"
            : dbStatus === "error"
              ? "Check your connection"
              : "Checking..."
        }
        icon={dbStatus === "error" ? ShieldAlert : ShieldCheck}
        accent={dbStatus === "error" ? BRAND.crimson : "#1a8a4c"}
        valueClassName="text-lg"
      />
    </div>
  );
}

/* ── Database tab — same fetch logic, professional data explorer ───── */

function DatabasePanel({ password, showToast }) {
  const [tab, setTab] = useState("applications");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");
  const [filterColumn, setFilterColumn] = useState("all");
  const [filterValue, setFilterValue] = useState("all");
  const [viewRow, setViewRow] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    adminRequest(`/admin/${tab}`, password)
      .then((data) => {
        if (!cancelled) {
          setRows(data);
          setCounts((c) => ({ ...c, [tab]: data.length }));
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, password, refreshKey]);

  // Fetch counts for the two tabs not currently active, just for the stat cards.
  useEffect(() => {
    DB_TABS.forEach((t) => {
      if (t.value === tab || counts[t.value] !== undefined) return;
      adminRequest(`/admin/${t.value}`, password)
        .then((data) => setCounts((c) => ({ ...c, [t.value]: data.length })))
        .catch(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    setSearch("");
    setFilterColumn("all");
    setFilterValue("all");
  }, [tab]);

  const columns = rows[0]
    ? Object.keys(rows[0]).filter((k) => k !== "__v")
    : [];

  const filterOptions = useMemo(() => {
    if (filterColumn === "all") return [];
    const values = new Set();
    rows.forEach((r) => {
      if (r[filterColumn] !== undefined && r[filterColumn] !== "")
        values.add(String(r[filterColumn]));
    });
    return Array.from(values).slice(0, 50);
  }, [rows, filterColumn]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (
        filterColumn !== "all" &&
        filterValue !== "all" &&
        String(row[filterColumn]) !== filterValue
      )
        return false;
      if (!search.trim()) return true;
      const term = search.trim().toLowerCase();
      return columns.some((col) =>
        String(row[col] ?? "")
          .toLowerCase()
          .includes(term),
      );
    });
  }, [rows, search, filterColumn, filterValue, columns]);

  const initialLoading = loading && rows.length === 0;
  const refreshing = loading && rows.length > 0;

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminRequest(`/admin/${tab}/${deleteTarget._id}`, password, {
        method: "DELETE",
      });
      setDeleteTarget(null);
      setRefreshKey((k) => k + 1);
      setCounts((c) => ({ ...c, [tab]: Math.max((c[tab] ?? 1) - 1, 0) }));
      showToast?.("Record deleted.", "success");
    } catch (err) {
      showToast?.(err.message || "Couldn't delete record.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Applications"
          value={counts.applications ?? "—"}
          icon={FileText}
          accent={BRAND.navy}
          description="Total submissions"
          loading={counts.applications === undefined}
        />
        <StatCard
          label="Contact Messages"
          value={counts.contacts ?? "—"}
          icon={Mail}
          accent={BRAND.crimson}
          description="Inbound enquiries"
          loading={counts.contacts === undefined}
        />
        <StatCard
          label="Newsletter Subscribers"
          value={counts.subscribers ?? "—"}
          icon={Users}
          accent={BRAND.gold}
          description="Opted-in contacts"
          loading={counts.subscribers === undefined}
        />
      </div>

      <div
        className="rounded-2xl"
        style={{ background: "#fff", border: "1px solid #eef0f8" }}
      >
        <div
          className="flex flex-col lg:flex-row lg:items-center gap-3 p-4"
          style={{ borderBottom: "1px solid #eef0f8" }}
        >
          <div className="flex flex-wrap gap-2">
            {DB_TABS.map((t) => (
              <SubTab
                key={t.value}
                icon={t.icon}
                active={tab === t.value}
                onClick={() => setTab(t.value)}
              >
                {t.label}
              </SubTab>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#aaa" }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search records..."
                className="pl-9 pr-3 py-2 rounded-lg text-xs outline-none w-44 sm:w-56"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div className="relative">
              <Filter
                size={12}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#aaa" }}
              />
              <select
                value={filterColumn}
                onChange={(e) => {
                  setFilterColumn(e.target.value);
                  setFilterValue("all");
                }}
                className="pl-7 pr-2 py-2 rounded-lg text-xs font-semibold outline-none cursor-pointer"
                style={{ border: "1.5px solid #e5e7f0", color: "#555" }}
              >
                <option value="all">All columns</option>
                {columns.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            {filterColumn !== "all" && (
              <select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="text-xs font-semibold px-3 py-2 rounded-lg outline-none cursor-pointer max-w-[140px]"
                style={{ border: "1.5px solid #e5e7f0", color: "#555" }}
              >
                <option value="all">Any value</option>
                {filterOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={() => setRefreshKey((k) => k + 1)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer border-none"
              style={{ background: "#f0f2f8", color: "#555" }}
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        <div className="p-4">
          {initialLoading && (
            <SkeletonTableWrap columns={Math.max(columns.length, 4)} />
          )}
          {!initialLoading && error && (
            <EmptyState
              icon={AlertCircle}
              title="Couldn't load data"
              description={error}
            />
          )}
          {!initialLoading && !error && rows.length === 0 && (
            <EmptyState
              icon={Inbox}
              title="No records yet"
              description="New entries will appear here automatically."
            />
          )}
          {!initialLoading &&
            !error &&
            rows.length > 0 &&
            filteredRows.length === 0 && (
              <EmptyState
                icon={SearchX}
                title="No matches"
                description="Try a different search term or filter."
              />
            )}

          {!initialLoading && !error && filteredRows.length > 0 && (
            <div
              style={{
                opacity: refreshing ? 0.5 : 1,
                transition: "opacity 150ms",
              }}
            >
              {/* Desktop table */}
              <div
                className="hidden md:block overflow-x-auto rounded-xl"
                style={{ border: "1px solid #f0f2f8" }}
              >
                <table
                  className="w-full text-xs"
                  style={{ borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr style={{ background: "#f8f9ff" }}>
                      {columns.map((col) => (
                        <th
                          key={col}
                          className="text-left px-4 py-3 font-bold uppercase whitespace-nowrap"
                          style={{
                            color: BRAND.navy,
                            borderBottom: "1px solid #eef0f8",
                            fontSize: "10px",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {col}
                        </th>
                      ))}
                      <th
                        className="px-4 py-3"
                        style={{ borderBottom: "1px solid #eef0f8" }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row, i) => (
                      <tr
                        key={row._id}
                        className="transition-colors hover:bg-slate-50"
                        style={{ background: i % 2 === 1 ? "#fbfbfe" : "#fff" }}
                      >
                        {columns.map((col) => (
                          <td
                            key={col}
                            className="px-4 py-3 whitespace-nowrap"
                            style={{
                              color: "#444",
                              borderBottom: "1px solid #f5f6fa",
                              maxWidth: "220px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <CellValue column={col} value={row[col]} />
                          </td>
                        ))}
                        <td
                          className="px-4 py-3 text-right whitespace-nowrap"
                          style={{ borderBottom: "1px solid #f5f6fa" }}
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setViewRow(row)}
                              className="p-1.5 rounded-lg border-none cursor-pointer"
                              style={{
                                background: "#f0f2ff",
                                color: BRAND.navy,
                              }}
                              aria-label="View record"
                            >
                              <Eye size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(row)}
                              className="p-1.5 rounded-lg border-none cursor-pointer"
                              style={{
                                background: "#fdeceb",
                                color: BRAND.crimson,
                              }}
                              aria-label="Delete record"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards — avoids horizontal scrolling */}
              <div className="md:hidden space-y-3">
                {filteredRows.map((row) => (
                  <div
                    key={row._id}
                    className="rounded-xl p-3.5"
                    style={{ border: "1px solid #f0f2f8" }}
                  >
                    {columns.slice(0, 4).map((col) => (
                      <div
                        key={col}
                        className="flex justify-between gap-3 py-1 text-xs"
                      >
                        <span
                          className="font-bold uppercase"
                          style={{ color: "#a2a6ba", fontSize: "10px" }}
                        >
                          {col}
                        </span>
                        <span className="text-right truncate">
                          <CellValue column={col} value={row[col]} />
                        </span>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setViewRow(row)}
                        className="flex-1 text-xs font-bold py-1.5 rounded-lg border-none cursor-pointer"
                        style={{ background: "#f0f2ff", color: BRAND.navy }}
                      >
                        View full record
                      </button>
                      <button
                        onClick={() => setDeleteTarget(row)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer flex items-center gap-1.5"
                        style={{ background: "#fdeceb", color: BRAND.crimson }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {viewRow && (
        <RecordDetailModal row={viewRow} onClose={() => setViewRow(null)} />
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete this record?"
        message="This will be permanently removed from the database. This can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}

/* ── University add/edit form (modal) — same submit logic ───────────── */

function UniversityFormModal({ country, editing, password, onClose, onSaved }) {
  const [form, setForm] = useState(
    editing
      ? {
          ...editing,
          requirementsText: (editing.requirements || []).join("\n"),
        }
      : emptyUniForm,
  );
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("University name is required.");
      return;
    }
    setSaving(true);
    setError("");

    const formData = new FormData();
    formData.append("country", country);
    formData.append("name", form.name);
    formData.append("location", form.location || "");
    formData.append("tag", form.tag || "");
    formData.append("description", form.description || "");
    formData.append("tuition", form.tuition || "");
    formData.append("intake", form.intake || "");

    const reqs = form.requirementsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    reqs.forEach((r) => formData.append("requirements", r));

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const url = editing ? `/universities/${editing._id}` : "/universities";
      const method = editing ? "PUT" : "POST";

      await adminRequest(url, password, {
        method,
        body: formData,
      });

      onSaved();
    } catch (err) {
      setError(err.message || "Couldn't save university.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
    >
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl w-full max-w-lg p-7"
        style={{ boxShadow: "0 30px 70px -20px rgba(0,0,0,0.4)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold" style={{ color: BRAND.navy }}>
            {editing ? "Edit University" : "Add University"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer"
            style={{ background: "#f0f2f8", color: "#888" }}
          >
            <X size={14} />
          </button>
        </div>

        <div className="space-y-4">
          <Field label="Name" required>
            <TextInput
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Location">
              <TextInput
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </Field>
            <Field label="Tag (e.g. Popular)">
              <TextInput
                value={form.tag}
                onChange={(e) => update("tag", e.target.value)}
              />
            </Field>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: "#f8f9ff", border: "1px solid #eef0f8" }}
          >
            <label
              className="block text-xs font-bold uppercase mb-2"
              style={{ color: BRAND.navy }}
            >
              Photo
            </label>
            <FileDropInput
              onFile={setImageFile}
              currentName={imageFile?.name}
            />
            <label
              className="block text-[10px] font-bold uppercase mt-3 mb-1.5"
              style={{ color: "#999" }}
            >
              Or paste an image URL
            </label>
            <TextInput
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              placeholder="https://..."
              className="bg-white"
            />
          </div>

          <Field label="Short Description">
            <TextArea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={2}
            />
          </Field>
          <Field label="Requirements (one per line)">
            <TextArea
              value={form.requirementsText}
              onChange={(e) => update("requirementsText", e.target.value)}
              rows={3}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tuition">
              <TextInput
                value={form.tuition}
                onChange={(e) => update("tuition", e.target.value)}
                placeholder="£13,000/yr"
              />
            </Field>
            <Field label="Intake">
              <TextInput
                value={form.intake}
                onChange={(e) => update("intake", e.target.value)}
                placeholder="Sep & Jan"
              />
            </Field>
          </div>
        </div>

        {error && (
          <p
            className="text-sm mt-4 flex items-center gap-1.5"
            style={{ color: BRAND.crimson }}
          >
            <AlertCircle size={13} />
            {error}
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            loading={saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

/* ── Universities tab — same fetch/delete logic, new look ──────────── */

function UniversitiesPanel({ password, showToast }) {
  const [country, setCountry] = useState("south-korea");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    setError("");
    apiGet(`/universities/${country}`)
      .then(setList)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [country]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminRequest(`/universities/${deleteTarget._id}`, password, {
        method: "DELETE",
      });
      setDeleteTarget(null);
      load();
      showToast?.("University deleted.", "success");
    } catch (err) {
      showToast?.(err.message || "Couldn't delete university.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const filteredList = useMemo(() => {
    if (!search.trim()) return list;
    const term = search.trim().toLowerCase();
    return list.filter(
      (u) =>
        u.name?.toLowerCase().includes(term) ||
        u.location?.toLowerCase().includes(term),
    );
  }, [list, search]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <SubTab
              key={c.value}
              active={country === c.value}
              onClick={() => setCountry(c.value)}
            >
              <span className="inline-flex items-center gap-1.5">
                <img
                  src={`https://flagcdn.com/w20/${c.flag}.png`}
                  alt=""
                  className="w-3.5 h-2.5 rounded-sm object-cover"
                />
                {c.label}
              </span>
            </SubTab>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#aaa" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search universities..."
              className="pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none w-48"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <Button
            variant="accent"
            icon={Plus}
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            Add University
          </Button>
        </div>
      </div>

      {loading && <SkeletonCardGrid count={6} />}
      {!loading && error && (
        <EmptyState
          icon={AlertCircle}
          title="Couldn't load data"
          description={error}
        />
      )}
      {!loading && !error && list.length === 0 && (
        <EmptyState
          icon={GraduationCap}
          title="No universities yet"
          description="Add your first university for this destination."
          action={
            <Button
              variant="accent"
              size="sm"
              icon={Plus}
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
            >
              Add University
            </Button>
          }
        />
      )}
      {!loading && !error && list.length > 0 && filteredList.length === 0 && (
        <EmptyState
          icon={SearchX}
          title="No matches"
          description="Try a different search term."
        />
      )}

      {!loading && !error && filteredList.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((uni) => (
            <div
              key={uni._id}
              className="group rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#fff", border: "1px solid #eef0f8" }}
            >
              <div
                className="h-28 relative flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.navySoft})`,
                }}
              >
                {uni.image ? (
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <Building2 size={26} color="rgba(255,255,255,0.35)" />
                )}
                {uni.tag && (
                  <span
                    className="absolute top-2.5 right-2.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                    style={{ background: "#fdf3e2", color: "#a4863a" }}
                  >
                    {uni.tag}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm" style={{ color: BRAND.navy }}>
                  {uni.name}
                </h3>
                {uni.location && (
                  <p
                    className="text-xs mb-2 flex items-center gap-1"
                    style={{ color: "#999" }}
                  >
                    <MapPin size={11} /> {uni.location}
                  </p>
                )}
                {uni.description && (
                  <p
                    className="text-xs leading-relaxed mb-3"
                    style={{
                      color: "#666",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {uni.description}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Pencil}
                    className="flex-1"
                    onClick={() => {
                      setEditing(uni);
                      setFormOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    onClick={() => setDeleteTarget(uni)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <UniversityFormModal
          country={country}
          editing={editing}
          password={password}
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false);
            load();
            showToast?.(
              editing ? "University updated." : "University added.",
              "success",
            );
          }}
        />
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete university?"
        message={
          deleteTarget
            ? `"${deleteTarget.name}" will be permanently removed. This can't be undone.`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}

/* ── Helper: Extract YouTube Video ID & Return Thumbnail ────────── */
function getYouTubeThumbnail(url) {
  if (!url) return "https://via.placeholder.com/480x360?text=No+Video+URL";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return "https://via.placeholder.com/480x360?text=Invalid+YouTube+URL";
}

/* ── Success story add/edit form (modal) — YouTube URL updated ────────── */

function StoryFormModal({ editing, password, onClose, onSaved }) {
  const [form, setForm] = useState(editing || emptyStoryForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.university.trim() ||
      !form.country.trim() ||
      !form.flagCode.trim()
    ) {
      setError("Name, university, country and flag code are required.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      name: form.name,
      university: form.university,
      city: form.city,
      country: form.country,
      flagCode: form.flagCode.toLowerCase(),
      course: form.course,
      tuition: form.tuition,
      intake: form.intake,
      image: form.image, // Holds the YouTube Video URL
    };
    try {
      if (editing) {
        await adminRequest(`/success-stories/${editing._id}`, password, {
          method: "PUT",
          body: payload,
        });
      } else {
        await adminRequest("/success-stories", password, {
          method: "POST",
          body: payload,
        });
      }
      onSaved();
    } catch (err) {
      setError(err.message || "Couldn't save success story.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
    >
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl w-full max-w-lg p-7"
        style={{ boxShadow: "0 30px 70px -20px rgba(0,0,0,0.4)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold" style={{ color: BRAND.navy }}>
            {editing ? "Edit Success Story" : "Add Success Story"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer"
            style={{ background: "#f0f2f8", color: "#888" }}
          >
            <X size={14} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Student Name" required>
              <TextInput
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </Field>
            <Field label="University" required>
              <TextInput
                value={form.university}
                onChange={(e) => update("university", e.target.value)}
              />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="City">
              <TextInput
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </Field>
            <Field label="Country" required>
              <TextInput
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                placeholder="South Korea"
              />
            </Field>
            <Field label="Flag Code" required hint="ISO code, e.g. kr">
              <TextInput
                value={form.flagCode}
                onChange={(e) => update("flagCode", e.target.value)}
                placeholder="kr"
                maxLength={2}
              />
            </Field>
          </div>
          <Field label="Course / Program">
            <TextInput
              value={form.course}
              onChange={(e) => update("course", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tuition">
              <TextInput
                value={form.tuition}
                onChange={(e) => update("tuition", e.target.value)}
              />
            </Field>
            <Field label="Intake">
              <TextInput
                value={form.intake}
                onChange={(e) => update("intake", e.target.value)}
              />
            </Field>
          </div>

          {/* Updated Field Label to YouTube Video URL */}
          <Field
            label="YouTube Video URL"
            hint="Paste YouTube watch URL (e.g., https://www.youtube.com/watch?v=...)"
          >
            <TextInput
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </Field>

          {/* Real-time YouTube Thumbnail Preview */}
          {form.image && (
            <div className="rounded-xl overflow-hidden border border-slate-200 mt-2">
              <p className="text-[10px] font-bold text-slate-400 p-1.5 bg-slate-50 border-b uppercase">
                Thumbnail Preview
              </p>
              <img
                src={getYouTubeThumbnail(form.image)}
                alt="Thumbnail preview"
                className="w-full h-36 object-cover"
              />
            </div>
          )}
        </div>

        {error && (
          <p
            className="text-sm mt-4 flex items-center gap-1.5"
            style={{ color: BRAND.crimson }}
          >
            <AlertCircle size={13} />
            {error}
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            loading={saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

/* ── Success Stories tab — updated card design with View Success Story button ── */

function StoriesPanel({ password, showToast }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    setError("");
    apiGet("/success-stories")
      .then(setList)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminRequest(`/success-stories/${deleteTarget._id}`, password, {
        method: "DELETE",
      });
      setDeleteTarget(null);
      load();
      showToast?.("Success story deleted.", "success");
    } catch (err) {
      showToast?.(err.message || "Couldn't delete success story.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const filteredList = useMemo(() => {
    if (!search.trim()) return list;
    const term = search.trim().toLowerCase();
    return list.filter(
      (s) =>
        s.name?.toLowerCase().includes(term) ||
        s.university?.toLowerCase().includes(term) ||
        s.country?.toLowerCase().includes(term),
    );
  }, [list, search]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <p className="text-sm" style={{ color: "#888" }}>
          These show on the homepage's Success Story section.
        </p>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#aaa" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stories..."
              className="pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none w-44"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <Button
            variant="accent"
            icon={Plus}
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            Add Story
          </Button>
        </div>
      </div>

      {loading && <SkeletonCardGrid count={6} />}
      {!loading && error && (
        <EmptyState
          icon={AlertCircle}
          title="Couldn't load data"
          description={error}
        />
      )}
      {!loading && !error && list.length === 0 && (
        <EmptyState
          icon={Trophy}
          title="No success stories yet"
          description="Add your first student success story."
          action={
            <Button
              variant="accent"
              size="sm"
              icon={Plus}
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
            >
              Add Story
            </Button>
          }
        />
      )}
      {!loading && !error && list.length > 0 && filteredList.length === 0 && (
        <EmptyState
          icon={SearchX}
          title="No matches"
          description="Try a different search term."
        />
      )}

      {!loading && !error && filteredList.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((story) => {
            const videoThumbnail = getYouTubeThumbnail(story.image);

            return (
              <div
                key={story._id}
                className="group rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
                style={{ background: "#fff", border: "1px solid #eef0f8" }}
              >
                <div>
                  {/* Banner with YouTube Thumbnail & Play Overlay */}
                  <div className="h-36 relative bg-slate-900 overflow-hidden">
                    <img
                      src={videoThumbnail}
                      alt={story.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Flag badge */}
                    {story.flagCode && (
                      <img
                        src={`https://flagcdn.com/w40/${story.flagCode}.png`}
                        alt=""
                        className="absolute top-2.5 right-2.5 w-6 h-4 rounded-sm object-cover border border-white/40 z-10"
                      />
                    )}

                    {/* Visa badge */}
                    <Badge
                      variant="success"
                      icon={CheckCircle2}
                      className="absolute top-2.5 left-2.5 z-10"
                    >
                      Visa Approved
                    </Badge>

                    {/* YouTube Play Icon Center */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md">
                        <svg
                          className="w-5 h-5 fill-current translate-x-0.5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pb-2">
                    <h3
                      className="font-bold text-sm"
                      style={{ color: BRAND.navy }}
                    >
                      {story.name}
                    </h3>
                    <p
                      className="text-xs mt-0.5 flex items-center gap-1"
                      style={{ color: "#999" }}
                    >
                      <Building2 size={11} /> {story.university}
                      {story.country ? ` — ${story.country}` : ""}
                    </p>
                    {story.course && (
                      <p className="text-xs mt-1" style={{ color: "#666" }}>
                        {story.course}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      {story.intake && (
                        <Badge variant="info" icon={Calendar}>
                          {story.intake}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 pt-2">
                  {/* View Success Story Button replacing Start Your Journey */}
                  {story.image && (
                    <a
                      href={story.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-white py-2 px-3 rounded-xl mb-2 transition-all hover:brightness-110 no-underline"
                      style={{ background: BRAND.crimson }}
                    >
                      View Success Story
                    </a>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Pencil}
                      className="flex-1"
                      onClick={() => {
                        setEditing(story);
                        setFormOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => setDeleteTarget(story)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {formOpen && (
        <StoryFormModal
          editing={editing}
          password={password}
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false);
            load();
            showToast?.(
              editing ? "Success story updated." : "Success story added.",
              "success",
            );
          }}
        />
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete success story?"
        message={
          deleteTarget
            ? `"${deleteTarget.name}"'s story will be permanently removed.`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
/* ── Page shell — sticky navbar layout ───────────────────────────── */

export default function AdminDashboard() {
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState("Admin");
  const [tab, setTab] = useState("database");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const savedPassword = sessionStorage.getItem("arz_admin_password");
    const savedUsername = sessionStorage.getItem("arz_admin_username");
    if (savedPassword) setPassword(savedPassword);
    if (savedUsername) setUsername(savedUsername);
  }, []);

  if (!password) {
    return <LoginScreen onAuthed={setPassword} />;
  }

  const logout = () => {
    sessionStorage.removeItem("arz_admin_password");
    sessionStorage.removeItem("arz_admin_username");
    setPassword(null);
  };

  const showToast = (message, type = "success") =>
    setToast({ message, type, id: Date.now() });

  const activeItem = NAV_ITEMS.find((n) => n.value === tab);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f6f7fb", fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar
        username={username}
        onLogout={logout}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: BRAND.navy }}>
              {activeItem?.label}
            </h1>
            <p className="text-sm mt-1" style={{ color: "#999" }}>
              ARZ International Admin Dashboard
            </p>
          </div>
          <SegmentedTabs items={NAV_ITEMS} active={tab} onChange={setTab} />
        </div>

        <StatsOverview password={password} />

        {tab === "database" && (
          <DatabasePanel password={password} showToast={showToast} />
        )}
        {tab === "universities" && (
          <UniversitiesPanel password={password} showToast={showToast} />
        )}
        {tab === "stories" && (
          <StoriesPanel password={password} showToast={showToast} />
        )}
      </main>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
