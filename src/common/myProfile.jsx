import React,{useEffect,useState} from 'react';
import UpdateUserDetails from './updateUserDetails';
import jwtDecode from 'jwt-decode';
const MyProfile = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
      const getToken = localStorage.getItem('token');
      if (!getToken) return setUser(null);
      if (getToken) {
        const user = jwtDecode(getToken);
        setUser(user);
      }
    }, []);

    return ( 
        
        <div>
            {user &&(
                <React.Fragment>
            <h3>Hi, {user.username}</h3>
              <p>We are So Lucky having The customers like you.</p>
              <p>Your Username : {user.username}</p>
              <p>Your Mobile Number : {user.mobileNum}</p>
              <p>Your Email ID : {user.email}</p>
              <p>Current Address : {user.deliAddress}</p>
              <p>Wallet Balance : {user.wallet}</p>
              <p>Your Role : {user.isAdmin?"Admin":"User"}</p>
              <div className="modal-footer">
        <button className="btn btn-primary zoom" data-bs-target="#UpdateModal" data-bs-toggle="modal">Edit</button>
      </div>
              </React.Fragment>
              )}
        </div>
      
     );
}
 
export default MyProfile;

