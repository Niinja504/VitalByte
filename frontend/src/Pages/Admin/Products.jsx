import React from "react";
import "../style/Admin/Product.css";
import ModalEditarProducto from "../../components/Modales/Products_Admin";
import Title from "../../components/Title";
import { useProducts } from '../../hooks/pages/useProducts';

const Products = () => {
  const {
    products,
    categories,
    showModal,
    isEditMode,
    formData,
    setFormData,
    previewImage,
    setPreviewImage,
    searchTerm,
    setSearchTerm,
    eliminarProducto,
    abrirModalEditar,
    abrirModalAgregar,
    cerrarModal,
    guardarProducto,
    productosFiltrados
  } = useProducts();

  return (
    <div className="products-container">
      <div className="header-container">
        <div className="header-info">
          <Title texto="Productos" />
          <p className="txt">Administra aquí los productos de la empresa.</p>
        </div>
        <button
          onClick={abrirModalAgregar}
          className="modal-btn"
        >
          Agregar nuevo producto
        </button>
      </div>
      <ModalEditarProducto
        isVisible={showModal}
        onClose={cerrarModal}
        formData={formData}
        handleChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
        handleImageUpload={e => setPreviewImage(URL.createObjectURL(e.target.files[0]))}
        previewImage={previewImage}
        guardarProducto={guardarProducto}
        categories={categories}
        isEditMode={isEditMode}
        onSave={guardarProducto}
      />
      <input
        type="text"
        placeholder="Buscar producto..."
        className="search-bar"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map(prod => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{prod.description}</td>
                <td>{prod.price}</td>
                <td>{prod.stock}</td>
                <td>{prod.state}</td>
                <td>{prod.category_id?.name || prod.category_id}</td>
                <td>
                  {prod.image && <img src={prod.image} alt={prod.name} className="product-img" />}
                </td>
                <td>
                  <button className="btn-editar" onClick={() => abrirModalEditar(prod)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminarProducto(prod._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
