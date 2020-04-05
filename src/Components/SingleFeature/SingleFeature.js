import React from 'react';
import { useState } from 'react';
import './SingleFeature.css';

const SingleFeature = (props) => {
    const {name,desc,img,icon} = props.feature;
        const [showMore,setShowMore] = useState(true);
        const moreHandler=()=>{
            setShowMore(false);
            console.log("show-more");
            
        }
        const lessHandler=()=>{
            setShowMore(true);
            console.log("show less");
            
            }
        
    return (
                <div className="card text-center text-dark border-0 feature-card" style={{maxWidth:'30%'}}>
                <img className="card-img-top img-fluid" src={img}  alt="Card-cap"/>
                <div className="d-flex flex-row">
                   <div className="mt-4"> <span><img src={icon} alt=""/></span> </div>
                   <div className="card-body text-left">
                    <h5 style={{fontWeight:600}} className="card-title text-capitalize mt-2">{name}</h5>
                    <p className="card-text" >
                        {
                            showMore ?
                            desc.substr(0,100):
                            desc
                        }
                    </p>
                    {
                    showMore ?
                        <button onClick={moreHandler} className="see-more-btn"><b>See more </b></button>
                            :
                        <button onClick={lessHandler} className="see-more-btn"><b>See less </b></button>
                        }
                        
                        
                        
                
                
                </div>
               </div>
             </div>
               )
}
export default SingleFeature;