import React,{useState,useEffect} from 'react';
import axios from 'axios';

const AdminDash = ({user}) => {
    const [products,setProducts]=useState([]);
    const [users,setUsers]=useState([]);
    const [order,setOrders]=useState([]);
    useEffect(()=>{
      async function getProducts(){
        const {data:allproducts}=await axios.get("http://localhost:3001/products");
        setProducts(allproducts);
     }
     getProducts();
     async function getUsers(){
        const {data:allusers}=await axios.get("http://localhost:3001/users");
        const filteredAdmin=allusers.filter(i=>i.isAdmin!=user.isAdmin);
        setUsers(filteredAdmin);
     }
     getUsers();
     async function getOrders(){
        const {data:allOrders}=await axios.get("http://localhost:3001/order");
        setOrders(allOrders);
     }
     getOrders();
    },[]);

    return (
        <div>
            <h3 className="mt-4">Admin Dashboard</h3>
            <div>
                <div className="row">
                    <div className="col-4 mt-5">
                        <div>
                            <div className="card" style={{width: "18rem"}}>
                                <img src="/assets/adminUserIcon.jpeg" className="card-img-top" alt="..."/>
                                    <div className="card-body text-center">
                                        <p className="card-text fs-3">Total Users</p>
                                        <p className="card-text fs-1">{users.length}</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 mt-5">
                        <div>
                        <div className="card" style={{width: "18rem"}}>
                                <img src="/assets/adminProductIcon.jpeg" className="card-img-top" alt="..."/>
                                    <div className="card-body text-center">
                                        <p className="card-text fs-3">Total Products</p>
                                        <p className="card-text fs-1">{products.length}</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 mt-5">
                        <div>
                        <div className="card" style={{width: "18rem"}}>
                                <img src="/assets/adminOrder.png" className="card-img-top" alt="..."/>
                                    <div className="card-body text-center">
                                        <p className="card-text fs-3">Pending Orders</p>
                                        <p className="card-text fs-1">{order.length}</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default AdminDash;