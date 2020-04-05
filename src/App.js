import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'
import AppBody from './Components/AppBody/AppBody';
import ItemDetail from './Components/ItemDetail/ItemDetail';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import OrderComplete from './Components/OrderComplete/OrderComplete';
import { getDatabaseCart, addToDatabaseCart,removeFromDatabaseCart, clearCart } from './DatabaseCart';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import { AuthContextProvider, PrivateRoute } from './Auth/useAuth';


function App() {
  const [cart, setCart] = useState( getDatabaseCart());
  const cartHandler = (key, quantity) => {
    addToDatabaseCart(key, quantity);
    setCart(getDatabaseCart());
  }

  const [deliveryDetails, setDeliveryDetails] = useState();
  const deliveryDetailsHandler = (data) => {
    const { toDoor, road, flat, business, instructor } = data;
    setDeliveryDetails({ toDoor, road, flat, business, instructor });
  }
  
  const quantityIncrease = (key,quantity) => {
    const newQuantity = quantity+1;
    addToDatabaseCart(key, newQuantity);
    setCart(getDatabaseCart());
  }
  const quantityDecrease = (key,quantity) => {
    const decreaseQuantity = quantity-1;
    addToDatabaseCart(key, decreaseQuantity);
    setCart(getDatabaseCart());
  }
  const removeItem = (key) =>{
    removeFromDatabaseCart(key);
    setCart(getDatabaseCart());
  }
  const orderFinished = () =>{
    clearCart();
    setCart(getDatabaseCart)
  }

  
  return (
    <div className="container-fluid overflow-hidden">
      <AuthContextProvider>
      <Router>
        <Header cart={cart} />
        <Switch>
          <Route exact path="/">
            <AppBody cart={cart} />
          </Route>
          <Route path="/item/:itemKey">
            <ItemDetail cartHandler={cartHandler} />
          </Route>
          <PrivateRoute exact path="/order">
            <PlaceOrder 
            quantityDecrease={quantityDecrease} 
            quantityIncrease={quantityIncrease} 
            removeItem = {removeItem}
            deliveryDetailsHandler={deliveryDetailsHandler}  />
          </PrivateRoute >
          <PrivateRoute path="/order/complete/:orderId">
            <OrderComplete orderFinished={orderFinished} deliveryDetails={deliveryDetails} />
          </PrivateRoute >
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
        <Footer />
      </Router>
      </AuthContextProvider>
    </div>
  )
}



export default App;
