import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ItemDetail.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import Item from './Item';
import Spinner from '../../images/icon/spinner2.gif'
import notFound from '../../images/order/no_item_found.png';


const ItemDetail = (props) => {
    const { itemKey } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch('https://hot-onion-restora-node-mongo.herokuapp.com/item/' + itemKey)
            .then(res => res.json())
            .then(data => {
                setItem(data)
            })
            .catch(err => {
                setError(err.message);
                document.getElementById('spinner').style.display = 'none'

            })
    }, [itemKey])



    return (
        <div className="container my-5 py-5">
            {
                error &&
                <div className="container my-5 text-center">
                    <img src={notFound} alt="" />
                    <h3 className="mt-5">Please go to <Link to="/">
                        <button className="btn btn-success">HOME</button>
                    </Link> and add some item</h3>
                </div>
            }
            {
                item ?
                    <Item item={item} itemKey={itemKey} cartHandler={props.cartHandler} />
                    :
                    <div className="text-center">
                        <img id="spinner" src={Spinner} alt="spinner" />
                    </div>
            }
        </div>
    );
};

export default ItemDetail;
