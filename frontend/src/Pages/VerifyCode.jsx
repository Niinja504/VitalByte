import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRecoverPassword from "../hooks/usePasswordRecovery";
import "./style/VerifyCode.css";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const { verificarCodigo, loading } = useRecoverPassword();
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
    const success = await verificarCodigo(code);
    if (success) {
      navigate("/new-password", { replace: true });
    }
  };

  return (
    <div className="form-container">
      <h1>Ingresa el código</h1>
      <p>Si no recibiste ningún correo, verifica que hayas escrito el correo correctamente.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ej: 123456"
          maxLength={6}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verificando..." : "Verificar"}
        </button>
      </form>
    </div>
  );
};

export default VerifyCode;
