import { useState } from "react";
import { FaExclamation } from "react-icons/fa";

function Helper({ children, text }) {
  const [showHelper, setShowHelper] = useState(false);

  return (
    <div
      style={{
        overflow: "visible",
      }}
      onMouseEnter={() => setShowHelper(true)}
      onMouseLeave={() => setShowHelper(false)}
    >
      {showHelper && (
        <section
          style={{
            minWidth: "8rem",
            position: "absolute",
            bottom: "100%",
            left: 0,
            right: 0,
            borderRadius: "6px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
            color: "black",
            padding: "6px",
            marginBottom: "6px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.3rem",
          }}
        >
          <FaExclamation
            style={{
              color: "black",
              width: "10px",
              height: "10px",
            }}
          />
          <p
            style={{
              margin: 0,
              fontSize: "12px",
            }}
          >
            {text}
          </p>
        </section>
      )}
      {children}
    </div>
  );
}

export default Helper;
