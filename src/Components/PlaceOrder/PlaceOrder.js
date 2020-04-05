import React, { useEffect, useState } from 'react';
import './PlaceOrder.css';
import { Link, Redirect } from 'react-router-dom';
import { getDatabaseCart} from '../../DatabaseCart';
import { useForm } from 'react-hook-form';
import notFound from '../../images/order/no_item_found.png';
import Spinner from '../../images/icon/spinner2.gif'
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { useAuth } from '../../Auth/useAuth';
import Processing from '../../images/icon/spinner3.gif'

const stripePromise = loadStripe('pk_test_1X8FNdv9hTiouRttcbc7vBu700Ol8LWIGV');
const PlaceOrder = (props) => {
    const auth = useAuth();
    const [orderId,setOrderId] = useState(null)
    const [shipInfo,setShipInfo] = useState(null)
    const [payment,setPayment] = useState(null)
    const [cart, setCart] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [placeClicked,setPlaceClicked] = useState(false)
    const subTotal = cart.reduce((previousPrice,currentPrice) => {
        return previousPrice + (currentPrice.price * currentPrice.quantity) ;
    },0);
    const tax = subTotal/50;
    let delivery = subTotal>200?(subTotal/100):subTotal === 0?0:2;
    const total = subTotal + tax + delivery;
    useEffect(()=>{
            const savedCart = getDatabaseCart();
            const itemKeys = Object.keys(savedCart);
            fetch('https://hot-onion-restora-node-mongo.herokuapp.com/getItemByKey',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(itemKeys)
        })
        .then(res=>res.json())
        .then(data => {
            const cartItems= itemKeys.map(key=>{
                const item = data.find(item => item.key === key);
                item.quantity = savedCart[key];
                return item;
            });
            setCart(cartItems);
            setIsLoading(false)
        })
    },[props]);
    // Form Handling
    const {register, handleSubmit,errors } = useForm();
    const [address,setAddress] = useState(false);
    const onSubmit = data => {
        props.deliveryDetailsHandler(data);
        setAddress(true);
        setShipInfo(data);
        
    }

    const handlePayment = (payment)=>{
        setPayment(payment)
       
      }
     const handlePlaceOrder = ()=>{
        setPlaceClicked(true);
        const db_cart = getDatabaseCart()
        const orderDetail = { email: auth.user.email, cart: db_cart, shipment: shipInfo, payment : payment}
        fetch('https://hot-onion-restora-node-mongo.herokuapp.com/placeOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetail)
          })
            .then(res => res.json())
            .then(data => {
              setOrderId(data._id)
            })
     }
    return (
        <div>
                {
                    (isLoading===true) &&
                    <div className="text-center my-5"><img src={Spinner} alt="spinner"/></div>
                }
                {
                     cart.length>0 &&
                    <div className="container mt-5">
                    <div className="row">
                    <div className="col-md-5 mr-5" style={{display: shipInfo && 'none'}}>
                        <h4 className="text-capitalize">edit delivery details</h4>
                        <hr/>
                    <div className="my-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input name="toDoor" ref={register({ required: true })} style={{backgroundColor:'#F5F5F5'}} className="form-control mt-4 border-0" type="text" placeholder="To door"/>
                        {errors.toDoor && <span className="error">To door is required</span>}
                        <input name="road" ref={register({ required: true })} style={{backgroundColor:'#F5F5F5'}} className="form-control mt-4 border-0" type="text" placeholder="Road No."/>
                        {errors.road && <span className="error">Road No. is required</span>}
                        <input name="flat" ref={register({ required: true })} style={{backgroundColor:'#F5F5F5'}} className="form-control mt-4 border-0" type="text" placeholder="Flat, suite or floor"/>
                        {errors.flat && <span className="error">Flat, suite or floor is required</span>}
                        <input name="business" ref={register({ required: true })} style={{backgroundColor:'#F5F5F5'}} className="form-control mt-4 border-0" type="text" placeholder="Business Name"/>
                        {errors.business && <span className="error">Business name is required</span>}
                        <input name="instructor" ref={register({ required: true })} style={{backgroundColor:'#F5F5F5'}} className="form-control mt-4 border-0" type="text" placeholder="Add delivery instructor"/>
                        {errors.instructor && <span className="error">Delivery instructor is required</span>}
                        <input className="form-control mt-4 border-0 bg-danger text-light" type="submit" />
                    </form>
                    </div>
                    </div>
                    {/* payment information */}
                    <div className="col-md-5 mr-5" style={{display: shipInfo ? 'block' : 'none'}}>
                        <h4 className="text-capitalize">Payment Information</h4>
                        <hr/>
                    <div className="my-5">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePayment= {handlePayment}/>
                    </Elements>
                    </div>
                    </div>

                    <div className="col-md-5 ml-lg-5">
                        <h5>From Gulshan Plaza Restura GPR</h5>
                        {
                            
                            cart.map((item)=>{
                                const itemPrice = item.price * item.quantity;
                                return (
                                    <div className="mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3" key={item.key}>
                                        <img width="100px" src={item.img} alt=""/>
                                        <div>
                                            <h6>{item.name}</h6>
                                            <h4 className="text-danger">${itemPrice}</h4>
                                            <p>Delivery free</p>
                                        </div>
                                        <div className="cart-controller ml-3" style={{fontSize:'18px',fontWeight:'bold'}}>
                                            {
                                                item.quantity > 1 ?
                                                <button onClick={()=>props.quantityDecrease(item.key,item.quantity)} className="btn">-</button> 
                                                :
                                                <button disabled className="btn">-</button> 
                                            }
                                            <span style={{backgroundColor:'#fff',padding:'10px 10px',borderRadius:'10px'}}>{item.quantity}</span>
                                            {
                                                item.quantity < 20 ?
                                                <button onClick={()=>props.quantityIncrease(item.key,item.quantity)} className="btn">+</button>
                                                :
                                                <button disabled className="btn">+</button>
                                            }
                                            <button onClick={()=>props.removeItem(item.key)} className="bg-light text-danger"><span className="fa fa-trash"></span></button>
                                        </div>
                                    </div>
                            )
                            })
                        }
                        
                            <div>
                                <p className="d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span>${subTotal}</span>
                                </p>
                                <p className="d-flex justify-content-between">
                                    <span>Tax (2%)</span> 
                                    <span>${tax}</span></p>
                                <p className="d-flex justify-content-between">
                                    <span>Delivery Fee</span> 
                                <span>${delivery}</span>
                                </p>
                                <p className="d-flex justify-content-between">
                                    <span>Total</span> 
                                <span>${total}</span></p>
                                {
                                    total && address && payment  ? 
                                    
                                        placeClicked ?
                                        <button disabled className="btn btn-block btn-danger btn-secondary"><img className="img-fluid"  width="25vh" src={Processing} alt="processing"/> Order is processing...</button>
                                        :
                                        <button onClick={handlePlaceOrder}  className="btn btn-block btn-danger btn-secondary"> Place Order</button>
                                    
                                :
                                    <button disabled  className="btn btn-block btn-danger btn-secondary">Place Order</button>
                                
                            }
                            </div>
                        </div>
                    </div>
                </div>
                }
                {
                    (isLoading===false && cart.length<1) &&
                <div className="container my-5 text-center">
                    <img src={notFound} alt=""/>
                    <h3 className="mt-5">Please go to <Link to="/">
                    <button className="btn btn-success">HOME</button>
                    </Link> and add some item</h3>
                </div>
                }
                {
                     orderId &&
                     <Redirect to={{pathname: "/order/complete/"+orderId}} />
                }
            
           
        </div>
        
    );
};

export default PlaceOrder;