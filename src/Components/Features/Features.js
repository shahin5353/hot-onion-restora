import React, { useState } from 'react';
import { useEffect } from 'react';
import './Features.css';
import SingleFeature from '../SingleFeature/SingleFeature';
import Spinner from '../../images/icon/spinner1.gif'

function Features(props) {
    const [features,setFeatures] = useState([]);
    useEffect(() => {
        fetch('https://hot-onion-restora-node-mongo.herokuapp.com/features')
        .then(res=>res.json())
        .then(data=>{
            setFeatures(data)
            document.getElementById('spinner2').style.display='none';
        })
    }, []);

    return (
        <div className="container-fluid px-5">
            <div className="px-5 feature-top mb-5">
            <h1 className="mb-4">Why you choose us</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam repudiandae quos quae distinctio natus amet totam deleniti nulla cupiditate, architecto molestiae libero deserunt. Iusto, fugiat.</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <img id="spinner2" src={Spinner} alt=""/>
            {
                features.map( feature => <SingleFeature feature={feature} key={feature.key}></SingleFeature>)
            }
            </div>
                    
        </div>
    );
}

export default Features;