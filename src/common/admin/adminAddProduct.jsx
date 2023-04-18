import React from 'react';
import axios from 'axios';
const AdminAddProduct = ({user}) => {
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const a={};
        a.price=e.target.AddPrice.value;
        a.image=e.target.AddImage.value;
        a.productId=e.target.AddProductId.value;
        a.productName=e.target.AddProductName.value;
        a.rating=e.target.AddRating.value;
        a.details=e.target.AddDetails.value;
        a.description=e.target.AddDescription.value;
        a.colors=e.target.AddColors.value;
        a.stock=e.target.AddStock.value;
        a.reviews=e.target.AddReviews.value;
        a.storeName=e.target.AddStoreName.value;
       
        await axios.post('https://shopgenix.onrender.com/products',a);
        window.location.href="/adminPanel";
    }
    
    return ( 
        <div>
            <p className="mt-5 mb-3 fs-3">Add Product </p>
<form onSubmit={handleSubmit}>
    <div className="row cols-md-4 m-3">
        <div className="mb-3 col-12">
            <label htmlFor="AddProductName" className="form-label mt-3">Product Name</label>
            <input type="text" className="form-control w-100" name="AddProductName" id="AddProductName" />
        </div>
        <div className="mb-3 col-12" >
            <label htmlFor="AddProductId" className="form-label">Product ID</label>
            <input type="Number" className="form-control  w-100" id="AddProductId" name="AddProductId" aria-describedby="productIDhelp" />
        </div>

        
       
        <div className="mb-3 col-12">
            <label htmlFor="AddPrice" className="form-label">Price</label>
            <input type="Number" className="form-control  w-100" name="AddPrice" id="AddPrice" />
        </div>
        <div className="mb-3 col-12">
            <label htmlFor="AddStock" className="form-label">Stock</label>
            <input type="Number" className="form-control  w-100" name="AddStock" id="AddStock" />
        </div>



        <div className="mb-3 col-12">
            <label htmlFor="AddStoreName" className="form-label">Store Name</label>
            <input type="text" className="form-control  w-100" name="AddStoreName" id="AddStoreName" />
        </div>
        <div className="mb-3 col-12">
            <label htmlFor="AddDetails" className="form-label">Category Details</label>
            <input type="text" className="form-control  w-100" name="AddDetails" id="AddDetails" />
        </div>



        <div className="mb-3 col-12">
            <label htmlFor="AddDescription" className="form-label">Description</label>
            <input type="text" className="form-control  w-100" name="AddDescription" id="AddDescription" />
        </div>
        <div className="mb-3 col-12">
            <label htmlFor="AddColors" className="form-label">Color</label>
            <input type="text" className="form-control  w-100" name="AddColors" id="AddColors" />
        </div>



        <div className="mb-3 col-12">
            <label htmlFor="AddRating" className="form-label">Rating</label>
            <input type="text" className="form-control  w-100" name="AddRating" id="AddRating" />
        </div>
        <div className="mb-3 col-12">
            <label htmlFor="AddReviews" className="form-label">Reviews</label>
            <input type="text" className="form-control  w-100" name="AddReviews" id="AddReviews" />
        </div>



        <div className="mb-3 col-12">
            <label htmlFor="AddImage" className="form-label">Image Name</label>
            <input type="text" className="form-control  w-100" name="AddImage" id="AddImage" />
</div></div>

<div className="text-center">
        <button type="submit" className="btn btn-success mt-4 zoom">Add Product</button>
        </div>
    </form>

        </div>
     );
}
 
export default AdminAddProduct;