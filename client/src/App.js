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



function App() {
   
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      console.log(userToken)

   
    return (
      <Router>
      <div className="App">
      {/* <PrimarySearchAppBar /> */}
         <Routes>
            
            <Route exact path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />

            <Route exact path='/admin' element={<AdminHome />} />
            <Route path='/admin-add-product' element={<AdminAddProduct />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-view-product' element={<ViewProduct/>} />
            

         </Routes>
      </div>
      </Router>
    );
      
}

export default App;
