import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import '../../components/style/CategoryCard.css'; // Adjust the path as necessary

const CategoryCard = ({ name, onEdit, onDelete }) => {
  return (
    <div className="category-card">
      <span className="category-name">{name}</span>
      <div className="category-actions">
        <button className="edit-button" onClick={onEdit}>
          <Pencil width='25px' height='auto' color='#ffffff'/>
        </button>
        <button className="delete-button" onClick={onDelete}>
          <Trash2 width='25px' height='auto' color='#ffffff'/>
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;