import styled from "styled-components";
import Button from "../components/Button";
import {Link,useNavigate} from "react-router-dom";
import { useState } from "react";
import '../components/stylesheets/err.css';
import '../functions/token';



export const Signup = ()=> {
  const [message,setMessage] = useState("");
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: '',
    email:'',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    username: '',
    email:'',
    password: '',
    confirmPassword: ''
  })

  const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }

  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Name";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Please enter Email";
          }
          break;
  
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  }


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://192.168.43.162:9000/users/signup", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
      });
      let resJson = await res.json();
     console.log("response")
     console.log(resJson.userid);
     var token = resJson.userid
     setMessage(resJson.message)
    //  setToken(token)
    //  console.log(resJson.message)
     if(token == null){
        console.log(resJson.message)
     }else{
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('name', JSON.stringify(input.username));
        sessionStorage.setItem('email', JSON.stringify(input.email));
        navigate('/')
     }
     
      if (res.status === 200) {
        console.log("form sent")
        setInput({ username: '',
        email:'',
        password: '',
        confirmPassword: ''})
        console.log(input)
      } else {
        console.log("error")
       
      }
    } catch (err) {
      console.log(err);
    }

  
    
  };

  
  


  return (
    <div className="center-wrapper">
      <form onSubmit={handleSubmit}>
        <MainContainer>
          <WelcomeText>SIGNUP</WelcomeText>
          <p className="message">{message}</p>
          <InputContainer>
                    <StyledInput type="text"
                      name="username"
                      placeholder='Enter Name'
                      value={input.username}
                      onChange={onInputChange}
                      onBlur={validateInput} />
                    {error.username && <span className='err'>{error.username}</span>}

                    <StyledInput type="email"
                      name="email"
                      placeholder='Enter Email'
                      value={input.email}
                      onChange={onInputChange}
                      onBlur={validateInput} />
                    {error.email && <span className='err'>{error.email}</span>}

                    <StyledInput
                      type="password"
                      name="password"
                      placeholder='Enter Password'
                      value={input.password}
                      onChange={onInputChange}
                      onBlur={validateInput} />
                    {error.password && <span className='err'>{error.password}</span>}

                      <StyledInput
                        type="password"
                        name="confirmPassword"
                        placeholder='Enter Confirm Password'
                        value={input.confirmPassword}
                        onChange={onInputChange}
                        onBlur={validateInput} />
                      {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
          </InputContainer>
          <ButtonContainer>
            <Button content="Sign Up" />
          </ButtonContainer>
          <LoginWith to="/login">OR LOGIN </LoginWith>
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
  margin: 1rem 0 4rem 0;
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
  margin: 5rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  padding: 0.5rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.4rem;
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