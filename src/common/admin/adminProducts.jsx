import axios from 'axios';
import React,{useState} from 'react';
import { useEffect } from 'react';
const AdminProducts = ({user}) => {
const [products,setProducts]=useState([]);
useEffect(()=>{
  async function getProducts(){
    const {data:allproducts}=await axios.get("https://shopgenix.onrender.com/products");
    setProducts(allproducts);
 }
 getProducts();
},[]);

const delProduct=async(product)=>{
await axios.delete("https://shopgenix.onrender.com/products/"+product._id);
window.location.href="/adminPanel";
}

    return ( 

        <div>

<table className="table mt-1">
<thead><tr>
<th scope="col"></th>
<th scope="col">Product Name</th>
<th scope="col">Product ID</th>
<th scope="col">Product Price</th>
<th scope="col">Product Rating</th>
<th scope="col">Store Name</th>
<th scope="col">Stock</th>
<th scope="col"></th>

</tr>
</thead>

<tbody>
    {products.map(i=>
<tr key={i._id}>
    <td><img className="border" src={"/products/" + i.image + ".jpeg"} style={{ height: "50px", width: "50px" }} /></td>
    <td>{i.productName}</td>
    <td>{i.productId}</td>
    <td>{i.price}</td>
    <td>{i.rating}</td>
    <td>{i.storeName}</td>
    <td>{i.stock}</td>
    <td><button className="btn btn-danger btn-sm" onClick={()=>delProduct(i)}>Remove</button></td>
</tr>
)}  
</tbody>
</table>

        </div>
        
     );
}
 
export default AdminProducts;