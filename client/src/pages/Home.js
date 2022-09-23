
import '../App.css';
import {Card} from '../components/Card';
import { useState,useEffect } from 'react';


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
    
    return(
        
        <div className="card-wrapper">
            {data &&
            data.map((item) => {
            return <Card img ={item.thumbnail}
            title = {item.title} description={item.description}
            btnText = "Add to cart"/>;
            })}
            
        
        </div>
        
    );
}