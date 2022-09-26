import {SearchBar} from "../components/SearchBar";
import '../App.css';
import { useState,useEffect } from "react";

export const HomeSearch =()=>{
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
        <div className="search-wrapper">
            <SearchBar placeholder="Search" data={data} />
        </div>
    );
}