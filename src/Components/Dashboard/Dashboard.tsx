import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom';

interface Product {
    _id: string;
    descriptionName: string;
    category: string;
    price: number;
    priceBusiness: number;
    priceVAT: number;
    priceVATBusiness: number;
}

const Dashboard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get<Product[]>('http://localhost:3001/products');
            setProducts(response.data);
        }
        fetchData();
    }, []);

    const handleDelete = async (_id: string) => {
        try {
            const deleteProduct = await axios.delete(`http://localhost:3001/products/${_id}`);
            // Remove the deleted product from the state
            setProducts(products.filter(product => product._id !== _id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <table className={styles.dashboardTable} >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Precio mayorista</th>
                    <th>Precio + IVA</th>
                    <th>Precio mayorista + IVA</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.descriptionName}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>{product.priceBusiness}</td>
                        <td>{product.priceVAT}</td>
                        <td>{product.priceVATBusiness}</td>
                        <td>
                            <button onClick={() => { handleDelete(product._id) }}>Eliminar producto</button>
                        </td>
                        <td><button>Modificar producto</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Dashboard;