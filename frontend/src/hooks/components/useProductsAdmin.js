import { useState } from 'react';

export function useProductsAdmin(initialFormData, onSave, onClose) {
  const [formData, setFormData] = useState(initialFormData || {});
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    onSave(formData, previewImage);
  };

  return {
    formData,
    setFormData,
    previewImage,
    handleChange,
    handleImageUpload,
    guardarProducto
  };
}
