import axios from 'axios';
import React,{useState} from 'react';
import { useEffect } from 'react';
const AdminUsers = ({user}) => {
const [users,setUsers]=useState([]);
useEffect(()=>{
  async function getUsers(){
    const {data:allusers}=await axios.get("https://shopgenix.onrender.com/users");
    const filteredAdmin=allusers.filter(i=>i.isAdmin!=user.isAdmin);
    setUsers(filteredAdmin);
 }
 getUsers();
},[]);

const delUser=async(user)=>{
await axios.delete("https://shopgenix.onrender.com/users/"+user._id);
window.location.href="/adminPanel";
}

const handleSubmit=async(e)=>{
    e.preventDefault();
    const a={};
    a.regUsername=e.target.SignUpUsername.value;
    a.regEmail=e.target.SignUpEmail.value;
    a.regPassword=e.target.SignUpPassword.value;
    a.regMobilenum=e.target.SignUpMobileNum.value;
    a.deliAddress=e.target.DeliAddress.value;
    await axios.post('https://shopgenix.onrender.com/users',a);
    window.location.href="/adminPanel";
}

    return ( 

        <div>

<table className="table m-2">
<thead><tr>
<th scope="col">Username</th>
<th scope="col">Email ID</th>
<th scope="col">Mobile Number</th>
<th scope="col">Password</th>
<th scope="col"></th>
</tr>
</thead>

<tbody>
    {users.map(i=>
<tr key={i._id}>
    <td>{i.regUsername}</td>
    <td>{i.regEmail}</td>
    <td>{i.regMobilenum}</td>
    <td>{i.regPassword}</td>
    <td><button className="btn btn-danger btn-sm" onClick={()=>delUser(i)}>Remove</button></td>
</tr>
)}  


</tbody>

</table>
<h5 className="mt-5 mb-3">Add User </h5>
<form onSubmit={handleSubmit}>
    <div className="row rows-cols-md-4 m-3">
    
        <div className="mb-3 col-12">
            <label htmlFor="SignUpUsername" className="form-label mt-3">Username</label>
            <input type="text" className="form-control " name="SignUpUsername" id="SignUpUsername"/>
        </div>
      
       
           
        <div className="mb-3 col-12" >
            <label htmlFor="SignUpEmail" className="form-label mt-3">Email address</label>
            <input type="email" className="form-control  " id="SignUpEmail" name="SignUpEmail" aria-describedby="emailHelp" />
       </div>
       

        
        
        <div className="mb-3 col-12">
            <label htmlFor="SignUpMobileNum" className="form-label mt-3">Mobile Number</label>
            <input type="Number" className="form-control " name="SignUpMobileNum" id="SignUpMobileNum" />
        </div>
        
       
        <div className="mb-3 col-12">
            <label htmlFor="SignUpPassword" className="form-label mt-3">Password</label>
            <input type="password" className="form-control " name="SignUpPassword" id="SignUpPassword" />
        </div>
        
        <div className="mb-3 col-12">
            <label htmlFor="DeliAddress" className="form-label mt-3">Address</label>
            <input type="text" className="form-control" name="DeliAddress" id="DeliAddress" />
        </div>


        



        
       
        
        
        </div>


<div className="text-center">
        <button type="submit" className="btn btn-success mt-4 zoom">Add User</button>
        </div>
    </form>




        </div>
        
     );
}
 
export default AdminUsers;