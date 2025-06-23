import { useContext } from 'react';
import { SuccessModalContext } from '../components/SuccessModal';

export function useSuccessModalContext() {
  return useContext(SuccessModalContext);
}
