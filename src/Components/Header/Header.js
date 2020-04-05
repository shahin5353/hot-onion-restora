import React from 'react';
import logo from '../../images/logo2.png';
import './Header.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/useAuth';


const Header = (props) => {
    const cart = props.cart;
    const itemKeys = Object.keys(cart);
    const auth = useAuth();
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-md">
                <Link to="/" className="navbar-brand ml-5">
                    <img height="50" src={logo} alt="" />
                </Link>
                <div className="nav-section ml-auto">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/order">
                                <button className="nav-link"><i style={{ fontSize: '25px' }} className="fa fa-shopping-cart fa-lg"></i><span className="badge badge-warning">{itemKeys.length}</span></button>
                            </Link>
                        </li>

                        {
                            auth.user ?
                                <li className="nav-item">
                                    <button onClick={() => auth.signOut()} className="nav-link red-button">Sign Out</button>
                                </li>
                                :

                                <li className="nav-item">
                                    <Link to="/login">
                                        <button className="nav-link text-dark">Login</button>
                                    </Link>
                                </li>
                        }


                        {
                            auth.user ?
                                <li className="nav-item">
                                    <button className="nav-link"><span className="fa fa-user"></span> {auth.user.displayName}</button>

                                </li>
                                :
                                <li className="nav-item">
                                    <Link to="/signup">
                                        <button className="nav-link red-button">Sign up</button>
                                    </Link>
                                </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;