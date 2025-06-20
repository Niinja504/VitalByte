import axios from "axios";
import { useEffect, useState } from "react";
import '../components/Modales/CategoryModal.css';
import Swal from "sweetalert2";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

// Validación de nombre
const validateCategoryName = (name) => {
  const trimmed = name.trim();
  const onlyLettersRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/;

  if (!trimmed) {
    Swal.fire("Error", "El nombre no puede estar vacío", "error");
    return false;
  }

  if (trimmed.length < 2) {
    Swal.fire("Error", "El nombre debe tener al menos 2 letras", "error");
    return false;
  }

  if (!onlyLettersRegex.test(trimmed)) {
    Swal.fire("Error", "Solo se permiten letras y espacios", "error");
    return false;
  }

  return true;
};

const useDataCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryEdit, setCategoryEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Error al obtener categorías:", err);
    }
  };

  const createCategory = async () => {
    if (!validateCategoryName(input)) return;

    try {
      await api.post("/category", { name: input });
      Swal.fire("Éxito", "Categoría creada", "success");
      fetchCategories();
      setInput('');
    } catch (err) {
      console.error("Error al crear categoría:", err);
      Swal.fire("Error", "No se pudo crear la categoría", "error");
    }
  };

  const updateCategory = async () => {
    if (!validateCategoryName(input)) return;

    try {
      await api.put(`/category/${categoryEdit._id}`, { name: input });
      Swal.fire("Actualizado", "Categoría actualizada", "success");
      fetchCategories();
      setInput('');
      setCategoryEdit(null);
    } catch (err) {
      console.error("Error al actualizar categoría:", err);
      Swal.fire("Error", "No se pudo actualizar la categoría", "error");
    }
  };

  const deleteCategory = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la categoría',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/category/${id}`);
        Swal.fire("Eliminado", "Categoría eliminada", "success");
        fetchCategories();
      } catch (err) {
        console.error("Error al eliminar categoría:", err);
        Swal.fire("Error", "No se pudo eliminar la categoría", "error");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    input,
    setInput,
    search,
    setSearch,
    categoryEdit,
    setCategoryEdit,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};

export default useDataCategory;
