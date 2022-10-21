import styled from "styled-components";
import AdminAppBar from "../../components/adminAppbar";
import Button from "../../components/Button";
import { useState } from "react";
import '../../components/stylesheets/err.css';

const URL ="http://192.168.1.56:9000";

export const AdminAddProduct=()=>{
    const [message,setMessage] = useState("")
    const [productName,setProductName] = useState("")
    const [description,setDescription] = useState("")
    const [imgUrl,setImg] = useState("")
    const [qty,setQty] = useState("")

    let handleSubmit = async (e) => {

        e.preventDefault();
        try {
          let res = await fetch("/admin/add-product", {
            method: "POST",
            body: JSON.stringify({
             
              productName:productName ,
              description:description,
              imgUrl:imgUrl,
              qty:parseInt(qty),

            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
          });
          let resJson = await res.json();
          if (res.status === 200) {
            
            setProductName("");
            setDescription("")
            setImg("");
            setQty("");
            setMessage(resJson.message);

            console.log("form sent")
            
  
          } else {
            console.log("error")
          }
        } catch (err) {
          console.log(err);
        }
      };




return (
    <div>
        <AdminAppBar />
    <div className="center-wrapper">
      
        <form onSubmit={handleSubmit}>
            <MainContainer>
            <WelcomeText>Add products</WelcomeText>
            <p className="message">{message}</p>
            <InputContainer>

                <StyledInput type="text" placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} />
                <StyledInput type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <StyledInput type="text" placeholder="Image url" value={imgUrl} onChange={e => setImg(e.target.value)} />
                <StyledInput type="number" placeholder="Quantity" value={qty} onChange={e => setQty(e.target.value)} />
                
            </InputContainer>
            <ButtonContainer>
                <Button content="Add" type="submit" />
            </ButtonContainer>
           
            </MainContainer>
        </form>
    </div>
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
  /* text-transform: uppercase; */
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
    width: 60vw;
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