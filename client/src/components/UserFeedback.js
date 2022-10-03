import styled from "styled-components";

import { useState } from "react";

import Input from"./Input";



const UserFeedback=({handleSubmit})=>{

    const [formData, setFormData] = useState({});

    return (
        <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
            <Input 
                type="text" 
                placeholder="First Name"
                name={"firstName"}
                required={true}                
            />
            <Input 
                type="text" 
                placeholder="Last Name"
                name={"lastName"}
                required={true}
                
            />
            <Input 
                type="email" 
                placeholder="Email"
                name={"email"}
                required={true}
                
            />
            {/* <Submit type="submit" 
                    onClick={(e)=>handleSubmit(e, formData)}
             disabled={selectedSeat.length ? false : true}>Confirm</Submit> */}
             <Submit type="submit" 
                    onClick={(e)=>handleSubmit(e, formData)}>Confirm</Submit>
        </StyledForm>
    );

}

const Submit = styled.button`
    background-color: #d1560e;
    border: none;
    margin-top: 5px;
    border-radius: 2px;

    &:disabled{
        color: var(--color-orange);
    }

    &:hover{
        cursor: pointer;
    }
`

const StyledForm = styled.form`
    margin-top: 24px;
    border: 5px solid var(--color-alabama-crimson);
    padding: 30px;
    margin: auto 0px auto;
    display: flex;
    flex-direction: column;
    margin-left: 50px;
`

export default UserFeedback;