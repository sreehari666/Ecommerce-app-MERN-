import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from "../styles/Navbar.style";
import LogoImg from "../assets/logo.png";



export const Navbar=()=> {
  const [extendNavbar, setExtendNavbar] = useState(false);
  return (
    
    <NavbarContainer extendNavbar={extendNavbar}>
      
      <NavbarInnerContainer>
      
        <LeftContainer>
          <NavbarLinkContainer>
            

            <NavbarLink to="/account">Account</NavbarLink>

            <NavbarLink to="/"> Home</NavbarLink>
            <NavbarLink to="/products"> Products</NavbarLink>
            <NavbarLink to="/contact"> Contact Us</NavbarLink>
            <NavbarLink to="/about"> About Us</NavbarLink> 
            <NavbarLink to="/signup">Signup</NavbarLink>
            
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
        
          <Logo src={LogoImg}></Logo>
          
        </RightContainer>
        
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          
          <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/products"> Products</NavbarLinkExtended>
          <NavbarLinkExtended to="/contact"> Contact Us</NavbarLinkExtended>
          <NavbarLinkExtended to="/about"> About Us</NavbarLinkExtended> 
          
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
    
  );
}
