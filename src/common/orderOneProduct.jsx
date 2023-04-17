import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const OrderOne = () => {
    const currentUser = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;
    const [product, setProduct] = useState([]);
    const wallet = currentUser.wallet;
    const Location = useLocation();
    const productId = Location.state;

    let total = product.price;
    const deliveryCharges = total > 1000 ? "Free Delivery" : (total >= 599 ? 100 : 50);
    const totalAmount = deliveryCharges == "Free Delivery" ? total : total + deliveryCharges;

    useEffect(() => {
        async function getData() {
            const id = { id: productId };
            const { data: productDetails } = await axios.post('http://localhost:3001/order/product/', id);
            setProduct(productDetails);
        }
        getData();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        const a = {
            deliAddress: e.target.ChangeDeliAddress.value
        }
        const { data: jwttoken } = await axios.put('http://localhost:3001/users/' + currentUser._id, a);
        localStorage.removeItem('token');
        localStorage.setItem('token', jwttoken);
        window.location.href = "/order/" + product._id;
    }

    const handleSubmit = async () => {
        async function orderplace() {
            const productId = product._id;
            const a = {
                userId: currentUser._id,
                username: currentUser.username,
                address: currentUser.deliAddress,
                totalAmount: totalAmount,
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
                quantity: 1,
            };
            await axios.post("http://localhost:3001/order", a);
            const walletUpdated = {wallet:wallet - product.price};
            const {data:jwttoken}=await axios.put("http://localhost:3001/updateWallet/" + currentUser._id, walletUpdated);
            localStorage.removeItem('token');
            localStorage.setItem('token', jwttoken);
            toast.success('Order Placed',
                {
                    position: toast.POSITION.TOP_CENTER
                }
            );
            setTimeout(() => {
                window.location.href = "/myOrders/";
            }, 1000);


        }
        orderplace();

    }


   


    return (
        <div>
            <div className="container border">
                <div className="mt-5 text-center fs-4">Your Products</div>
                {product && (
                    <div className="container m-5" key={product._id}>
                        <div>
                            <div className="row mt-3"><div className="col-3"><img className="border" src={"/products/" + product.image + ".jpeg"} style={{ height: "100px", width: "100px" }} /><p>{product.productName}</p></div>
                                <div className="col-3">
                                    <p className="m-2">Quantity</p>
                                    <span className="m-4">{1}</span>
                                </div>
                                <div className="col-4">
                                    <p></p>
                                </div>
                                <div className="col-2">
                                    <p>Price</p>
                                    <p>{product.price}</p>
                                </div>
                            </div>


                        </div>


                    </div>
                )}
            </div>
            <div className='mt-5 container border'>
                <p className='fs-4'>Your Delivery Address </p>
                <div className="row"><div className="col-10 mb-4">{currentUser.deliAddress} </div><div className="col"><button className="btn btn-primary zoom btn-sm justify-content-end" data-bs-toggle="modal" data-bs-target="#ChangeAddressModal">Change Address</button></div>
                </div>
            </div>

            <div className='mt-5 container border'>
                <p className='fs-4'>Price Details </p>
                <div className="row"><div className="col-10 mb-4">Total Price ( {product.length} items )</div><div className="col">{total} /-</div></div>
                <div className="row"><div className="col-10 mb-4">Delivery Charges </div><div className="col">{deliveryCharges == "Free Delivery" ? <span className='text-success'>Free Delivery</span> : deliveryCharges + " /-"}</div></div>
                <div className="row"><div className="col mb-4 w-100 border-bottom"></div></div>
                <div className="row"><div className="col-10 mb-4">Total Amount </div><div className="col">{deliveryCharges == "Free Delivery" ? totalAmount + " /-" : totalAmount + " /-"}</div></div>
            </div>

            <div className="container m-5">
                <div className="fs-4 text-center">
                    <button className="btn btn-warning zoom" onClick={() => handleSubmit()}>Place Order</button>
                </div>
            </div>
            <ToastContainer />

            <div className="modal fade" id="ChangeAddressModal" tabIndex="-1" aria-labelledby="ChangeAddressModalLabel" aria-hidden="true" style={{}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ChangeAddressModalLabel"><img className="m-2 zoom" src="/logo.jpeg" width="35px" height="35px" />Welcome To Shop Genix, </h1>
                            <button type="button" className="btn-close zoom" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSave}>
                                <div className="mb-3">
                                    <label htmlFor="ChangeDeliAddress" className="form-label">Address</label>
                                    <input type="text" className="form-control" name="ChangeDeliAddress" id="ChangeDeliAddress" />
                                </div>
                                <button type="submit" className="btn btn-primary zoom">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default OrderOne;