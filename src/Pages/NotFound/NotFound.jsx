import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24">
            <div className="font-display text-7xl font-black mb-4" style={{ color: "#1a2a6c" }}>404</div>
            <h1 className="font-display text-2xl font-bold mb-3" style={{ color: "#1a2a6c" }}>Page Not Found</h1>
            <p className="max-w-md mb-8" style={{ color: "#777" }}>
                The page you're looking for doesn't exist or may have moved. Let's get you back on track.
            </p>
            <Link to="/" className="px-7 py-3 rounded-full text-sm font-bold text-white no-underline" style={{ background: "#b01c2e" }}>
                Back to Home
            </Link>
        </div>
    );
}
