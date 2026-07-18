export default function LegalPage({ title, updated = "July 2026", children }) {
    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#c9a84c" }}>ARZ International</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1a2a6c" }}>{title}</h1>
            <p className="text-sm mb-8" style={{ color: "#999" }}>Last updated: {updated}</p>
            <div className="prose prose-slate max-w-none text-[15px] leading-relaxed" style={{ color: "#444" }}>
                {children}
            </div>
        </div>
    );
}
