import React from 'react';
import Map from '../../images/order/orderComplete.png';
import Rider from '../../images/order/rider.png';
import Bike from '../../images/order/bike.png';
import Locate from '../../images/order/locate.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const OrderComplete = (props) => {
    const { road, flat,toDoor,instructor } = props.deliveryDetails;
    const { orderId } = useParams()
    useEffect(() => {
        if (orderId) {
            props.orderFinished()
        }
    }, [])
    return (
        <div className="container my-5">
            <h1 className="text-center bg-light text-muted py-3 b-rounded">Order Id : <span className="text-danger">{orderId}</span></h1>
            <div className="row">
                <div className="col-md-8">
                    <img className="img-fluid" src={Map} alt="" />
                </div>
                <div className="col-md-4 pl-md-4">
                    <div className="bg-light p-3 rounded">
                        <img className="w-25 ml-5" src={Bike} alt="" />
                        <div className="bg-white  rounded p-3 my-3">
                            <img className="float-left" width="20" src={Locate} alt="" />
                            <div>
                                <h6>Your Location</h6>
                                <p>{flat}, {road}, {toDoor}</p>
                            </div>
                            <div>
                                <h6>Shop Address</h6>
                                <p>Gulshan Plaza Restora GPR</p>
                            </div>
                        </div>
                        <h2>10:00</h2>
                        <p>Estimated Delivery</p>

                        <div className="bg-white rounded p-3 d-flex">
                            <img className="w-25 mr-2" src={Rider} alt="" />
                            <div>
                                <h6>{instructor}</h6>
                                <p>Your Rider</p>
                            </div>
                        </div>

                        <button className="btn btn-block my-3 btn-danger">Contact - 01700000000</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderComplete;