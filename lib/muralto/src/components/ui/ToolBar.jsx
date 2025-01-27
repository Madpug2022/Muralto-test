function Toolbar({ children }) {
  return (
    <aside
      style={{
        position: "absolute",
        top: "25px",
        left: "30px",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        color: "black",
      }}
    >
      <nav
        style={{
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2 )",
        }}
      >
        {children}
      </nav>
    </aside>
  );
}

export default Toolbar;
