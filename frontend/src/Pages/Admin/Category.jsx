import React, { useState } from 'react';
import { Search, CirclePlus } from 'lucide-react';
import CategoryCard from '../../components/CategoryCard.jsx';
import useDataCategory from '../../hooks/useDataCategory.jsx';
import RegisterCategoryModal from '../../components/Modales/RegisterCategoryModal.jsx';
import '../style/Admin/Category.css';

const Category = () => {
  const {
    categories,
    input,
    setInput,
    search,
    setSearch,
    categoryEdit,
    setCategoryEdit,
    createCategory,
    updateCategory,
    deleteCategory
  } = useDataCategory();

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (cat = null) => {
    if (cat) {
      setCategoryEdit(cat);
      setInput(cat.name);
    } else {
      setCategoryEdit(null);
      setInput('');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryEdit(null);
    setInput('');
  };

  const handleSubmit = () => {
    categoryEdit ? updateCategory() : createCategory();
    handleCloseModal();
  };

  const filtered = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Category-container">
      <div className="C1">
        <h1 className='T1'>Categorías</h1>

        <div className="search-box">
          <Search size={25} color="#fff" />
          <input
            className="T3"
            type="text"
            placeholder="Buscar categoría"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="new-category" onClick={() => handleOpenModal()}>
          <h6 className="T2">Nueva Categoría</h6>
          <CirclePlus size={24} color="#fff" />
        </div>
      </div>

      <div className="C2">
        {filtered.map((cat) => (
          <CategoryCard
            key={cat._id}
            name={cat.name}
            onEdit={() => handleOpenModal(cat)}
            onDelete={() => deleteCategory(cat._id)}
          />
        ))}
      </div>

      <RegisterCategoryModal
        isOpen={showModal}
        onClose={handleCloseModal}
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        isEditing={!!categoryEdit}
      />
    </div>
  );
};

export default Category;
