const Header = ({ title, subTitle,subTitle2, text }) => {
    return (
        <div className="text-center mb-6">
            <span
                className="inline-block bg-slate-800 text-white tracking-[0.2em] text-sm font-bold uppercase px-6 py-2 rounded-full mb-3"

            >
                {title}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-3" style={{ color: "#1a2a6c" }}>
                {subTitle}{" "}
                <span style={{ color: "#b01c2e" }}>{subTitle2}</span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#666" }}>
                {text}
            </p>
        </div>
    );
};

export default Header;