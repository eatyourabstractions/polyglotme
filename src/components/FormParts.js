import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: calibri;
`;

export const Heading = styled.h1`
  font-size: 65px;
  margin: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px;
  font-size: 15px;
  border: 2px solid
    ${(props) => (props.borderColor === "alert" ? "red" : "#ddd")};
  border-radius: 3px;
  width: 300px;
`;
export const InputButton = styled.input`
  background: transparent;
  font-size: 20px;
  border-radius: 3px;
  border: 2px solid white;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  transition: 0.3s;
  :hover {
    cursor: pointer;
    color: dodgerblue;
    background-color: white;
  }
`;