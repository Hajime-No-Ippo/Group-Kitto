import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackToHome() {
  const navigate = useNavigate();

  return (
    <button
      className="px-3 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-xl hover:bg-[var(--accent-btn)] hover:text-[var(--primary)] transition"
      onClick={() => navigate("/home")}
    >
      Home
    </button>
  );
}
