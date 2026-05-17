import React from "react";

export interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

const styles = {
  button: {
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  primary: {
    backgroundColor: "#4e55e9",
  },
  secondary: {
    backgroundColor: "#000000",
  },
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  onClick,
}) => {
  const buttonStyle = {
    ...styles.button,
    ...(variant === "primary" && styles.primary),
    ...(variant === "secondary" && styles.secondary),
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};
