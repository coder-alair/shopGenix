import React from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Carousel from "./carousel";
import Assets from "./assets";
import Coupons from "./coupons";
import Products from "./products";
import Footer from "./footer";
import FooterAbout from "./footerAbout";
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';


const Home = () => {
    const currentUser = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;
    return (
        <div>
            {currentUser && (
                (() => {
                    toast("Welcome to Shop Genix , " + currentUser.username,
                    {
                        position: toast.POSITION.TOP_CENTER
                    });
                })()
            )}
            
             <ToastContainer />
            <Carousel />
            <Assets />
            <Coupons />
            <h2 className="text-center mt-5">FEATURED PRODUCTS</h2>
            <Products user={currentUser} />
            <center ><Link className="btn btn-primary zoom" to="/products" state={currentUser}>See More...</Link></center>
            <Footer />
            <FooterAbout />
           

        </div>


    );
}

export default Home;