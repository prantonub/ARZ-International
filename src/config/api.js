// Central place that knows how to reach the ARZ International backend.
// Set VITE_API_URL in a .env file at the project root to point at your
// running backend (see /backend/README.md). Falls back to localhost so
// `npm run dev` + `npm start` (backend) work together out of the box.

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handleResponse(res) {
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

/** GET a public endpoint (universities, success stories, etc.) */
export async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  return handleResponse(res);
}

/**
 * Small fetch wrapper used across the app's forms.
 * Throws a readable Error on non-2xx responses so callers can show
 * a friendly message instead of a raw network error.
 */
export async function apiPost(path, body) {
  const isFormData = body instanceof FormData;

  const headers = {};
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
  return handleResponse(res);
}

/**
 * Admin-authenticated request. Supports both JSON and FormData body.
 * Automatically avoids setting Content-Type for FormData so browser can set boundary.
 */
export async function adminRequest(
  path,
  password,
  { method = "GET", body } = {},
) {
  const isFormData = body instanceof FormData;

  const headers = {
    "x-admin-password": password,
  };

  // Only set Content-Type if it's NOT a FormData upload
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body:
      body !== undefined
        ? isFormData
          ? body
          : JSON.stringify(body)
        : undefined,
  });
  return handleResponse(res);
}
