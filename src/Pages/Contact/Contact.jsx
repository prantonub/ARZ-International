import { useState } from "react";
import { apiPost } from "../../config/api";

const INFO = [
    {
        title: "Call Us",
        value: "+880 1308-821404",
        href: "tel:+8801308821404",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a2a6c" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>,
    },
    {
        title: "Email Us",
        value: "info@arzinternational.com",
        href: "mailto:info@arzinternational.com",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a2a6c" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    },
    {
        title: "Visit Us",
        value: "Sylhet & Dhaka, Bangladesh",
        href: null,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a2a6c" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    },
    {
        title: "Office Hours",
        value: "Sat–Thu, 10:30 AM – 6 PM",
        href: null,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a2a6c" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    },
];

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | loading | done | error
    const [error, setError] = useState("");

    const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setError("Please fill in your name, email and message.");
            return;
        }
        setStatus("loading");
        setError("");
        try {
            await apiPost("/contact", form);
            setStatus("done");
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch (err) {
            setStatus("error");
            setError(err.message);
        }
    };

    return (
        <div className="bg-white">
            {/* Header band */}
            <div className="px-6 py-16 md:py-20 text-center" style={{ background: "linear-gradient(135deg,#101a47,#1a2a6c)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#e0c477" }}>Get In Touch</p>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">We'd Love to Hear From You</h1>
                <p className="text-slate-300 max-w-xl mx-auto">
                    Questions about universities, visas or scholarships? Send us a message or book a free counseling session — our team replies within one business day.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_1.2fr] gap-12">
                {/* Info column */}
                <div className="space-y-4">
                    {INFO.map((i) => (
                        <div key={i.title} className="flex items-start gap-4 p-4 rounded-2xl" style={{ border: "1px solid #eef0f8", background: "#f8f9ff" }}>
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#eef0ff" }}>{i.icon}</div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-wide" style={{ color: "#c9a84c" }}>{i.title}</div>
                                {i.href ? (
                                    <a href={i.href} className="text-sm font-semibold no-underline" style={{ color: "#1a2a6c" }}>{i.value}</a>
                                ) : (
                                    <div className="text-sm font-semibold" style={{ color: "#1a2a6c" }}>{i.value}</div>
                                )}
                            </div>
                        </div>
                    ))}
                    <a
                        href="https://wa.me/8801308821404"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white no-underline"
                        style={{ background: "#25D366" }}
                    >
                        Chat on WhatsApp
                    </a>
                </div>

                {/* Form column */}
                <form onSubmit={submit} className="p-6 md:p-8 rounded-3xl" style={{ border: "1px solid #eef0f8", boxShadow: "0 12px 40px rgba(26,42,108,0.08)" }}>
                    {status === "done" ? (
                        <div className="text-center py-10">
                            <div className="text-4xl mb-3">✓</div>
                            <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#1a2a6c" }}>Message sent!</h3>
                            <p className="text-sm" style={{ color: "#666" }}>Thanks for reaching out — a counselor will contact you shortly.</p>
                            <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold underline bg-transparent border-none cursor-pointer" style={{ color: "#b01c2e" }}>Send another message</button>
                        </div>
                    ) : (
                        <>
                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: "#1a2a6c" }}>Full Name *</label>
                                    <input value={form.name} onChange={update("name")} type="text" placeholder="Your name"
                                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1.5px solid #e5e7f0" }} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: "#1a2a6c" }}>Phone</label>
                                    <input value={form.phone} onChange={update("phone")} type="tel" placeholder="01XXXXXXXXX"
                                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1.5px solid #e5e7f0" }} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: "#1a2a6c" }}>Email *</label>
                                <input value={form.email} onChange={update("email")} type="email" placeholder="you@email.com"
                                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1.5px solid #e5e7f0" }} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: "#1a2a6c" }}>Message *</label>
                                <textarea value={form.message} onChange={update("message")} rows={5} placeholder="Tell us about your study plans..."
                                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ border: "1.5px solid #e5e7f0" }} />
                            </div>

                            {error && <p className="text-sm mb-3" style={{ color: "#b01c2e" }}>{error}</p>}

                            <button type="submit" disabled={status === "loading"}
                                className="w-full py-3 rounded-xl text-sm font-bold text-white border-none cursor-pointer disabled:opacity-60"
                                style={{ background: "#b01c2e" }}>
                                {status === "loading" ? "Sending..." : "Send Message"}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
