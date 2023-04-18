import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
const Orders = ({ user }) => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        async function getOrders() {
            const { data: orders } = await axios.get("https://shopgenix.onrender.com/order");
            setOrders(orders);
        }
        getOrders();
    }, []);

    const delOrder = async (product) => {
        await axios.delete("https://shopgenix.onrender.com/order/" + product._id);
        window.location.reload(false);
    }

    return (
        <div>
            {orders.length > 0 ?
                <div className="row cols-md-4">
                    <table className="table mt-1">
                        <thead><tr>
                            <th scope="col"></th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product ID</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Delivery Address</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Status</th>

                        </tr>
                        </thead>

                        <tbody>
                            {orders.map(i =>
                                <tr key={i._id}>
                                    <td><img className="border" src={"/products/" + i.product[0].image + ".jpeg"} style={{ height: "50px", width: "50px" }} /></td>
                                    <td>{i.product[0].productName}</td>
                                    <td>{i.product[0].productId}</td>
                                    <td>{i.username}</td>
                                    <td>{i.address}</td>
                                    <td>{i.totalAmount}</td>
                                    <td>{i.quantity}</td>
                                    <td>Pending</td>
                                    <td><button className="btn btn-danger btn-sm" onClick={() => delOrder(i)}>Delivered</button></td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                :
                <div className="fs-4 mt-5">No Orders Currently</div>
            }

        </div>
    );
}

export default Orders;