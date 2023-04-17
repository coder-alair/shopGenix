import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './footer';
const ProductPage = () => {
    const [productsData, setProductsData] = useState([]);
    useEffect(() => {
        async function getData() {
            const { data: productData } = await axios.get('http://localhost:3001/products');
            setProductsData(productData);
        }
        getData();
    }, []);

    const [option, setOption] = useState('');
    const handleOptions = (e) => {
        e.preventDefault();
        const a = e.target.name;
        setOption(a);
    }
    const user=localStorage.getItem('token')?jwtDecode(localStorage.getItem('token')):null;
    const getAllData = productsData;
    const filteredData = option ? getAllData.filter(i => i.details === option) : productsData;
    const filterData = option == "AllProducts" ? productsData : filteredData;

    return (


        <div>

            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
                <div className="container-fluid ">
                    <div className="card text-center" style={{ border: "none" }} onClick={handleOptions}>
                        <button className="navbar-brand rounded-circle m-auto zoom"><img src="/icons/AllProducts.png" width="70px" height="70px" name="AllProducts" /></button>
                        <div className="card-body">All Products</div>
                    </div>
                    <div className="card text-center" style={{ border: "none" }} onClick={handleOptions}>
                        <button className="navbar-brand rounded-circle m-auto zoom"><img src="/icons/Appliances.png" width="70px" height="70px" name="Appliances" /></button>
                        <div className="card-body">Appliances</div>
                    </div>
                    <div className="card text-center" style={{ border: "none" }} onClick={handleOptions}>
                        <button className="navbar-brand rounded-circle m-auto zoom"><img src="/icons/Smartphones.png" width="70px" height="70px" name="Smartphone" /></button>
                        <div className="card-body">Smartphone</div>
                    </div>
                    <div className="card text-center" style={{ border: "none" }} onClick={handleOptions}>
                        <button className="navbar-brand rounded-circle m-auto zoom"><img src="/icons/Clothes.png" width="70px" height="70px" name="Clothing" /></button>
                        <div className="card-body">Clothing</div>
                    </div>
                    <div className="card text-center" style={{ border: "none" }} onClick={handleOptions}>
                        <button className="navbar-brand rounded-circle m-auto zoom"><img src="/icons/Headphones.png" width="70px" height="70px" name="Headphones" /></button>
                        <div className="card-body">Headphones</div>
                    </div>
                    <div className="card text-center" style={{ border: "none" }} onClick={handleOptions}>
                        <button className="navbar-brand rounded-circle m-auto zoom"><img src="/icons/Footwears.png" width="70px" height="70px" name="Footwear" /></button>
                        <div className="card-body">Footwear</div>
                    </div>
                    <div className="card text-center" style={{ border: "none" }} onClick={handleOptions}>
                        <button className="navbar-brand rounded-circle m-auto zoom"><img src="/icons/Watches.png" width="70px" height="70px" name="Watches" /></button>
                        <div className="card-body">Watches</div>
                    </div>
                    <div className="card text-center" style={{ border: "none" }} onClick={handleOptions}>
                        <button className="navbar-brand rounded-circle m-auto zoom"><img src="/icons/Groomings.png" width="70px" height="70px" name="Grooming" /></button>
                        <div className="card-body">Grooming</div>
                    </div>
                    <div className="card text-center" style={{ border: "none" }} onClick={handleOptions}>
                        <button className="navbar-brand rounded-circle m-auto zoom"><img src="/icons/Foods.png" width="70px" height="70px" name="Food" /></button>
                        <div className="card-body">Food</div>
                    </div>


                </div>
            </nav>


            <div className="row row-cols-1 row-cols-md-3 g-4 m-5 justify-content-center">

                {filterData.map(product =>
                    <div className="col" key={product._id}>
                        <div className="card h-100 zoom"  style={{width:"300px"}}>
                            <div className="card-body">
                            <center><img src={"/products/"+product.image+".jpeg"} className="card-img-top" alt="..." style={{width:"200px",height:"200px"}}/></center>
                           
                                <h5 className="card-title">{product.productName}</h5>
                                <p className="card-text">From : {product.storeName}</p>
                                <p className="card-text">Ratings : {product.rating}</p>
                                <p className="card-text">Price : {product.price}</p>
                              
                                <Link className="btn btn-primary" to={"/products/" + product._id} state={user}>Buy This Product</Link>
                             
                            </div>
                        </div>
                    </div>
                )}





            </div>
<Footer />
        </div>


    );
}

export default ProductPage;