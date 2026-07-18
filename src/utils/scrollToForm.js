// Shared navigation helper so every "Apply Now" / "Free Counseling" button
// across the site behaves the same way: if we're already on the homepage,
// smooth-scroll to the application form; otherwise go home first, then scroll.
export function goToApplicationForm(navigate, pathname) {
    if (pathname === "/") {
        document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
    } else {
        navigate("/");
        setTimeout(() => {
            document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    }
}
