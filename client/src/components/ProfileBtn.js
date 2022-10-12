import styled from "styled-components";

export default function ProfileBtn({ content,type }) {
  return <StyledButton type={type}>{content}</StyledButton>;
}

const StyledButton = styled.button`
    
    font-family: inherit;
    font-weight: bold;
    width: 90%;
    height: 3rem;
    font-size: 1rem;
    margin: 0.5rem;
    border: none;
    background: #9575CD;
    color:white;
    border-radius: 0.2rem;
    box-shadow: 0 2px 10px gray;
    cursor: pointer;
  
`;