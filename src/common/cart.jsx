import axios from 'axios';
import React from 'react';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Cart = () => {
    const currentUser = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        async function getData() {
            const a = {
                userId: currentUser._id
            }
            const { data: cartData } = await axios.post("http://localhost:3001/cart/item", a);
            setCartData(cartData);
        }
        getData();
    }, []);

    const handleIncre = async (i) => {
        const item = { quantity: i.quantity + 1 };
        await axios.put('http://localhost:3001/cart/' + i._id, item);
        window.location.href = "/cart";
    }

    const handleDecre = async (i) => {
        const item = { quantity: i.quantity - 1 };
        await axios.put('http://localhost:3001/cart/' + i._id, item);
        window.location.href = "/cart";
    }

    const handleDelete = async (i) => {
        await axios.delete('http://localhost:3001/cart/' + i._id);
        window.location.href = "/cart";
    }


    let total = 0;
    const prices = [];
    cartData.map(i => prices.push(parseInt(i.product[0].price * i.quantity)));
    for (var i = 0; i < prices.length; i++) {
        total += prices[i];
    }



    return (

        <React.Fragment>
            <div>
                {cartData.length > "0" && (
                    <p className="fs-4 mt-3 m-5">Cart :</p>
                )}
                {cartData.map(i =>
                    <div className="container border m-5" key={i._id}>
                        <div>
                            <div className="row mt-3"><div className="col-3"><img className="border" src={"/products/" + i.product[0].image + ".jpeg"} style={{ height: "100px", width: "100px" }} /><p>{i.product[0].productName}</p></div>
                                <div className="col-3">
                                    <p className="m-2">Quantity</p>
                                    {i.quantity != "1" ? (<button className="btn btn-primary btn-sm" onClick={() => handleDecre(i)}>-</button>) : (<button className="btn btn-primary btn-sm disabled" onClick={() => handleDecre(i)}>-</button>)} <span className="m-2">{i.quantity}</span>  <button className="btn btn-primary btn-sm" onClick={() => handleIncre(i)}>+</button>
                                </div>
                                <div className="col-4">
                                    <p></p>
                                    <p><button className="btn btn-danger mt-4" onClick={() => handleDelete(i)}>Remove</button></p>
                                </div>
                                <div className="col-2">
                                    <p>Price</p>
                                    <p>{i.product[0].price * i.quantity}</p>
                                </div>
                            </div>


                        </div>


                    </div>
                )}

                {cartData.length == "0" && (
                    <div className="container m-5" key={i._id}>
                        <div>
                            <p className="fs-3"> No Products in Cart</p>
                        </div>
                    </div>
                )}
                {cartData.length > "0" && (
                    <div className="container border m-5">
                        <div className="d-flex justify-content-end">
                            <div className="fs-4">Total :
                                {total}

                            </div>

                        </div>


                    </div>
                )}

                {cartData.length > "0" && (
                    <div className="container m-5">
                            <div className="fs-4 text-center">
                            <Link className="btn btn-warning zoom" to="/orders">Proceed to Checkout -&gt;</Link>
                            </div>
                    </div>
                )}


            </div>
        </React.Fragment>

    );
}

export default Cart;