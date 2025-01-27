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
        background: "#f9f9f9",
        color: "#3D3C3B",
        borderRadius: "50%",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        border: "none",
        cursor: "pointer",
        padding: "0.2rem",
      }}
    >
      {children}
    </button>
  );
}

export default Button;
