import React from 'react';
import Banner from '../Banner/Banner';
import Items from '../Items/Items';
import Features from '../Features/Features';

const AppBody = (props) => {
    return (
        <div>
          <Banner/>
          <Items cart={props.cart}/>
          <Features/>
        </div>
    );
};

export default AppBody;