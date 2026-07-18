// Central place that knows how to reach the ARZ International backend.
// Set VITE_API_URL in a .env file at the project root to point at your
// running backend (see /backend/README.md). Falls back to localhost so
// `npm run dev` + `npm start` (backend) work together out of the box.

export const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Small fetch wrapper used across the app's forms.
 * Throws a readable Error on non-2xx responses so callers can show
 * a friendly message instead of a raw network error.
 */
export async function apiPost(path, body) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    let data = null;
    try {
        data = await res.json();
    } catch {
        // no JSON body — that's fine
    }

    if (!res.ok) {
        throw new Error(data?.message || "Something went wrong. Please try again.");
    }

    return data;
}
