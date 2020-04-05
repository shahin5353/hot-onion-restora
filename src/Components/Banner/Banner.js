import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <div className="container-fluid">
            <div className="banner">
                <div className="search-section">
                    <h1 className="mb-3">Best food waiting for your belly</h1>
                   <div className="input-group">
                   <input type="text" id="search" name="search" placeholder="&nbsp;&nbsp;&nbsp; Search food items"/>
                   <div className="input-group-prepend">
                   <button  className="search-button ">Search </button>
                   </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;