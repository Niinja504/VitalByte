export function useOrderCard(estado) {
  const getEstadoClass = () => {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'estado-pendiente';
      case 'activo':
        return 'estado-activo';
      case 'finalizado':
        return 'estado-finalizado';
      default:
        return '';
    }
  };
  return { getEstadoClass };
}
