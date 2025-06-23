import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRecoverPassword from "../hooks/usePasswordRecovery";
import "./style/RecoverPassword.css";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { enviarCorreo } = useRecoverPassword();

  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await enviarCorreo(email);
    if (!ok) return;
    localStorage.setItem("recoveryEmail", email);
    navigate("/verify-code", { replace: true });
  };

  return (
    <div className="form-container">
      <h1>Recuperar Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar código</button>
      </form>
    </div>
  );
};

export default RecoverPassword;
