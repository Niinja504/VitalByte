import { useState } from 'react';

export function useEmployeeCard(onUpdate, employee) {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleUpdate = () => {
    onUpdate(employee);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  return {
    alertVisible,
    handleUpdate
  };
}
