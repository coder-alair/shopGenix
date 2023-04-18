import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {ToastContainer,toast} from 'react-toastify';

const Order = () => {
    const currentUser = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;
    const [cartData, setCartData] = useState([]);
    let total = 0;
    const prices = [];
    cartData.map(i => prices.push(parseInt(i.product[0].price * i.quantity)));
    for (var i = 0; i < prices.length; i++) {
        total += prices[i];
    }
    const deliveryCharges = total > 1000 ? "Free Delivery" : (total >= 599 ? 100 : 50);
    const totalAmount = deliveryCharges == "Free Delivery" ? total : total + deliveryCharges;

    useEffect(() => {
        async function getData() {
            const a = {
                userId: currentUser._id
            }
            const { data: cartData } = await axios.post("https://shopgenix.onrender.com/cart/item", a);
            setCartData(cartData);
        }
        getData();
    }, []);

    const handleSave=async(e)=>{
        e.preventDefault();
        const a={
            deliAddress:e.target.ChangeDeliAddress.value
        }
        const{data:jwttoken}=await axios.put('https://shopgenix.onrender.com/users/'+currentUser._id,a);
        localStorage.removeItem('token');
        localStorage.setItem('token',jwttoken);
       window.location.href="/orders";
    }
    

    const handleSubmit = async() => {
        async function orderplace(product) {
            const a = {
                userId: currentUser._id,
                username: currentUser.username,
                address: currentUser.deliAddress,
                totalAmount: totalAmount,
                price: product.product[0].price,
                image: product.product[0].image,
                productId: product.product[0].productId,
                productName: product.product[0].productName,
                rating: product.product[0].rating,
                details: product.product[0].details,
                colors: product.product[0].colors,
                stock: product.product[0].stock,
                reviews: product.product[0].reviews,
                storeName: product.product[0].storeName,
                quantity: product.quantity,
                cartId:product._id
            };
            await axios.post("https://shopgenix.onrender.com/order", a);
            const {data:newCart}=await axios.post("https://shopgenix.onrender.com/cart/order", a);
            setCartData(newCart);
            toast.success('Order Placed',
            {
                position: toast.POSITION.TOP_CENTER
            }
        );
            setTimeout(()=>{
                window.location.href="/myOrders";
            },1000);
        }
        cartData.map(i => orderplace(i));

        }
        
    


    return (
        <div className='mt-5'>
            <div className="container border m-2 ">
                <div className="mt-5 text-center fs-4">Your Products</div>
                {cartData.map(i =>
                    <div className="container m-3" key={i._id}>
                        <div>
                            <div className="row mt-3"><div className="col-3"><img className="border" src={"/products/" + i.product[0].image + ".jpeg"} style={{ height: "100px", width: "100px" }} /><p>{i.product[0].productName}</p></div>
                                <div className="col-3">
                                    <p className="m-4">Quantity</p>
                                    <span className="m-5">{i.quantity}</span>
                                </div>
                                <div className="col-2">
                                    <p></p>
                                </div>
                                <div className="col-2 m-4">
                                    <p>Price</p>
                                    <p>{i.product[0].price * i.quantity}</p>
                                </div>
                            </div>


                        </div>


                    </div>
                )}
            </div>
            <div className='mt-3 m-2 container border'>
                <p className='fs-4'>Your Delivery Address </p>
                <div className="row"><div className="col-10 mb-4">{currentUser.deliAddress} </div><div className="col"><button className="btn btn-primary zoom btn-sm justify-content-end m-3"  data-bs-toggle="modal" data-bs-target="#ChangeAddressModal">Change Address</button></div>
                </div>
            </div>

            <div className='mt-3 m-2 container border'>
                <p className='fs-4'>Price Details </p>
                <div className="row"><div className="col-10 mb-4">Total Price ( {cartData.length} items )</div><div className="col">{total} /-</div></div>
                <div className="row"><div className="col-10 mb-4">Delivery Charges </div><div className="col">{deliveryCharges == "Free Delivery" ? <span className='text-success'>Free Delivery</span> : deliveryCharges + " /-"}</div></div>
                <div className="row"><div className="col mb-4 w-100 border-bottom"></div></div>
                <div className="row"><div className="col-10 mb-4">Total Amount </div><div className="col">{deliveryCharges == "Free Delivery" ? totalAmount + " /-" : totalAmount + " /-"}</div></div>
            </div>

            <div className="container mt-4">
                <div className="fs-4 text-center">
                    <button className="btn btn-warning zoom" onClick={()=>handleSubmit()}>Place Order</button>
                </div>
            </div>
            <ToastContainer/>


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

export default Order;