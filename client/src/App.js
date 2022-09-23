import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from './components/Navbar';
import BookData from "./components/Data.json";
import {SearchBar} from "./components/SearchBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Signup} from './pages/Signup';
import {Home} from './pages/Home';
import {HomeSearch} from './pages/HomeSearch'

function App() {

    return (
      <Router>
      <div className="App">
        <Navbar />
        <HomeSearch />
        
        {/* <div className="search-wrapper"><SearchBar placeholder="Search" data={BookData} /></div>  */}
         <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />

         </Routes>
        {/* <Router>
        <Routes>
           <Route exact path="/">
                  <Home />
         </Route>
         <Route path='/account'>
              <Signup />
         </Route>
         </Routes>
         </Router> */}
      </div>
      </Router>
    );
  
}

export default App;
