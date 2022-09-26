import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  OpenLinksButton,
  NavbarLinkExtended,
} from "../styles/Navbar.style";
import {HomeSearch} from '../pages/HomeSearch';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import  {NavDropdown} from "react-bootstrap";
import '../components/stylesheets/dropdown.css'
import {useNavigate,Link} from "react-router-dom";


export const Navbar=()=> {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const navigate = useNavigate();

  const tokenString = sessionStorage.getItem('token');
  const emailString = sessionStorage.getItem('email');
  const userToken = JSON.parse(tokenString);
  const emailToken = JSON.parse(emailString);

  console.log(userToken)
  console.log(emailToken)
  const logoutHandler = () => {
    sessionStorage.clear()
    navigate('/')
    
  };
  return (
    
    <NavbarContainer extendNavbar={extendNavbar}>
      
      <NavbarInnerContainer>
      
        <LeftContainer>
          <NavbarLinkContainer>
            
            <NavbarLink to="/"> Home</NavbarLink>
            {userToken==null || emailToken == null?
            <NavbarLink to="/login">Login</NavbarLink>
            :
            <NavbarLink >

            <div class="dropdown">
              <button class="dropbtn">{emailToken}</button>
              <div class="dropdown-content">
                <Link to='/profile'>My Profile</Link>
                <Link to='/' onClick={logoutHandler}>Logout</Link>
              
               
              </div>
            </div>
            </NavbarLink>
            }
            
            <HomeSearch />
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
            {/* <SearchBar placeholder="Enter a Book Name..." data={BookData} /> */}
          </NavbarLinkContainer>
          
        </LeftContainer>
        <RightContainer>
          <p>0</p>
          <ShoppingCartIcon />
          
          
        </RightContainer>
        
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          
          <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
          {userToken==null || emailToken == null?<NavbarLink to="/login">Login</NavbarLink>:<NavbarLink to="/profile">Profile</NavbarLink>}
          {/* <NavbarLinkExtended to="/account"> Account</NavbarLinkExtended>
          <NavbarLinkExtended to="/login">Login</NavbarLinkExtended> */}
          
          
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
    
  );
}

