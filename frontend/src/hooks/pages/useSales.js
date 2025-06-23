import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export function useSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/orders`);
      console.log("Respuesta de /api/orders:", res.data);
      setSales(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setSales([]);
    }
    setLoading(false);
  };

  const deleteSale = async (id) => {
    await axios.delete(`${API}/orders/${id}`);
    fetchSales();
  };

  const updateSale = async (id, data) => {
    await axios.put(`${API}/orders/${id}`, data);
    fetchSales();
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return { sales, loading, fetchSales, deleteSale, updateSale };
}