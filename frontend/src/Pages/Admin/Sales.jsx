import React from 'react';
import Swal from 'sweetalert2';
import Title from '../../components/Title.jsx';
import { useSales } from '../../hooks/pages/useSales';
import '../style/Admin/Sales.css';

const Sales = () => {
    const { sales, loading, deleteSale, updateSale } = useSales();

    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Eliminar venta?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSale(id);
                Swal.fire("Eliminado", "La venta ha sido eliminada.", "success");
            }
        });
    };

    const handleUpdate = (sale) => {
        Swal.fire({
            title: "Actualizar estado",
            input: "text",
            inputLabel: "Nuevo estado",
            inputValue: sale.state,
            showCancelButton: true,
            confirmButtonText: "Actualizar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                updateSale(sale._id, { ...sale, state: result.value });
                Swal.fire("Actualizado", "La venta ha sido actualizada.", "success");
            }
        });
    };

    return (
        <div className="employees-container">
            <div className="header-container">
                <div className="header-info">
                    <Title texto="Ventas" />
                    <p className="txt">Consulta y administra las ventas realizadas.</p>
                </div>
            </div>
            <div className="tabla-contenedor">
                {loading ? (
                    <div>Cargando ventas...</div>
                ) : (
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Cantidad Productos</th>
                                <th>Total</th>
                                <th>Método de pago</th>
                                <th>Dirección</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales && sales.length > 0 ? sales.map((sale) => (
                                <tr key={sale._id}>
                                    <td>{sale.client_id?.fullname || "Sin nombre"}</td>
                                    <td>{sale.items?.length || 0}</td>
                                    <td>${sale.total_price}</td>
                                    <td>{sale.payment_method}</td>
                                    <td>{sale.delivery_address}</td>
                                    <td>{sale.state}</td>
                                    <td>
                                        <button
                                            className="btn-editar"
                                            onClick={() => handleUpdate(sale)}
                                        >Actualizar</button>
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => handleDelete(sale._id)}
                                        >Eliminar</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: "center" }}>No hay ventas registradas.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Sales;
