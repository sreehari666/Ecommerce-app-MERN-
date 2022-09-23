import {SearchBar} from "../components/SearchBar";
import BookData from "../components/Data.json";
import Product from "../Product.json"
import '../App.css';

export const HomeSearch =()=>{
    return(
        <div className="search-wrapper">
            <SearchBar placeholder="Search" data={Product} />
        </div>
    );
}