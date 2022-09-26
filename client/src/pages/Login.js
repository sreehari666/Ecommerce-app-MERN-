import styled from "styled-components";
import Button from "../components/Button";
import {Link,useNavigate} from "react-router-dom";
import { useState } from "react";
import '../components/stylesheets/err.css';

export const Login = ()=> {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  
    let handleSubmit = async (e) => {

      e.preventDefault();
      try {
        let res = await fetch("http://192.168.43.162:9000/users/login", {
          method: "POST",
          body: JSON.stringify({
           
            email: email,
            password:password,
            
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        });
        let resJson = await res.json();
        if (res.status === 200) {
          
          setEmail("");
          setPassword("")
          console.log("form sent")
          setMessage("User created successfully");
        
          console.log(resJson.userid);
          var token = resJson.userid
          setMessage(resJson.message)
          //  setToken(token)
          //  console.log(resJson.message)
          if(token == null){
              console.log(resJson.message)
          }else{
              sessionStorage.setItem('token', JSON.stringify(token));
              sessionStorage.setItem('email', JSON.stringify(email));
              navigate("/");
          }

        } else {
          sessionStorage.setItem('token', JSON.stringify(token));
         
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    
  return (
    <div className="center-wrapper">
        <form onSubmit={handleSubmit}>
            <MainContainer>
            <WelcomeText>LOGIN</WelcomeText>
            <p className="message">{message}</p>
            <InputContainer>

                <StyledInput type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <StyledInput type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                
            </InputContainer>
            <ButtonContainer>
                <Button content="Login" type="submit" />
            </ButtonContainer>
            <LoginWith to="/signup">OR SIGNUP </LoginWith>
            <HorizontalRule />
            
            <ForgotPassword>Forgot Password ?</ForgotPassword>
            </MainContainer>
        </form>
    </div>
  );
   
}

const MainContainer = styled.div`
  margin: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  background-color: #D1C4E9;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 50vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 60vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 75vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 75vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 75vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 75vh;
  }
`;

const WelcomeText = styled.h3`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// const LoginWith = styled(Link)'
//   cursor:pointer;
// ';
// const LoginWith = styled.h6`
//   cursor: pointer;
// `;
const LoginWith = styled(Link)`
  cursor: pointer;
  color: white;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #673AB7;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
  padding-top: 0.5rem;
`;

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 0.2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 0.2rem;
    background-color: #EDE7F6;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;