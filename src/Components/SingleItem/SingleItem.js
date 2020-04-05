import React from 'react';
import { Link } from 'react-router-dom';
import './SingleItem.css'


const SingleItem = (props) => {
    const {_id,name,price,img,description,key} = props.item;
    return (
        <Link to={"/item/"+key} className="ml-5 mb-2">
        <div className="card text-center text-dark border-0 px-5 item-card pt-3" style={{width:'450px'}}>
            <img className="card-img-top img-fluid" src={img}  alt="card-cap"/>
            <div className="card-body">
                <h6 className="card-title">{name}</h6>
                <p className="card-text">{description}</p>
                <p><b>${price}</b></p>
            </div>
         </div> 
         </Link>
    );
};

export default SingleItem;