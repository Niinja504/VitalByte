import { useState } from 'react';

export function useHome() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return {
    mostrarModal,
    abrirModal,
    cerrarModal
  };
}
