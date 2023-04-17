import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Products = ({user}) => {
    const [productsData, setProductsData] = useState([]);
    useEffect(() => {
        async function getData() {
            const { data: productData } = await axios.get('http://localhost:3001/products');
            setProductsData(productData);
        }
        getData();
    }, []);

    const slicedList=productsData.slice(6,12);
   

    return (
        <div><center>
            <div className="row row-cols-1 row-cols-md-3 g-4 m-5">

                {slicedList.map(product =>
                    <div className="col" key={product._id}>
                        <div className="card h-100 zoom" style={{width:"300px"}}>
                            <div className="card-body">
                            <center><img src={"/products/"+product.image+".jpeg"} className="card-img-top" alt="..." style={{width:"200px",height:"200px"}} /></center>
                           
                                <h5 className="card-title">{product.productName}</h5>
                                <p className="card-text">From : {product.storeName}</p>
                                <p className="card-text">Ratings : {product.rating}</p>
                                <p className="card-text">Price : {product.price}</p>
                                <Link className="btn btn-primary zoom" to={"/products/"+product._id} state={user}>See This Product</Link>
                            </div>
                        </div>
                    </div>
                )}




            </div>
            </center>
        </div>

    );
}

export default Products;