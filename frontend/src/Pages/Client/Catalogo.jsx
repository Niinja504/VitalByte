import React from 'react';
import '../../Pages/style/Client/Catalogo.css';
import ProductModal from '../../components/Modales/DetailProducts';
import { useCatalogo } from '../../hooks/pages/useCatalogo';

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
    updateQuantity
  } = useCatalogo();

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
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar productos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card" onClick={() => handleCardClick(product)}>
              <div className="product-image-container">
                <img
                  src={product.imageUrl || product.image || '/default-product.png'}
                  alt={product.name}
                  className="product-image"
                  onError={e => { e.target.src = '/default-product.png'; }}
                />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-price-container">
                <span className="product-price-label">Precio:</span>
                <span className="product-price">${product.price}</span>
              </div>
              <button className="add-button" onClick={e => { e.stopPropagation(); addToCart(product); }}>+</button>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={closeModal} />
        )}
      </main>
    </div>
  );
}

export default Catalogo;