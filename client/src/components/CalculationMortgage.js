import styled from "styled-components";

import { useState } from "react";

import Input from"./Input";

const CalculationMortgage=({handleSubmit})=>{

    const [formData, setFormData] = useState({});

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    return(
        <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
            <CalMortLabel for="insuranceCost">Monthly Insurance Payment($)</CalMortLabel>
            <Input 
                type="text" 
                placeholder=""
                name={"insuranceCost"}
                id={"insuranceCost"} 
                required={true}
                handleChange={handleChange} 
                 
            />
            <CalMortLabel for="propertyTax">Annual Property Tax(%)</CalMortLabel>
            <Input 
                type="text" 
                placeholder=""
                name={"propertyTax"}
                id={"propertyTax"} 
                required={true}   
                handleChange={handleChange}              
            />
            <CalMortLabel for="downPayment">Down Payment($)</CalMortLabel>
            <Input 
                type="text" 
                placeholder=""
                name={"downPayment"}
                id={"downPayment"} 
                required={true}   
                handleChange={handleChange}              
            />
            <CalMortLabel for="priceRealty">Purchase Price($)</CalMortLabel>
            <Input 
                type="text" 
                placeholder=""
                name={"priceRealty"}
                id={"priceRealty"} 
                required={true}       
                handleChange={handleChange}          
            />
            <CalMortLabel for="repayTerm">Repayment Term(yr)</CalMortLabel>
            <Input 
                type="text" 
                placeholder=""
                name={"repayTerm"}
                id={"repayTerm"} 
                required={true}  
                handleChange={handleChange}               
            />
            <CalMortLabel for="interestRate">Interest Rate(%)</CalMortLabel>
            <Input 
                type="text" 
                placeholder=""
                name={"interestRate"}
                id={"interestRate"} 
                required={true}    
                handleChange={handleChange}             
            />
            <CalMortLabel for="hoaFee">Annual Property Tax</CalMortLabel>
            <Input 
                type="text" 
                placeholder=""
                name={"hoaFee"}
                id={"hoaFee"} 
                required={true}     
                handleChange={handleChange}            
            />            
            <Submit type="submit" 
                    onClick={(e)=>handleSubmit(e, formData)}>Calculate</Submit>
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

`

const CalMortLabel=styled.label`
    
`

export default CalculationMortgage;