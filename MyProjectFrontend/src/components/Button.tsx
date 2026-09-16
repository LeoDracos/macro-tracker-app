import React from "react";

interface ButtonProps {
  onClick: () => void;
}

const Button = ({ onClick }: ButtonProps) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      My Button
    </button>
  );
};

export default Button;
