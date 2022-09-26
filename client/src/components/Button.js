import styled from "styled-components";

export default function Button({ content,type }) {
  return <StyledButton type={type}>{content}</StyledButton>;
}

const StyledButton = styled.button`
    
    font-family: inherit;
    font-weight: bold;
    width: 65%;
    height: 3rem;
    font-size: 1rem;
    margin: 0rem;
    border: none;
    background: #673AB7;
    color:white;
    border-radius: 0.2rem;
    box-shadow: 0 2px 10px gray;
    cursor: pointer;
  
`;