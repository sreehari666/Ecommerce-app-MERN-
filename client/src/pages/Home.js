
import '../App.css';
import {Card} from '../components/Card';
import { useState,useEffect } from 'react';
import {WhisperSpinner} from "../components/Loading";
import PrimarySearchAppBar from '../components/Appbar';

const URL ="http://192.168.1.56:9000";

export const Home=()=>{

    const [data, setData] = useState(null);
    

    useEffect(() => {
        fetch(URL+"/users/products")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setData(data["response"]);
        });
    }, []);
    

    async function AddToCart(proid){
        const tokenString = sessionStorage.getItem('token');
        const userid = JSON.parse(tokenString);
        console.log(userid)
        try {
            let res = await fetch(URL+"/users/add-to-cart/"+userid+"/"+proid, {
              method: "POST",
              body: JSON.stringify({
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            });
            let resJson = await res.json();
            if (res.status === 200) {
              
              console.log("form sent")
              console.log(resJson)
            //   window.location.reload();
             
    
            } else {
              console.log("error")
            }
          } catch (err) {
            console.log(err);
          }
    }
    
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
                return <Card img ={item.imgUrl}
                title = {item.productName} description={item.description} onClick={()=>AddToCart(item._id)}
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