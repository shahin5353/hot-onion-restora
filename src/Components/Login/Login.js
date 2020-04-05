import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import Logo from '../../images/logo2.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/useAuth';
import { useEffect } from 'react';

const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();
    const onSubmit = data => {
        if (data.email && data.password) {
            auth.signIn(data.email, data.password);
        }
    }
    useEffect(() => {
        if (auth.error) {
            document.getElementById('error').innerText = "Email or Password didn't match"
            setTimeout(() => {
                document.getElementById('error').innerText = ""
            }, 3000)
        }
    }, [auth.error])
    return (
        <div className="login">
            <div className="container">
                <div className="logo text-center py-4">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <form className="py-5" onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email" />
                        {errors.email && <span className="error">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" autoComplete="on" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>
                    <div className="form-group text-center">
                        <span className="text-danger font-weight-bold" id="error"></span>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-danger btn-block" type="submit">Sign In</button>
                    </div>
                    <div className="option text-center">
                        <Link to="/signup" className="text-primary">Create a new Account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;