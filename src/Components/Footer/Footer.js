import React from 'react';
import './Footer.css'
import logo from '../../images/logo2.png';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="bg-dark p-5">
                <div className="row footer-top py-4">
                    <div className="col-md-6 mb-4">
                        <img height="30" src={logo} alt="logo"/>
                    </div>
                    <div className="col-md-3">
                        <ul>
                            <li><Link to="/" href="/">About Online Food</Link></li>
                            <li><Link to="/" href="/">Read Our Blog</Link></li>
                            <li><Link to="/" href="/">Sign up to deliver</Link></li>    
                            <li><Link to="/" href="/">Add your restaurant</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                    <ul>
                            <li><Link to="/" href="/">Get Help</Link></li>
                            <li><Link to="/" href="/">Read FAQ</Link></li>
                            <li><Link to="/" href="/">View All Cities</Link></li>    
                            <li><Link to="/" href="/">Restaurants near me</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom d-flex justify-content-between align-items-center">
                    <small className="text-secondary">Copyright &copy; 2020 Online Food</small>
                    <ul className="list-inline">
                        <li className="list-inline-item ml-3"><Link to="/" href="/">Privacy Policy</Link></li>
                        <li className="list-inline-item ml-3"><Link to="/" href="/">Terms of Use</Link></li>
                        <li className="list-inline-item ml-3"><Link to="/" href="/">Pricing</Link></li>
                    </ul>

                </div>
        </footer>
    );
};

export default Footer;