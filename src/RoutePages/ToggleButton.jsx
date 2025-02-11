
import React from "react";

const ToggleButton = ({ isToggled, onToggle }) => {
  return (
    <div
      style={{
        ...styles.toggleButton,
        backgroundColor: isToggled ? "#9D0910" : "#ccc",
      }}
      onClick={onToggle} // Trigger the function from the parent
    >
      <div
        style={{
          ...styles.toggleCircle,
          transform: isToggled
            ? "translate(30px, -50%)"
            : "translate(2px, -50%)",
        }}
      ></div>
    </div>
  );
};

const styles = {
  toggleButton: {
    width: "58px",
    height: "29px",
    borderRadius: "50px",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.2)",
  },
  toggleCircle: {
    width: "24px",
    height: "24px",
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "2px",
    transform: "translateY(-50%)",
    transition: "transform 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
};

export default ToggleButton;
