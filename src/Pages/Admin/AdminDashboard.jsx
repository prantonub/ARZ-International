import { useEffect, useState } from "react";
import { apiGet, adminRequest } from "../../config/api";

const COUNTRIES = [
  { value: "south-korea", label: "South Korea", flag: "kr" },
  { value: "uk", label: "United Kingdom", flag: "gb" },
  { value: "australia", label: "Australia", flag: "au" },
  { value: "europe", label: "Europe", flag: "eu" },
];

const DB_TABS = [
  { value: "applications", label: "Applications", icon: "📋" },
  { value: "contacts", label: "Contact Messages", icon: "✉️" },
  { value: "subscribers", label: "Newsletter Subscribers", icon: "📧" },
];

const NAV_ITEMS = [
  {
    value: "database",
    label: "Database",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    ),
  },
  {
    value: "universities",
    label: "Universities",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10l-10-6L2 10l10 6 10-6z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    value: "stories",
    label: "Success Stories",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3" />
      </svg>
    ),
  },
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

/* ── Sub Tab ─────────────────────────────────────────────────────── */

function SubTab({ active, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none transition-all whitespace-nowrap"
      style={{
        background: active ? "#1a2a6c" : "#fff",
        color: active ? "#fff" : "#555",
        border: active ? "1px solid #1a2a6c" : "1px solid #e5e7f0",
      }}
    >
      <span>{icon}</span>
      {children}
    </button>
  );
}

/* ── Empty State ─────────────────────────────────────────────────── */

function EmptyState({ text, icon = "📭" }) {
  return (
    <div
      className="text-center py-20 rounded-2xl flex flex-col items-center justify-center"
      style={{ background: "#fff", border: "1px dashed #e5e7f0" }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <p className="text-sm" style={{ color: "#999" }}>
        {text}
      </p>
    </div>
  );
}

/* ── Confirm Delete Button ──────────────────────────────────────── */

function ConfirmDeleteButton({ onConfirm, label = "Delete" }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => {
            onConfirm();
            setConfirming(false);
          }}
          className="text-xs font-bold px-3 py-1.5 rounded-lg text-white border-none cursor-pointer"
          style={{ background: "#b01c2e" }}
        >
          Confirm?
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer border-none"
          style={{ background: "#f0f2f8", color: "#555" }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer border-none transition-colors"
      style={{ background: "#fdeceb", color: "#b01c2e" }}
    >
      {label}
    </button>
  );
}

/* ── Stat Card ────────────────────────────────────────────────────── */

function StatCard({ label, value, icon }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "#fff",
        border: "1px solid #eef0f8",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold mb-2" style={{ color: "#999" }}>
            {label}
          </div>
          <div
            className="font-display font-bold text-3xl"
            style={{ color: "#1a2a6c" }}
          >
            {value}
          </div>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
          style={{ background: "#f0f2ff", color: "#1a2a6c" }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ── Login Screen with Background ────────────────────────────────── */

function LoginScreen({ onAuthed }) {
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      // Username is hardcoded as "admin"
      await adminRequest("/admin/applications", password);
      sessionStorage.setItem("arz_admin_password", password);
      sessionStorage.setItem("arz_admin_username", "admin");
      onAuthed(password);
    } catch (err) {
      setError(err.message || "Incorrect password.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(26, 42, 108, 0.9), rgba(43, 61, 143, 0.9)), 
                    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.05)" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Floating decorative elements */}
      <div
        className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-10"
        style={{
          background: "#c9a84c",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-10"
        style={{
          background: "#b01c2e",
          filter: "blur(50px)",
        }}
      />

      <form
        onSubmit={submit}
        className="relative w-full max-w-sm rounded-3xl p-8"
        style={{
          background: "#fff",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Logo */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto"
          style={{ background: "linear-gradient(135deg, #1a2a6c, #2b3d8f)" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10l-10-6L2 10l10 6 10-6z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>

        <div className="text-center mb-8">
          <h1
            className="font-display text-2xl font-bold mb-2"
            style={{ color: "#1a2a6c" }}
          >
            Admin Dashboard
          </h1>
          <p className="text-sm" style={{ color: "#888" }}>
            ARZ International
          </p>
        </div>

        {/* Username (display only) */}
        <div className="mb-5">
          <label
            className="block text-xs font-bold uppercase mb-2"
            style={{ color: "#888" }}
          >
            Username
          </label>
          <input
            type="text"
            value="admin"
            disabled
            className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-gray-100 cursor-not-allowed"
            style={{ border: "1.5px solid #e5e7f0", color: "#999" }}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className="block text-xs font-bold uppercase mb-2"
            style={{ color: "#888" }}
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-sm outline-none pr-10 transition-colors"
              style={{
                border: "1.5px solid #e5e7f0",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 border-none bg-transparent cursor-pointer"
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="p-4 rounded-xl mb-5 flex items-start gap-3"
            style={{ background: "#fdeceb", border: "1px solid #fdd9d5" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b01c2e" strokeWidth="2.5" className="mt-0.5 flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm" style={{ color: "#b01c2e" }}>
              {error}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={checking || !password}
          className="w-full py-3 rounded-xl text-sm font-bold text-white border-none cursor-pointer transition-all disabled:opacity-60 hover:shadow-lg"
          style={{
            background: checking
              ? "#1a2a6c"
              : "linear-gradient(135deg, #1a2a6c, #2b3d8f)",
          }}
        >
          {checking ? "Verifying..." : "Sign In"}
        </button>

        {/* Footer */}
        <p className="text-xs text-center mt-6" style={{ color: "#999" }}>
          Protected admin area. Access restricted to authorized personnel only.
        </p>
      </form>
    </div>
  );
}

/* ── Database Panel with Improved Table Design ──────────────────── */

function DatabasePanel({ password }) {
  const [tab, setTab] = useState("applications");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [counts, setCounts] = useState({});

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
  }, [tab, password]);

  useEffect(() => {
    DB_TABS.forEach((t) => {
      if (t.value === tab || counts[t.value] !== undefined) return;
      adminRequest(`/admin/${t.value}`, password)
        .then((data) => setCounts((c) => ({ ...c, [t.value]: data.length })))
        .catch(() => {});
    });
  }, [tab, password, counts]);

  const columns = rows[0]
    ? Object.keys(rows[0]).filter((k) => k !== "__v")
    : [];

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Applications"
          value={counts.applications ?? "—"}
          icon="📋"
        />
        <StatCard
          label="Contact Messages"
          value={counts.contacts ?? "—"}
          icon="✉️"
        />
        <StatCard
          label="Newsletter Subscribers"
          value={counts.subscribers ?? "—"}
          icon="📧"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {DB_TABS.map((t) => (
          <SubTab
            key={t.value}
            active={tab === t.value}
            onClick={() => setTab(t.value)}
            icon={t.icon}
          >
            {t.label}
          </SubTab>
        ))}
      </div>

      {/* Content */}
      {loading && <EmptyState text="Loading records..." icon="⏳" />}
      {!loading && error && <EmptyState text={`Error: ${error}`} icon="❌" />}
      {!loading && !error && rows.length === 0 && (
        <EmptyState text="No records found" icon="📭" />
      )}

      {!loading && !error && rows.length > 0 && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid #eef0f8",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* Header with info */}
          <div
            className="px-6 py-4 border-b"
            style={{ borderColor: "#eef0f8", background: "#f8f9ff" }}
          >
            <p className="text-sm font-semibold" style={{ color: "#1a2a6c" }}>
              {tab === "applications" && "All Applications"}
              {tab === "contacts" && "Contact Messages"}
              {tab === "subscribers" && "Newsletter Subscribers"}
            </p>
            <p className="text-xs mt-1" style={{ color: "#999" }}>
              Total: <strong>{rows.length}</strong> record{rows.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#fafbfc" }}>
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="text-left px-6 py-4 font-semibold whitespace-nowrap"
                      style={{
                        color: "#1a2a6c",
                        fontSize: "12px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        borderBottom: "2px solid #eef0f8",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={row._id || idx}
                    className="hover:bg-blue-50 transition-colors"
                    style={{
                      background: idx % 2 === 0 ? "#fff" : "#fbfbfe",
                      borderBottom: "1px solid #eef0f8",
                    }}
                  >
                    {columns.map((col) => (
                      <td
                        key={col}
                        className="px-6 py-4 text-sm"
                        style={{
                          color: "#555",
                          maxWidth: "300px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={String(row[col] ?? "")}
                      >
                        {String(row[col] ?? "—")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4"
            style={{ background: "#f8f9ff", borderTop: "1px solid #eef0f8" }}
          >
            <p className="text-xs" style={{ color: "#999" }}>
              Showing <strong>{rows.length}</strong> of <strong>{rows.length}</strong> records
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── University Form Modal ──────────────────────────────────────── */

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
      style={{ background: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)" }}
    >
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl w-full max-w-lg p-7"
        style={{ boxShadow: "0 30px 70px -20px rgba(0,0,0,0.4)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2
            className="font-display text-lg font-bold"
            style={{ color: "#1a2a6c" }}
          >
            {editing ? "Edit University" : "Add University"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer"
            style={{ background: "#f0f2f8", color: "#888" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              className="block text-xs font-bold uppercase mb-1.5"
              style={{ color: "#888" }}
            >
              Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                Location
              </label>
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                Tag (e.g. Popular)
              </label>
              <input
                value={form.tag}
                onChange={(e) => update("tag", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: "#f8f9ff", border: "1px solid #eef0f8" }}
          >
            <label
              className="block text-xs font-bold uppercase mb-2"
              style={{ color: "#1a2a6c" }}
            >
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-xs mb-3"
            />
            <label
              className="block text-[10px] font-bold uppercase mb-1.5"
              style={{ color: "#999" }}
            >
              Or paste an image URL
            </label>
            <input
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none bg-white"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>

          <div>
            <label
              className="block text-xs font-bold uppercase mb-1.5"
              style={{ color: "#888" }}
            >
              Short Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase mb-1.5"
              style={{ color: "#888" }}
            >
              Requirements (one per line)
            </label>
            <textarea
              value={form.requirementsText}
              onChange={(e) => update("requirementsText", e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                Tuition
              </label>
              <input
                value={form.tuition}
                onChange={(e) => update("tuition", e.target.value)}
                placeholder="£13,000/yr"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                Intake
              </label>
              <input
                value={form.intake}
                onChange={(e) => update("intake", e.target.value)}
                placeholder="Sep & Jan"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm mt-4" style={{ color: "#b01c2e" }}>
            {error}
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none"
            style={{ background: "#f0f2f8", color: "#555" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer border-none disabled:opacity-60"
            style={{ background: "#1a2a6c" }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Universities Panel ─────────────────────────────────────────── */

function UniversitiesPanel({ password }) {
  const [country, setCountry] = useState("south-korea");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    setError("");
    apiGet(`/universities/${country}`)
      .then(setList)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [country]);

  const handleDelete = async (id) => {
    try {
      await adminRequest(`/universities/${id}`, password, { method: "DELETE" });
      load();
    } catch (err) {
      alert(err.message || "Couldn't delete.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <SubTab
              key={c.value}
              active={country === c.value}
              onClick={() => setCountry(c.value)}
              icon={`https://flagcdn.com/w20/${c.flag}.png`}
            >
              <img
                src={`https://flagcdn.com/w20/${c.flag}.png`}
                alt=""
                className="w-3.5 h-2.5 rounded-sm object-cover"
              />
              {c.label}
            </SubTab>
          ))}
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          className="text-sm font-bold px-4 py-2.5 rounded-xl text-white border-none cursor-pointer flex items-center gap-1.5"
          style={{ background: "#b01c2e" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add University
        </button>
      </div>

      {loading && <EmptyState text="Loading..." icon="🎓" />}
      {!loading && error && (
        <EmptyState text={`Couldn't load data: ${error}`} icon="❌" />
      )}
      {!loading && !error && list.length === 0 && (
        <EmptyState text="No universities added for this country yet." icon="📭" />
      )}

      {!loading && !error && list.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((uni) => (
            <div
              key={uni._id}
              className="rounded-2xl overflow-hidden transition-all hover:shadow-lg"
              style={{ background: "#fff", border: "1px solid #eef0f8" }}
            >
              <div
                className="h-28 relative"
                style={{
                  background: "linear-gradient(135deg, #1a2a6c, #2b3d8f)",
                }}
              >
                {uni.image && (
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
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
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "#1a2a6c" }}
                >
                  {uni.name}
                </h3>
                <p className="text-xs mb-2" style={{ color: "#999" }}>
                  {uni.location}
                </p>
                <p
                  className="text-xs leading-relaxed mb-3"
                  style={{ color: "#666" }}
                >
                  {uni.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(uni);
                      setFormOpen(true);
                    }}
                    className="flex-1 text-xs font-bold px-2.5 py-1.5 rounded-lg cursor-pointer border-none"
                    style={{ background: "#f0f2ff", color: "#1a2a6c" }}
                  >
                    Edit
                  </button>
                  <ConfirmDeleteButton
                    onConfirm={() => handleDelete(uni._id)}
                  />
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
          }}
        />
      )}
    </div>
  );
}

/* ── Story Form Modal ───────────────────────────────────────────── */

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
      image: form.image,
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
      style={{ background: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)" }}
    >
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl w-full max-w-lg p-7"
        style={{ boxShadow: "0 30px 70px -20px rgba(0,0,0,0.4)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2
            className="font-display text-lg font-bold"
            style={{ color: "#1a2a6c" }}
          >
            {editing ? "Edit Success Story" : "Add Success Story"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer"
            style={{ background: "#f0f2f8", color: "#888" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                Student Name *
              </label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                University *
              </label>
              <input
                value={form.university}
                onChange={(e) => update("university", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                City
              </label>
              <input
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                Country *
              </label>
              <input
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                placeholder="South Korea"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                Flag Code *
              </label>
              <input
                value={form.flagCode}
                onChange={(e) => update("flagCode", e.target.value)}
                placeholder="kr"
                maxLength={2}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase mb-1.5"
              style={{ color: "#888" }}
            >
              Course / Program
            </label>
            <input
              value={form.course}
              onChange={(e) => update("course", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                Tuition
              </label>
              <input
                value={form.tuition}
                onChange={(e) => update("tuition", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1.5"
                style={{ color: "#888" }}
              >
                Intake
              </label>
              <input
                value={form.intake}
                onChange={(e) => update("intake", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase mb-1.5"
              style={{ color: "#888" }}
            >
              Photo URL
            </label>
            <input
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm mt-4" style={{ color: "#b01c2e" }}>
            {error}
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none"
            style={{ background: "#f0f2f8", color: "#555" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer border-none disabled:opacity-60"
            style={{ background: "#1a2a6c" }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Stories Panel ──────────────────────────────────────────────── */

function StoriesPanel({ password }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    setError("");
    apiGet("/success-stories")
      .then(setList)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    try {
      await adminRequest(`/success-stories/${id}`, password, {
        method: "DELETE",
      });
      load();
    } catch (err) {
      alert(err.message || "Couldn't delete.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <p className="text-sm" style={{ color: "#888" }}>
          These show on the homepage's Success Story section.
        </p>
        <button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          className="text-sm font-bold px-4 py-2.5 rounded-xl text-white border-none cursor-pointer flex-shrink-0 flex items-center gap-1.5"
          style={{ background: "#b01c2e" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Story
        </button>
      </div>

      {loading && <EmptyState text="Loading..." icon="⭐" />}
      {!loading && error && (
        <EmptyState text={`Couldn't load data: ${error}`} icon="❌" />
      )}
      {!loading && !error && list.length === 0 && (
        <EmptyState text="No success stories added yet." icon="📭" />
      )}

      {!loading && !error && list.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((story) => (
            <div
              key={story._id}
              className="rounded-2xl overflow-hidden transition-all hover:shadow-lg"
              style={{ background: "#fff", border: "1px solid #eef0f8" }}
            >
              <div
                className="h-28 relative"
                style={{
                  background: "linear-gradient(135deg, #b01c2e, #8e1422)",
                }}
              >
                {story.image && (
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                {story.flagCode && (
                  <img
                    src={`https://flagcdn.com/w40/${story.flagCode}.png`}
                    alt=""
                    className="absolute top-2.5 right-2.5 w-6 h-4 rounded-sm object-cover border border-white/40"
                  />
                )}
              </div>
              <div className="p-4">
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "#1a2a6c" }}
                >
                  {story.name}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "#999" }}>
                  {story.university} — {story.country}
                </p>
                <p className="text-xs mt-1" style={{ color: "#666" }}>
                  {story.course}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      setEditing(story);
                      setFormOpen(true);
                    }}
                    className="flex-1 text-xs font-bold px-2.5 py-1.5 rounded-lg cursor-pointer border-none"
                    style={{ background: "#f0f2ff", color: "#1a2a6c" }}
                  >
                    Edit
                  </button>
                  <ConfirmDeleteButton
                    onConfirm={() => handleDelete(story._id)}
                  />
                </div>
              </div>
            </div>
          ))}
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
          }}
        />
      )}
    </div>
  );
}

/* ── Main Dashboard ────────────────────────────────────────────── */

export default function AdminDashboard() {
  const [password, setPassword] = useState(null);
  const [tab, setTab] = useState("database");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const savedPassword = sessionStorage.getItem("arz_admin_password");
    if (savedPassword) setPassword(savedPassword);
  }, []);

  if (!password) {
    return <LoginScreen onAuthed={setPassword} />;
  }

  const logout = () => {
    sessionStorage.removeItem("arz_admin_password");
    sessionStorage.removeItem("arz_admin_username");
    setPassword(null);
  };

  const activeLabel = NAV_ITEMS.find((n) => n.value === tab)?.label;

  return (
    <div className="min-h-screen flex" style={{ background: "#f6f7fb" }}>
      {/* SIDEBAR — desktop */}
      <aside
        className="hidden md:flex flex-col w-64 flex-shrink-0"
        style={{ background: "#0f1730" }}
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1a2a6c, #2b3d8f)" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10l-10-6L2 10l10 6 10-6z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div>
            <div className="font-display font-bold text-sm text-white leading-tight">
              ARZ Admin
            </div>
            <div className="text-[10px]" style={{ color: "#8892b0" }}>
              Dashboard
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.value}
              onClick={() => setTab(item.value)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none transition-colors text-left"
              style={{
                background:
                  tab === item.value ? "rgba(255,255,255,0.08)" : "transparent",
                color: tab === item.value ? "#fff" : "#8892b0",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div
          className="px-3 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2.5 px-3.5 py-2 mb-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs text-white"
              style={{ background: "#c9a84c" }}
            >
              A
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                admin
              </div>
              <div className="text-[10px]" style={{ color: "#8892b0" }}>
                Administrator
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none transition-colors text-left"
            style={{ background: "transparent", color: "#8892b0" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        style={{ background: "#0f1730" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1a2a6c, #2b3d8f)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10l-10-6L2 10l10 6 10-6z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <span className="font-display font-bold text-sm text-white">
            ARZ Admin
          </span>
        </div>
        <button
          onClick={() => setMobileNavOpen((v) => !v)}
          className="p-2 border-none bg-transparent cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileNavOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 pt-14"
          style={{ background: "#0f1730" }}
        >
          <nav className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setTab(item.value);
                  setMobileNavOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold cursor-pointer border-none text-left"
                style={{
                  background:
                    tab === item.value
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                  color: tab === item.value ? "#fff" : "#8892b0",
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold cursor-pointer border-none text-left mt-4"
              style={{ color: "#8892b0" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              Log Out
            </button>
          </nav>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        <div
          className="bg-white px-6 md:px-8 py-5"
          style={{ borderBottom: "1px solid #eef0f8" }}
        >
          <h1
            className="font-display text-xl font-bold"
            style={{ color: "#1a2a6c" }}
          >
            {activeLabel}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "#999" }}>
            ARZ International Admin Dashboard
          </p>
        </div>

        <div className="px-6 md:px-8 py-6 md:py-8">
          {tab === "database" && <DatabasePanel password={password} />}
          {tab === "universities" && <UniversitiesPanel password={password} />}
          {tab === "stories" && <StoriesPanel password={password} />}
        </div>
      </main>
    </div>
  );
}