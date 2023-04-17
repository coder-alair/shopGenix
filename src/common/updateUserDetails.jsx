
import axios from 'axios';
import React from 'react';

const UpdateUserDetails = ({user}) => {

const handleSubmit=async(e)=>{
    e.preventDefault();
    const a={};
    a.updateUsername=e.target.UpdateUsername.value;
    a.updatePassword=e.target.UpdatePassword.value;
    a.updateMobilenum=e.target.UpdateMobileNum.value;
    const{data:jwttoken}=await axios.put('https://shopgenix.onrender.com/users/'+user._id,a);
    localStorage.removeItem('token');
    localStorage.setItem('token',jwttoken);
    window.location.href="/";
    
    console.log("Updated..");

}



    return ( 

        <React.Fragment>{user &&(
<form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="UpdateUsername" className="form-label">Username</label>
            <input type="text" className="form-control" name="UpdateUsername" id="UpdateUsername" placeholder={user.username}/>
        </div>
        <div className="mb-3">
            <label htmlFor="UpdateMobileNum" className="form-label">Mobile Number</label>
            <input type="Number" className="form-control" name="UpdateMobileNum" id="UpdateMobileNum" placeholder={user.mobileNum}/>
        </div>
        <div className="mb-3">
            <label htmlFor="UpdatePassword" className="form-label">New Password</label>
            <input type="password" className="form-control" name="UpdatePassword" id="UpdatePassword" />
        </div>

        <div className="modal-footer">

        <button type="submit" className="btn btn-primary zoom" data-bs-dismiss="modal">Update</button>
        <button type="reset" className="btn btn-secondary zoom" data-bs-dismiss="modal">Cancel</button>
      </div>
       
       
     
    </form>


)}
        </React.Fragment>


     );
}
 
export default UpdateUserDetails;