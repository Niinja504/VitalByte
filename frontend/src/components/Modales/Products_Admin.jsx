import React from "react";
import "../Modales/Styles/Products_Admin.css";
import { useProductsAdmin } from '../../hooks/components/useProductsAdmin';

const ModalEditarProducto = ({
  isVisible,
  onClose,
  formData: initialFormData,
  handleChange: parentHandleChange,
  handleImageUpload: parentHandleImageUpload,
  previewImage: parentPreviewImage,
  guardarProducto: parentGuardarProducto,
  categories,
  isEditMode,
  onSave
}) => {
  const {
    formData,
    previewImage,
    handleChange,
    handleImageUpload,
    guardarProducto
  } = useProductsAdmin(initialFormData, onSave, onClose);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>{isEditMode ? "Editar Producto" : "Agregar Producto"}</h3>

        <label htmlFor="name">Nombre del producto</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Manzanas"
        />

        <label htmlFor="description">Descripción</label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Ej: Fruta fresca, 1kg"
        />

        <label htmlFor="price">Precio</label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Ej: 25.00"
        />

        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Ej: 10"
        />

        <label htmlFor="state">Estado</label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option value="">Seleccione estado</option>
          <option value="Disponible">Disponible</option>
          <option value="Agotado">Agotado</option>
        </select>

        <label htmlFor="category_id">Categoría</label>
        <select
          id="category_id"
          name="category_id"
          value={formData.category_id || ""}
          onChange={handleChange}
        >
          <option value="">Seleccione una categoría</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label htmlFor="image">Imagen</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {previewImage && (
          <img src={previewImage} className="preview-image" alt="preview" />
        )}

        <div className="modal-buttons">
          <button className="btn edit" onClick={guardarProducto}>
            {isEditMode ? "Actualizar" : "Agregar"}
          </button>
          <button className="btn delete" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarProducto;