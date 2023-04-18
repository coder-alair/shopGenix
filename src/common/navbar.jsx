import React from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Login from './login';
import logout from './logout';
import SignUp from './signup';
import { useEffect, useState } from 'react';
import MyProfile from './myProfile';
import UpdateUserDetails from './updateUserDetails';
const Navbar = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getToken = localStorage.getItem('token');
    if (!getToken) return setUser(null);
    if (getToken) {
      const user = jwtDecode(getToken);
      setUser(user);
    }
  }, []);


  return (<div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top m-1">
      <div className="container-fluid">
        <Link className="navbar-brand zoom" to={user?user.isAdmin==false?"/":"/adminPanel":"/"}><img src="/logo.jpeg" width="35px" height="35px" /></Link>
        <button className="navbar-toggler" style={{height:"40px",width:"40px",border:"none"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{height:"30px",width:"20px",border:"none"}} ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <center>
          <ul className="navbar-nav">
            {user && (
              <React.Fragment>
                {user.isAdmin == false ? (
                  <React.Fragment>
                  
                    <li className="nav-item zoom">
                      <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item zoom">
                      <Link className="nav-link" to="/products">Products</Link>
                    </li>
                    <li className="nav-item zoom">
                      <a className="nav-link" data-bs-toggle="modal" data-bs-target="#MyProfile">{user.username}</a>
                    </li>
                    <li className="nav-item zoom">
                      <Link className="nav-link" to="/cart" state={user}>Cart</Link>
                    </li>
                    <li className="nav-item zoom">
                      <Link className="nav-link" to="/myOrders" state={user}>My Orders</Link>
                    </li>
                    <li className="nav-item zoom">
                      <a className="nav-link" onClick={logout}>Logout</a>
                    </li>
                 </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li className="nav-item zoom">
                      <Link className="nav-link" to="/adminPanel">Admin Panel</Link>
                    </li>
                    <li className="nav-item zoom">
                      <a className="nav-link" data-bs-toggle="modal" data-bs-target="#MyProfile">{user.username}</a>
                    </li>
                    <li className="nav-item zoom">
                      <a className="nav-link" onClick={logout}>Logout</a>
                    </li>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}

{!user && (
              <React.Fragment>
                <li className="nav-item zoom">
                      <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item zoom">
                      <Link className="nav-link" to="/products">Products</Link>
                    </li>
                <li className="nav-item zoom">
                  <a className="nav-link" data-bs-toggle="modal" data-bs-target="#SignupModal">Sign Up</a>
                </li>
                <li className="nav-item zoom">
                  <a className="nav-link" data-bs-toggle="modal" data-bs-target="#LoginModal">Login</a>
                </li>
              </React.Fragment>
            )}







        
          </ul></center>
        </div>
      </div>



    </nav>

    <div className="modal fade" id="LoginModal" tabIndex="1" aria-labelledby="LoginModalLabel" aria-hidden="true" style={{}}>
      <div className="modal-dialog" >
        <div className="modal-content" >
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="LoginModalLabel" ><img className="m-2 zoom" src="/logo.jpeg" width="35px" height="35px" />
              Welcome To Shop Genix,</h1>
            <button type="button" className="btn-close zoom" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Login />
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade" id="SignupModal" tabIndex="-1" aria-labelledby="SignupModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="SignupModalLabel"><img className="m-2 zoom" src="/logo.jpeg" width="35px" height="35px" />Welcome To Shop Genix, </h1>
            <button type="button" className="btn-close zoom" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <SignUp />
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade" id="MyProfile" tabIndex="1" aria-labelledby="MyProfileLabel" aria-hidden="true" style={{}}>
      <div className="modal-dialog" >
        <div className="modal-content" >
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="MyProfileLabel" ><img className="m-2 zoom" src="/logo.jpeg" width="35px" height="35px" />
              Welcome To Shop Genix,</h1>
            <button type="button" className="btn-close zoom" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

            <MyProfile />

          </div>
        </div>
      </div>
    </div>

    <div className="modal fade" id="UpdateModal" tabIndex="-1" aria-labelledby="UpdateModalLabel" aria-hidden="true" style={{}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="UpdateModalLabel"><img className="m-2 zoom" src="/logo.jpeg" width="35px" height="35px" />Welcome To Shop Genix, </h1>
            <button type="button" className="btn-close zoom" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <UpdateUserDetails user={user} />
          </div>
        </div>
      </div>
    </div>


  </div>

  );
}

export default Navbar;