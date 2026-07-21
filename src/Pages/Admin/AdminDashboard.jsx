import { useEffect, useState } from "react";
import { apiGet, adminRequest } from "../../config/api";

const COUNTRIES = [
  { value: "south-korea", label: "South Korea", flag: "kr" },
  { value: "uk", label: "United Kingdom", flag: "gb" },
  { value: "australia", label: "Australia", flag: "au" },
  { value: "europe", label: "Europe", flag: "eu" },
];

const DB_TABS = [
  { value: "applications", label: "Applications" },
  { value: "contacts", label: "Contact Messages" },
  { value: "subscribers", label: "Newsletter Subscribers" },
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

/* ── Small shared UI bits ─────────────────────────────────────────── */

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none transition-colors whitespace-nowrap"
      style={{
        background: active ? "#1a2a6c" : "#f0f2f8",
        color: active ? "#fff" : "#555",
      }}
    >
      {children}
    </button>
  );
}

function EmptyState({ text }) {
  return (
    <div className="text-center py-16 text-sm" style={{ color: "#999" }}>
      {text}
    </div>
  );
}

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
          className="text-xs font-bold px-2.5 py-1 rounded-full text-white border-none cursor-pointer"
          style={{ background: "#b01c2e" }}
        >
          Confirm?
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer border-none"
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
      className="text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer border-none"
      style={{ background: "#fdeceb", color: "#b01c2e" }}
    >
      {label}
    </button>
  );
}

/* ── Password gate ────────────────────────────────────────────────── */

function PasswordGate({ onAuthed }) {
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      // Try one protected endpoint — if it succeeds, the password is correct.
      await adminRequest("/admin/applications", password);
      sessionStorage.setItem("arz_admin_password", password);
      onAuthed(password);
    } catch (err) {
      setError(err.message || "Incorrect password.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#f8f9ff" }}
    >
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl p-8 w-full max-w-sm"
        style={{
          border: "1px solid #eef0f8",
          boxShadow: "0 20px 50px -20px rgba(15,23,42,0.15)",
        }}
      >
        <h1
          className="font-display text-xl font-bold mb-1"
          style={{ color: "#1a2a6c" }}
        >
          Admin Dashboard
        </h1>
        <p className="text-sm mb-6" style={{ color: "#888" }}>
          Enter the admin password to continue.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-3"
          style={{ border: "1.5px solid #e5e7f0" }}
        />
        {error && (
          <p className="text-sm mb-3" style={{ color: "#b01c2e" }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={checking || !password}
          className="w-full py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer disabled:opacity-60"
          style={{ background: "#1a2a6c" }}
        >
          {checking ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}

/* ── Database tab — read-only tables for applications/contacts/subscribers ── */

function DatabasePanel({ password }) {
  const [tab, setTab] = useState("applications");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    adminRequest(`/admin/${tab}`, password)
      .then((data) => {
        if (!cancelled) setRows(data);
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

  const columns = rows[0]
    ? Object.keys(rows[0]).filter((k) => k !== "__v")
    : [];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {DB_TABS.map((t) => (
          <TabButton
            key={t.value}
            active={tab === t.value}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </TabButton>
        ))}
      </div>

      {loading && <EmptyState text="Loading..." />}
      {!loading && error && (
        <EmptyState text={`Couldn't load data: ${error}`} />
      )}
      {!loading && !error && rows.length === 0 && (
        <EmptyState text="No records yet." />
      )}

      {!loading && !error && rows.length > 0 && (
        <div
          className="overflow-x-auto rounded-2xl"
          style={{ border: "1px solid #eef0f8" }}
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
                      color: "#1a2a6c",
                      borderBottom: "1px solid #eef0f8",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id}>
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="px-4 py-3 whitespace-nowrap"
                      style={{
                        color: "#444",
                        borderBottom: "1px solid #f5f6fa",
                        maxWidth: "260px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {String(row[col] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── University add/edit form (modal) ────────────────────────────── */

function UniversityFormModal({ country, editing, password, onClose, onSaved }) {
  const [form, setForm] = useState(
    editing
      ? {
          ...editing,
          requirementsText: (editing.requirements || []).join("\n"),
        }
      : emptyUniForm,
  );
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
    const payload = {
      country,
      name: form.name,
      location: form.location,
      tag: form.tag,
      image: form.image,
      description: form.description,
      tuition: form.tuition,
      intake: form.intake,
      requirements: form.requirementsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };
    try {
      if (editing) {
        await adminRequest(`/universities/${editing._id}`, password, {
          method: "PUT",
          body: payload,
        });
      } else {
        await adminRequest("/universities", password, {
          method: "POST",
          body: payload,
        });
      }
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
        className="bg-white rounded-2xl w-full max-w-lg p-6"
      >
        <h2
          className="font-display text-lg font-bold mb-4"
          style={{ color: "#1a2a6c" }}
        >
          {editing ? "Edit University" : "Add University"}
        </h2>

        <div className="space-y-3">
          <div>
            <label
              className="block text-xs font-bold uppercase mb-1"
              style={{ color: "#888" }}
            >
              Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                Location
              </label>
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                Tag (e.g. Popular)
              </label>
              <input
                value={form.tag}
                onChange={(e) => update("tag", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase mb-1"
              style={{ color: "#888" }}
            >
              Image URL
            </label>
            <input
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              placeholder="Leave blank to use a generic photo"
              className="w-full px-3 py-2 rounded-lg text-sm outline-none"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase mb-1"
              style={{ color: "#888" }}
            >
              Short Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase mb-1"
              style={{ color: "#888" }}
            >
              Requirements (one per line)
            </label>
            <textarea
              value={form.requirementsText}
              onChange={(e) => update("requirementsText", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                Tuition
              </label>
              <input
                value={form.tuition}
                onChange={(e) => update("tuition", e.target.value)}
                placeholder="£13,000/yr"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                Intake
              </label>
              <input
                value={form.intake}
                onChange={(e) => update("intake", e.target.value)}
                placeholder="Sep & Jan"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm mt-3" style={{ color: "#b01c2e" }}>
            {error}
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full text-sm font-semibold cursor-pointer border-none"
            style={{ background: "#f0f2f8", color: "#555" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2.5 rounded-full text-sm font-bold text-white cursor-pointer border-none disabled:opacity-60"
            style={{ background: "#1a2a6c" }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Universities tab ─────────────────────────────────────────────── */

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
            <TabButton
              key={c.value}
              active={country === c.value}
              onClick={() => setCountry(c.value)}
            >
              {c.label}
            </TabButton>
          ))}
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          className="text-sm font-bold px-4 py-2 rounded-full text-white border-none cursor-pointer"
          style={{ background: "#b01c2e" }}
        >
          + Add University
        </button>
      </div>

      {loading && <EmptyState text="Loading..." />}
      {!loading && error && (
        <EmptyState text={`Couldn't load data: ${error}`} />
      )}
      {!loading && !error && list.length === 0 && (
        <EmptyState text="No universities added for this country yet." />
      )}

      {!loading && !error && list.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((uni) => (
            <div
              key={uni._id}
              className="rounded-2xl p-4"
              style={{ border: "1px solid #eef0f8" }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "#1a2a6c" }}
                >
                  {uni.name}
                </h3>
                {uni.tag && (
                  <span
                    className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: "#fdf3e2", color: "#a4863a" }}
                  >
                    {uni.tag}
                  </span>
                )}
              </div>
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
                  className="flex-1 text-xs font-bold px-2.5 py-1.5 rounded-full cursor-pointer border-none"
                  style={{ background: "#f0f2ff", color: "#1a2a6c" }}
                >
                  Edit
                </button>
                <ConfirmDeleteButton onConfirm={() => handleDelete(uni._id)} />
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

/* ── Success story add/edit form (modal) ─────────────────────────── */

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
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
    >
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl w-full max-w-lg p-6"
      >
        <h2
          className="font-display text-lg font-bold mb-4"
          style={{ color: "#1a2a6c" }}
        >
          {editing ? "Edit Success Story" : "Add Success Story"}
        </h2>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                Student Name *
              </label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                University *
              </label>
              <input
                value={form.university}
                onChange={(e) => update("university", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                City
              </label>
              <input
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                Country *
              </label>
              <input
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                placeholder="South Korea"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                Flag Code *
              </label>
              <input
                value={form.flagCode}
                onChange={(e) => update("flagCode", e.target.value)}
                placeholder="kr"
                maxLength={2}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase mb-1"
              style={{ color: "#888" }}
            >
              Course / Program
            </label>
            <input
              value={form.course}
              onChange={(e) => update("course", e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                Tuition
              </label>
              <input
                value={form.tuition}
                onChange={(e) => update("tuition", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase mb-1"
                style={{ color: "#888" }}
              >
                Intake
              </label>
              <input
                value={form.intake}
                onChange={(e) => update("intake", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7f0" }}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase mb-1"
              style={{ color: "#888" }}
            >
              Photo URL
            </label>
            <input
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none"
              style={{ border: "1.5px solid #e5e7f0" }}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm mt-3" style={{ color: "#b01c2e" }}>
            {error}
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full text-sm font-semibold cursor-pointer border-none"
            style={{ background: "#f0f2f8", color: "#555" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2.5 rounded-full text-sm font-bold text-white cursor-pointer border-none disabled:opacity-60"
            style={{ background: "#1a2a6c" }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Success Stories tab ──────────────────────────────────────────── */

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
          className="text-sm font-bold px-4 py-2 rounded-full text-white border-none cursor-pointer flex-shrink-0"
          style={{ background: "#b01c2e" }}
        >
          + Add Story
        </button>
      </div>

      {loading && <EmptyState text="Loading..." />}
      {!loading && error && (
        <EmptyState text={`Couldn't load data: ${error}`} />
      )}
      {!loading && !error && list.length === 0 && (
        <EmptyState text="No success stories added yet." />
      )}

      {!loading && !error && list.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((story) => (
            <div
              key={story._id}
              className="rounded-2xl p-4"
              style={{ border: "1px solid #eef0f8" }}
            >
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
                  className="flex-1 text-xs font-bold px-2.5 py-1.5 rounded-full cursor-pointer border-none"
                  style={{ background: "#f0f2ff", color: "#1a2a6c" }}
                >
                  Edit
                </button>
                <ConfirmDeleteButton
                  onConfirm={() => handleDelete(story._id)}
                />
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

/* ── Page shell ────────────────────────────────────────────────────── */

export default function AdminDashboard() {
  const [password, setPassword] = useState(null);
  const [tab, setTab] = useState("database");

  useEffect(() => {
    const saved = sessionStorage.getItem("arz_admin_password");
    if (saved) setPassword(saved);
  }, []);

  if (!password) {
    return <PasswordGate onAuthed={setPassword} />;
  }

  const logout = () => {
    sessionStorage.removeItem("arz_admin_password");
    setPassword(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "#f8f9ff" }}>
      <div className="bg-white" style={{ borderBottom: "1px solid #eef0f8" }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1
              className="font-display text-xl font-bold"
              style={{ color: "#1a2a6c" }}
            >
              Admin Dashboard
            </h1>
            <p className="text-xs" style={{ color: "#999" }}>
              ARZ International
            </p>
          </div>
          <button
            onClick={logout}
            className="text-xs font-bold px-4 py-2 rounded-full cursor-pointer border-none"
            style={{ background: "#f0f2f8", color: "#555" }}
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <TabButton
            active={tab === "database"}
            onClick={() => setTab("database")}
          >
            Database
          </TabButton>
          <TabButton
            active={tab === "universities"}
            onClick={() => setTab("universities")}
          >
            Universities
          </TabButton>
          <TabButton
            active={tab === "stories"}
            onClick={() => setTab("stories")}
          >
            Success Stories
          </TabButton>
        </div>

        {tab === "database" && <DatabasePanel password={password} />}
        {tab === "universities" && <UniversitiesPanel password={password} />}
        {tab === "stories" && <StoriesPanel password={password} />}
      </div>
    </div>
  );
}
