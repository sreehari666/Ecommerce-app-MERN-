import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrimarySearchAppBar from './components/Appbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Signup} from './pages/Signup';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {AdminHome} from './pages/admin/AdminHome';
import { useState } from 'react';
import {AdminAddProduct} from './pages/admin/AddProduct';
import {AdminLogin} from './pages/admin/AdminLogin';
import { ViewProduct } from './pages/admin/ViewProduct';
import {Cart} from './pages/Cart';



function App() {
   
   const tokenString = sessionStorage.getItem('token');
   const userToken = JSON.parse(tokenString);
   console.log(userToken)

   const adminString = sessionStorage.getItem("admin-token");
   const adminToken = JSON.parse(adminString);
   console.log(adminToken)

   
    return (
      <Router>
      <div className="App">
      {/* <PrimarySearchAppBar /> */}
         <Routes>
            
            <Route exact path='/' element={<Home />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/cart' element={<Cart />} />

            <Route exact path='/admin' element={<AdminHome />} />
            <Route exact path='/admin-add-product' element={<AdminAddProduct />} />
            <Route exact path='/admin-login' element={<AdminLogin />} />
            <Route exact path='/admin-view-product' element={<ViewProduct/>} />
            

         </Routes>
      </div>
      </Router>
    );
      
}

export default App;
