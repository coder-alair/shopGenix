import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const user = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;

    useEffect(() => {
        async function getOrders() {
            const { data: orders } = await axios.get("https://shopgenix.onrender.com/order/" + user._id);
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

<center>
            <div className="row cols-md-4 g-4 m-5">

                {orders.map(i =>
                    <div className="col" key={i._id}>
                        <div className="card h-100 zoom" style={{width:"300px"}}>
                            <div className="card-body">
                            <center><img src={"/products/"+i.product[0].image+".jpeg"} className="card-img-top" alt="..." style={{width:"200px",height:"200px"}} /></center>
                           
                                <h5 className="card-title">{i.product[0].productName}</h5>
                                <p className="card-text">Product ID : {i.product[0].productId}</p>
                                <p className="card-text">Delivery Address : {i.address}</p>
                                <p className="card-text">Price : {i.totalAmount}</p>
                                <p className="card-text">Quantity : {i.quantity}</p>
                                <button className="btn btn-danger btn-sm mt-2 zoom" onClick={() => delOrder(i)}>Cancel Order</button>

                             </div>
                        </div>
                    </div>
                )}




            </div>
            </center>

                :

                <div className="fs-3 m-5">No Orders Currently</div>
            }

        </div>
    );
}

export default MyOrders;