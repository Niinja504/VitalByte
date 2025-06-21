import React from 'react';
import './style/Categorias.css'; 
import { useCategorias } from '../hooks/components/useCategorias';

function Categorias({ categories, onCategoryClick }) {
  useCategorias(categories, onCategoryClick);
  return (
    <div className="sidebar">
      <h2>Categorías</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category.id}
            className="category-item"
            onClick={() => onCategoryClick(category)}
          >
            
            <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;