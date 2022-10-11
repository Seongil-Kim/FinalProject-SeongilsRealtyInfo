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
            // userName: `${user.given_name} ${user.family_name}`,
            email: user.email
        });
    },[]);

    return (
        <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
            {/* <InputDiv>
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
            </InputDiv> */}
            <InputRowDiv>
                <FeedbackLabel for="email">E-mail</FeedbackLabel>
                <InputDiv>
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
            </InputRowDiv>
            <InputRowDiv>
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
            </InputRowDiv>
            
             <Submit type="submit">Submit</Submit>
        </StyledForm>
    );

}

const Submit = styled.button`

    height: 30px;

    font-weight: bold;

    background-color: var(--menu-button-background-color);
    color: white;
    border: none;
    margin-top: 15px;
    border-radius: 10px;

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

const InputRowDiv=styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
`

const InputDisable=styled(Input)`
    pointer-events: none;   //We use this in React, instead of readonly option.
    background-color: grey;    
`

const InputDiv=styled.div`
    width: 200px;
    height: 50px;
    
    position: relative;
    top: -4px;
    
`

const FeedbackLabel=styled.label`
    width: 100px;
    height: 30px;
    background-color: var(--primary-color);
    color: white;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    margin-bottom: 10px;
    margin-right: 10px;
    padding-left: 10px;

    border-radius: 10px;
`
const LabelForTextAreaDiv=styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: left;
`

const TextArea=styled.textarea`
    width: 300px;
    height: 150px;
`

export default UserFeedback;