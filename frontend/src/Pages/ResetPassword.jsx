import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useRecoverPassword from "../hooks/usePasswordRecovery";
import "./style/ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { resetPassword, loading } = useRecoverPassword();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    const success = await resetPassword(password);
    if (success) {
      navigate("/Home");
    }
  };

  return (
    <div className="form-container">
      <h1>Restablecer Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Restablecer contraseña"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
