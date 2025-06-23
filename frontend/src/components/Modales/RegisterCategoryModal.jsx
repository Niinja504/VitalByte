import React from "react";

const RegisterCategoryModal = ({
  isOpen,
  onClose,
  input,
  setInput,
  onSubmit,
  isEditing
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEditing ? "Editar Categoría" : "Nueva Categoría"}</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nombre de la categoría"
        />
        <div className="modal-buttons">
          <button onClick={onSubmit}>
            {isEditing ? "Actualizar" : "Guardar"}
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCategoryModal;