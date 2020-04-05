import React, { useState } from 'react';

const Item = (props) => {
    const itemKey = props.itemKey
    const { name, img, price, fullDesc } = props.item;
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(price);
    const plusQuantity = () => {
        setQuantity(quantity + 1);
        setTotalPrice(totalPrice + price);
    }
    const minusQuantity = () => {
        setQuantity(quantity - 1);
        setTotalPrice(totalPrice - price);
    }

    return (
        <div className="row">
        <div className="col-md-6">
            <h1 className="mb-5 mt-4">{name}</h1>
            <p>{fullDesc}</p>
            <div className="d-flex">
                <h2 className="font-weight-bold">${totalPrice}</h2>
                <div className="quantity ml-5">
                    {
                        quantity > 1 ?
                            <button className="btn" onClick={minusQuantity}>-</button>
                            :
                            <button disabled className="btn"> - </button>
                    }
                    <span className="mx-3" value="1" type="number">{quantity}</span>
                    {
                        quantity < 20 ?
                            <button onClick={plusQuantity} className="btn pl-3">+</button>
                            :
                            <button disabled className="btn ml-3"> + <small className="text-danger">maximum limit reached</small></button>
                    }
                </div>
            </div>
            <button onClick={() => props.cartHandler(itemKey, quantity)} className="border-0 px-4 py-2 my-5 add-button"><span className="fa fa-shopping-cart p-2"></span>Add</button>
        </div>
        <div className="col-md-6">
            <img src={img} height="350" alt="" />
        </div>
    </div>
    );
};

export default Item;