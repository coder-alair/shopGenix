import axios from 'axios';
import React from 'react';
import { ToastContainer,toast } from 'react-toastify';

const SignUp = () => {
   
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const a={};
        a.regUsername=e.target.SignUpUsername.value;
        a.regEmail=e.target.SignUpEmail.value;
        a.regPassword=e.target.SignUpPassword.value;
        a.regMobilenum=e.target.SignUpMobileNum.value;
        a.deliAddress=e.target.DeliAddress.value;
        const {data:jwttoken}=await axios.post('https://shopgenix.onrender.com/users',a);
        localStorage.setItem('token',jwttoken);
        toast.success("Registeration Successful",
        {
            position: toast.POSITION.TOP_CENTER
        });
        setTimeout(()=>{
            window.location.href="/";
          },1000)
    }


    return (
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="SignUpUsername" className="form-label">Username</label>
            <input type="text" className="form-control" name="SignUpUsername" id="SignUpUsername" />
        </div>
        <div className="mb-3">
            <label htmlFor="SignUpEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="SignUpEmail" name="SignUpEmail" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="SignUpMobileNum" className="form-label">Mobile Number</label>
            <input type="Number" className="form-control" name="SignUpMobileNum" id="SignUpMobileNum" />
        </div>
        <div className="mb-3">
            <label htmlFor="SignUpPassword" className="form-label">Password</label>
            <input type="password" className="form-control" name="SignUpPassword" id="SignUpPassword" />
        </div>
        <div className="mb-3">
            <label htmlFor="DeliAddress" className="form-label">Address</label>
            <input type="text" className="form-control" name="DeliAddress" id="DeliAddress" />
        </div>

        <button type="submit" className="btn btn-primary zoom">Register</button><ToastContainer/>
    </form>
    );

}

export default SignUp;