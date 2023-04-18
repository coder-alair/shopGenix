import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AdminUsers from './adminUsers';
import AdminProducts from './adminProducts';
import AdminAddProduct from './adminAddProduct';
import AdminDash from './adminDash';
import Orders from './adminOrder';
const AdminPanel = () => {
    const [option,setOption]=useState('');
    const [user, setUser] = useState({});
    useEffect(() => {
      const getToken = localStorage.getItem('token');
      if (!getToken) return setUser(null);
      if (getToken) {
        const user = jwtDecode(getToken);
        setUser(user);
      }
    }, []);

    const handleUsers = (e) => {
        e.preventDefault();
        setOption(e.target.name);
    }

    const handleProducts = (e) => {
        e.preventDefault();
        setOption(e.target.name);
    }

    const handleDash = (e) => {
        e.preventDefault();
        setOption(e.target.name);
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        setOption(e.target.name);
    }

    const handleOrder = (e) => {
        e.preventDefault();
        setOption(e.target.name);
    }

    const contentSwitch = (a) => {

        switch (a) {

            case "users": return <AdminUsers user={user}/>;
            case "products": return <AdminProducts user={user}/>;
            case "addProducts": return <AdminAddProduct user={user}/>;
            case "orders": return <Orders user={user}/>;
            default: return <AdminDash user={user}/>
        }

    }

    return (
        
        <div>
            {user.isAdmin&&(
                <center>
            <div className="row">
                <div className="col-4 m-5" style={{width:"280px"}}>
                    <ul className="list-group">
                        <Link className="list-group-item fs-6" onClick={handleDash} name='dashboard'>Dashboard</Link>
                        <Link className="list-group-item fs-6" onClick={handleUsers} name='users'>User's</Link>
                        <Link className="list-group-item fs-6" onClick={handleProducts} name='products'>Product's</Link>
                   <Link className="list-group-item fs-6" name="addProducts" onClick={handleAddProduct}>Add a Product</Link>
                   <Link className="list-group-item fs-6" name="orders" onClick={handleOrder}>Order's</Link>
                   
                    </ul>
                </div>

                <div className="col">

                    {contentSwitch(option)}


                </div>
            </div></center>
            )}
        </div>
    );
}

export default AdminPanel;