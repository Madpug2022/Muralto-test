function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "2rem",
        width: "2rem",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "0.3rem",
      }}
    >
      {children}
    </button>
  );
}

export default Button;
