function MenuButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#3D3C3B",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        padding: "0.2rem",
        background: "transparent",
      }}
    >
      {children}
    </button>
  );
}

export default MenuButton;
