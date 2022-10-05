import styled from "styled-components";

import { useState, useEffect } from "react";

import Input from"./Input";



const UserFeedback=({user})=>{

    const [formData, setFormData] = useState({});

    console.log("user in UserFeedback: ", user);
    console.log("user email in UserFeedback: ", user.email);

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
        console.log("formData: ", formData);
    }

    const handleSubmit = (e, formData) => {
        e.preventDefault(); //to remove event handler from parent.        

        console.log("Form Data before Submit: ", formData );

        // const [mortgageCalResult, setMortgageCalResult] = useState(null);
      
        // const navigator=useNavigate();
      
        fetch("/db/user-feedback", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          //Change this part and next part.
          body: JSON.stringify(formData)
        })        
        .then((res)=>{            
            return res.json()
        })
        .then((data)=>{
            console.log("data: ", data);            
        })
        .catch((error)=>{
            console.log("Err: ", error);
        })
      }
    
    useEffect(()=>{
        setFormData({            
            userName: `${user.given_name} ${user.family_name}`,
            email: user.email
        });
    },[]);

    return (
        <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
            <InputDiv>
                <FeedbackLabel for="userName">User Name</FeedbackLabel>
                <InputDisable 
                    type="text" 
                    placeholder=""
                    name={"userName"} 
                    id={"userName"} 
                    value={`${user.given_name} ${user.family_name}`}
                    required={true}
                    handleChange={handleChange}
                    readonly
                    
                />
            </InputDiv>
            <InputDiv>
                <FeedbackLabel for="email">E-mail</FeedbackLabel>
                <InputDisable 
                    type="text" 
                    placeholder=""
                    name={"email"}
                    id={"email"} 
                    value={user.email}
                    required={true}
                    handleChange={handleChange} 
                    readonly
                />
            </InputDiv>
            <InputDiv>
                <LabelForTextAreaDiv>
                    <FeedbackLabel for="feedback">Feedback</FeedbackLabel>
                </LabelForTextAreaDiv>                
                <TextArea 
                    type="text" 
                    placeholder="Tell us what you think about our service."
                    name={"feedback"}
                    id={"feedback"}
                    required={true}
                    // handleChange={handleChange} 
                    onChange={(e) => handleChange("feedback", e.target.value)}                
                />
            </InputDiv>
            
             <Submit type="submit">Submit</Submit>
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

const InputDiv=styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
`

const InputDisable=styled(Input)`
    pointer-events: none;   //We use this in React, instead of readonly option.
    background-color: grey;
`

const FeedbackLabel=styled.label`
    
`

const LabelForTextAreaDiv=styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: left;
`

const TextArea=styled.textarea`
    width: 400px;
    height: 150px;
`

export default UserFeedback;