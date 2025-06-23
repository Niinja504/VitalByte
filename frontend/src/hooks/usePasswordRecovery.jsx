import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useRecoverPassword = () => {
  const [loading, setLoading] = useState(false);


const enviarCorreo = async (email) => {
  setLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:4000/api/passwordRecovery/requestCode",
      { email },
      { withCredentials: true }
    );

    if (res.status === 200 && res.data.message?.toLowerCase().includes("code")) {
      return true;
    } else {
      Swal.fire("Error", "Por favor escribe correctamente tu correo electrónico.", "error");
      return false;
    }
  } catch (err) {
    console.error("Error:", err);
    Swal.fire("Error", "Por favor escribe correctamente tu correo electrónico.", "error");
    return false;
  } finally {
    setLoading(false);
  }
};



const verificarCodigo = async (code) => {
  setLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:4000/api/passwordRecovery/verifyCode",
      { code },
      { withCredentials: true }
    );

    const msg = res.data.message?.toLowerCase();

    if (msg && msg.includes("verified")) {
      Swal.fire("Éxito", "Código verificado correctamente.", "success");
      return true;
    } else {
      Swal.fire("Error", res.data.message || "Código incorrecto", "error");
      return false;
    }
  } catch (err) {
    console.error("Error al verificar código:", err);
    Swal.fire("Error", "No se pudo contactar al servidor", "error");
    return false;
  } finally {
    setLoading(false);
  }
};

const resetPassword = async (newPassword) => {
  setLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:4000/api/passwordRecovery/newPassword",
      { newPassword },
      { withCredentials: true }
    );

    if (res.data.message === "Password updated") {
      // ✅ Muestra mensaje de éxito
      await Swal.fire("Éxito", "Contraseña actualizada correctamente", "success");
      return true;
    } else {
      Swal.fire("Error", res.data.message || "No se pudo actualizar la contraseña", "error");
      return false;
    }
  } catch (err) {
    console.error("Error:", err);
    Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    return false;
  } finally {
    setLoading(false);
  }
};




  return {
    resetPassword,
    verificarCodigo,
    enviarCorreo,
    loading,
  };
};

export default useRecoverPassword;
