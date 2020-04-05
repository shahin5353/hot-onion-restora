import React from 'react';
import './SignUp.css';
import { useForm } from 'react-hook-form';
import Logo from '../../images/logo2.png';
import {Link} from 'react-router-dom';
import {useAuth} from '../../Auth/useAuth';

const SignUp = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const auth = useAuth();
    const onSubmit = data=>{
       if(data.name && data.email && data.password){
        auth.signUp(data.name,data.email,data.password);
       }
    }
    return (
        <div className="sign-up">
            <div className="container">
                <div className="logo text-center py-4">
                    <Link to="/">
                         <img src={Logo} alt=""/>
                    </Link>
                </div>
                <form className="py-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input name="name" className="form-control" ref={register({ required: true })} placeholder="Name" />
                        {errors.name && <span className="error">Name is required</span>}
                    </div>
                    <div className="form-group">
                        <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email"/>
                        {errors.email && <span className="error">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="confirm_password" className="form-control" ref={register({
                        validate: (value) => value === watch('password')
                        })} placeholder="Confirm Password" />
                        {errors.confirm_password && <span className="error">Passwords don't match.</span>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-danger btn-block"  type="submit">Sign Up</button>
                    </div>
                    <div className="option text-center">
                    <Link to="/login" className="text-primary">Already have an account</Link>
                    </div>
                </form>

               
            </div>

        </div>
    );
};

export default SignUp;