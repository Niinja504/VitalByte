import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    state: "",
    category_id: "",
    image: ""
  });
  const [previewImage, setPreviewImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error al obtener productos:", err));
    fetch("http://localhost:4000/api/category")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error al obtener categorías:", err));
  }, []);

  const eliminarProducto = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:4000/api/products/${id}`, {
          method: "DELETE"
        });
        setProducts(products.filter(prod => prod._id !== id));
        Swal.fire("Eliminado", "El producto fue eliminado.", "success");
      } catch (error) {
        console.error("Error eliminando:", error);
        Swal.fire("Error", "No se pudo eliminar el producto.", "error");
      }
    }
  };

  const abrirModalEditar = (product) => {
    setFormData({
      ...product,
      category_id: product.category_id?._id || product.category_id || ""
    });
    setPreviewImage(product.image);
    setIsEditMode(true);
    setShowModal(true);
  };

  const abrirModalAgregar = () => {
    setFormData({
      _id: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
      state: "",
      category_id: "",
      image: ""
    });
    setPreviewImage("");
    setIsEditMode(false);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setFormData({
      _id: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
      state: "",
      category_id: "",
      image: ""
    });
    setPreviewImage("");
    setIsEditMode(false);
  };

  const guardarProducto = (data, image) => {
    // Aquí iría la lógica para guardar producto (POST/PUT)
    cerrarModal();
  };

  const productosFiltrados = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
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
  };
}
