
import '../App.css';
import {Card} from '../components/Card';
import { useState,useEffect } from 'react';
import {WhisperSpinner} from "../components/Loading";
import PrimarySearchAppBar from '../components/Appbar';
// import { Navigate } from "react-router-dom";

export const Home=()=>{

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
            console.log(data["products"]);
            setData(data["products"]);
        });
    }, []);
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log(userToken)
    
    // if(userToken == null){
    //     return <Navigate replace to="/login" />;
    // }else{

    
    return(
        <div className='wrapper'>
           <PrimarySearchAppBar />
            {data?(
                <div className="card-wrapper">
                
                {data &&
                data.map((item) => {
                return <Card img ={item.thumbnail}
                title = {item.title} description={item.description}
                btnText = "Add to cart"/>;
                })}
            </div>
                
            ):(
                <div className='loader-wrapper'>
                    <WhisperSpinner size={50} frontColor="#5E35B1" backColor="#B39DDB" />
                </div>
            )}
            
        </div>
        
    );
    // }
}