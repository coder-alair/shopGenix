import axios from 'axios';
import React from 'react';
import Footer from './footer';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';

const ProductDetailPage = () => {
    const location = useLocation();
    const currentUser = location.state;
    const [product, setProduct] = useState({});

    const discount = Math.floor(Math.random() * 100);
    useEffect(() => {
        async function getData() {
            const { data: productDetails } = await axios.get('https://shopgenix.onrender.com/products/' + (window.location.href).slice(31));
            setProduct(productDetails);
        }
        getData();
    }, []);

    const handleCart = async (e) => {
        e.preventDefault();
        const a = {
            userId: currentUser._id,
            price: product.price,
            image: product.image,
            productId: product.productId,
            productName: product.productName,
            rating: product.rating,
            details: product.details,
            colors: product.colors,
            stock: product.stock,
            reviews: product.reviews,
            storeName: product.storeName,
            quantity:1
        };
        await axios.post("https://shopgenix.onrender.com/cart", a);
        toast.success('Product Added to Cart',
            {
                position: toast.POSITION.TOP_CENTER
            }
        );
    }

    return (
        <div>
            <div className="m-5">
                <h3 className="mb-5">{product.productName}</h3>
                <div className="text-center">
                    <img src={"/products/" + product.image + ".jpeg"} className="img-fluid text-center zoom m-3" alt="..." />
                </div>
                <div>
                    <h3 className="mt-5 ml-5 fs-1">{product.productName}</h3>
                    <div className="row align-items-center">
                        <div className="col">
                            <p>Product ID : {product.productId} </p>
                            <p>{product.rating} Star Ratings</p>
                            <p className="fs-2">MRP : {product.price} <small className="text-decoration-line-through">{(product.price + (product.price * discount) / 100).toFixed(0)}</small> <small className="text-success">Discount {discount} % off</small></p>
                            <p>+ 49/- Delivery Charges.</p>
                        </div>
                        <div className="col border">
                            <b>Available Offers : </b>
                            <dd className="mt-3">Bank Offer Flat <span className="text-success">₹100</span> Instant Cashback on Paytm Wallet. Min Order Value <span className="text-success">₹1000</span>. Valid once per Paytm account</dd>
                            <dd>Bank Offer Get <span className="text-success">10%</span> Cashback on Samsung Axis bank Credit Card</dd>
                            <dd>Bank Offer <span className="text-success">5% </span>Cashback on Flipkart Axis Bank Card</dd>
                            <dd>Special Price Get extra <span className="text-success">₹2500</span> off (price inclusive of cashback/coupon)</dd>
                        </div>
                    </div>

                    <div className="container fluid border mt-5">
                        <h3 className="mt-3 mb-3">Specifications :</h3>
                        <p>Colour : {product.colors}</p>
                        <p>Manufactured By : {product.storeName}</p>
                        <p>Details : {product.details}</p>
                        <p>Availability : {product.stock > 0 ? "Available" : "Not Available"}</p>
                    </div>

                    {product.stock > 0 && (
                        <React.Fragment>
                            {currentUser && (
                                <div className="text-center">

                                    <Link className="btn btn-primary m-5 zoom text-center" style={{ backgroundColor: "orange", border: "none" }} state={product._id} to={"/order/"+product._id}>Buy Now</Link>
                                    <Link className="btn btn-primary m-5 zoom  text-center" style={{ backgroundColor: "grey", border: "none" }} to="/cart" state={product} onClick={handleCart}>Add to Cart</Link><ToastContainer/>

                                </div>)}
                                {!currentUser && (
                                <div className="text-center">
                               <p className="text-danger mt-5 fs-2">Sigup or Login to Buy this Product</p >
                                </div>)}


                        </React.Fragment>
                    )}
                    {!product.stock > 0 && (
                        <React.Fragment>
                            
                                <div className="text-center">
                               <p className="text-danger mt-5 fs-2">Sorry This Product is Not Available Right Now</p >
                                </div>


                        </React.Fragment>
                    )}
                    <div className="container fluid border mt-5">
                        <p className="mt-3 mb-3">Reviews : {product.reviews}</p>
                    </div>


                </div>





            </div>
            <Footer />
        </div>
    );
}

export default ProductDetailPage;