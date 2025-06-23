import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../Pages/style/Client/Catalogo.css';
import ProductModal from '../../components/Modales/DetailProducts';
import { useCatalogo } from '../../hooks/pages/useCatalogo';
import { useAuth } from '../../context/AuthContext';
import SuccessMessage from '../../components/SuccessMessage';

function Catalogo() {
  const {
    categories,
    search,
    setSearch,
    selectedCategories,
    handleCategoryChange,
    filteredProducts,
    handleCardClick,
    selectedProduct,
    closeModal,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart, 
  } = useCatalogo();
  const { isAuthenticated } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const isInCart = (productId) => {
    return cart.some(p => p._id === productId);
  };

  const eliminarDelCarrito = async (product) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar producto?',
      text: '¿Estás seguro de que deseas eliminar este producto del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
    });

    if (confirm.isConfirmed) {
      removeFromCart(product._id); // Elimina del carrito
      setSuccessMsg('Producto eliminado del carrito.');
      setShowSuccess(true);
    }
  };

  return (
    <div className="catalogo-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Categorías</h2>
        <form className="category-list">
          {categories.map((category, index) => {
            const label = category.name || category;
            const key = category._id || category.id || index;
            const value = category._id || category.id || label;
            return (
              <label key={key} className="category-item">
                <span>{label}</span>
                <input
                  type="checkbox"
                  name="categories"
                  value={value}
                  checked={selectedCategories.includes(value)}
                  onChange={handleCategoryChange}
                />
              </label>
            );
          })}
        </form>
      </aside>

      <main className="main-content">
        <div className="products-header">
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar productos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="products-wrapper">
            <div className="product-grid">
              {filteredProducts.map(product => {
                const inCart = isInCart(product._id);
                // Encuentra el producto en el carrito para obtener la cantidad
                const cartProduct = cart.find(p => p._id === product._id);
                const quantity = cartProduct ? cartProduct.quantity || 1 : 1;
                return (
                  <div
                    key={product._id}
                    className="product-card"
                    onClick={() => handleCardClick(product)}
                  >
                    <div className="product-image-container">
                      <img
                        src={product.imageUrl || product.image || '/default-product.png'}
                        alt={product.name}
                        className="product-image"
                        onError={e => {
                          e.target.src = '/default-product.png';
                        }}
                      />
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-price-container">
                      <span className="product-price-label">Precio:</span>
                      <span className="product-price">${product.price}</span>
                    </div>
                    {inCart && (
                      <div className="quantity-selector">
                        <button
                          className="quantity-btn"
                          onClick={e => {
                            e.stopPropagation();
                            updateQuantity(product._id, -1);
                          }}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="quantity-input"
                          min="1"
                          value={quantity}
                          onChange={e => {
                            e.stopPropagation();
                            let val = parseInt(e.target.value, 10);
                            if (isNaN(val) || val < 1) val = 1;
                            // Calcular el delta respecto a la cantidad actual
                            const delta = val - quantity;
                            if (delta !== 0) {
                              updateQuantity(product._id, delta);
                            }
                          }}
                          onClick={e => e.stopPropagation()}
                        />
                        <button
                          className="quantity-btn"
                          onClick={e => {
                            e.stopPropagation();
                            updateQuantity(product._id, 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                    {inCart ? (
                      <button
                        className="add-button"
                        style={{ backgroundColor: '#d9534f' }}
                        onClick={e => {
                          e.stopPropagation();
                          eliminarDelCarrito(product);
                        }}
                      >
                        ✕
                      </button>
                    ) : (
                      <button
                        className="add-button"
                        onClick={e => {
                          e.stopPropagation();
                          if (!isAuthenticated) {
                            Swal.fire({
                              icon: 'info',
                              title: 'Inicia sesión o regístrate',
                              text: 'Debes iniciar sesión o crear una cuenta para agregar productos al carrito.',
                              showConfirmButton: true,
                              confirmButtonText: 'Entendido',
                            });
                            return;
                          }
                          addToCart(product);
                          setSuccessMsg('Producto añadido exitosamente.');
                          setShowSuccess(true);
                        }}
                      >
                        +
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={closeModal} />
        )}
        {/* Mensaje de éxito reutilizable */}
        {showSuccess && (
          <SuccessMessage
            message={successMsg || "Producto añadido exitosamente."}
            onClose={() => setShowSuccess(false)}
            duration={1800}
          />
        )}
      </main>
    </div>
  );
}

export default Catalogo;