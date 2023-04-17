import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const user = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;

    useEffect(() => {
        async function getOrders() {
            const { data: orders } = await axios.get("http://localhost:3001/order/" + user._id);
            setOrders(orders);
        }
        getOrders();
    }, []);

    const delOrder = async (product) => {
        await axios.delete("http://localhost:3001/order/" + product._id);
        // const walletUpdate = {
        //     wallet: parseInt(user.wallet + product.price)
        // }
        // const { data: jwttoken } = await axios.put("http://localhost:3001/updateWallet/" + user._id, walletUpdate);
        // localStorage.removeItem('token');
        // localStorage.setItem('token', jwttoken);
        window.location.reload(false);
    }
    return (
        <div>
            {orders.length > 0 ?
                <div>
                    <table className="table m-5">
                        <thead><tr>
                            <th scope="col"></th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product ID</th>

                            <th scope="col">Delivery Address</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Quantity</th>
                            <th></th>

                        </tr>
                        </thead>

                        <tbody >
                            {orders.map(i =>
                                <tr key={i._id} className="m-3">
                                    <td><img className="border" src={"/products/" + i.product[0].image + ".jpeg"} style={{ height: "100px", width: "100px" }} /></td>
                                    <td className="m-3">{i.product[0].productName}</td>
                                    <td className="mt-3">{i.product[0].productId}</td>

                                    <td className="mt-3">{i.address}</td>
                                    <td className="mt-3">{i.totalAmount}</td>
                                    <td className="mt-3">{i.quantity}</td>

                                    <td><button className="btn btn-danger btn-sm mt-2 zoom" onClick={() => delOrder(i)}>Cancel Order</button></td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                :
                <div className="fs-3 m-5">No Orders Currently</div>
            }

        </div>
    );
}

export default MyOrders;