import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = {};
    a.loginEmail = e.target.LoginEmail.value;
    a.loginPassword = e.target.LoginPassword.value;
    const { data: jwttoken } = await axios.post('https://shopgenix.onrender.com/login', a);
    localStorage.setItem('token', jwttoken);
    toast.success("Login Successful",
      {
        position: toast.POSITION.TOP_CENTER
      });

    const getToken = localStorage.getItem('token');
    const user = jwtDecode(getToken);

    if (user.isAdmin == true) {
      setTimeout(() => {
        window.location.href = "/adminPanel";
      }, 1000);
    } else {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }

  }

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="LoginEmail" className="form-label">Email address</label>
          <input type="email" className="form-control" id="LoginEmail" name="LoginEmail" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="LoginPassword" className="form-label">Password</label>
          <input type="password" className="form-control" name="LoginPassword" id="LoginPassword" />
        </div>

        <button type="submit" className="btn btn-primary zoom">Login</button><ToastContainer />
      </form><br />
    </div>
  );
}

export default Login;

