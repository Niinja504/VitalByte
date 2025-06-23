import React from 'react';
import { useSales } from '../../hooks/pages/useSales';
import '../style/Admin/ProductTable.css';

const Sales = () => {
    useSales();
    return (
        <div>
            <h1>Ventas</h1>
            <p>Consulta y administra las ventas realizadas.</p>
        </div>
    );
};

export default Sales;