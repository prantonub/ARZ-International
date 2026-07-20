// Simple HTTP Basic Auth gate for admin-only routes (viewing applications
// and contact messages). When the browser hits a protected route without
// valid credentials, it automatically shows a native login popup.
export function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || "";
  const [scheme, encoded] = auth.split(" ");

  const reject = () => {
    res.set("WWW-Authenticate", 'Basic realm="ARZ International Admin"');
    return res.status(401).json({ message: "Authentication required." });
  };

  if (scheme !== "Basic" || !encoded) return reject();

  const decoded = Buffer.from(encoded, "base64").toString("utf-8");
  const separatorIndex = decoded.indexOf(":");
  const user = decoded.slice(0, separatorIndex);
  const pass = decoded.slice(separatorIndex + 1);

  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD) {
    return res
      .status(500)
      .json({ message: "Admin credentials are not configured on the server." });
  }

  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASSWORD) {
    return next();
  }

  return reject();
}
