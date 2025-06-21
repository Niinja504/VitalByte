import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

export function useCatalogo() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { cart, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    axios.get('http://localhost:4000/api/category')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((cat) => cat !== value);
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    if (selectedCategories.length === 0) {
      return matchesSearch;
    }
    const productCategoryId = product.category_id?._id || product.category_id || product.category?._id || product.category;
    const matchesCategory = selectedCategories.includes(productCategoryId);
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return {
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
  };
}
