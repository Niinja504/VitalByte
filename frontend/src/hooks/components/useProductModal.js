import { useState } from 'react';

export function useProductModal(product, onClose) {
  // No lógica compleja, pero se deja preparado para futuras ampliaciones
  return { product, onClose };
}
