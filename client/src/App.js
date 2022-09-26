import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Signup} from './pages/Signup';
import {Home} from './pages/Home';
import {HomeSearch} from './pages/HomeSearch';
import {Login} from './pages/Login';
import {Profile} from './pages/Profile';


function App() {
   
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      console.log(userToken)
   
   
    return (
      <Router>
      <div className="App">
        <Navbar />
        
         <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            
         </Routes>
      
      </div>
      </Router>
    );
      
}

export default App;
