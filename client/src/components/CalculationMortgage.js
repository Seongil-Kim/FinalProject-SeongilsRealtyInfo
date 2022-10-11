import styled from "styled-components";

import { useState } from "react";

import {useNavigate} from "react-router-dom";

import Input from "./Input";
import CalculationMortgageResult from "./CalculationMortgageResult";

// const CalculationMortgage=({handleSubmit})=>{
const CalculationMortgage=()=>{

    const [formData, setFormData] = useState({});    

    const [calMortgageResult, setCalMortgageResult] = useState(null);
      
    // const navigator=useNavigate();

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
        console.log("formData: ", formData);
    }

    const handleSubmit = (e, formData) => {
        e.preventDefault(); //to remove event handler from parent.
        console.log("formData when submit:", formData);
      
        // const [mortgageCalResult, setMortgageCalResult] = useState(null);
      
        // const navigator=useNavigate();
      
        fetch("/api/calcul-mortgage", {
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
            // setCalMortgageResult(data.mortgageCalResult.data.loan_mortgage);
            setCalMortgageResult(data.mortgageCalResult.mortgage);
            // navigator("/calcul-mortgage/result");     
        })
        .catch((error)=>{
            console.log("Err: ", error);
        })
      }

      console.log("calMortgageData: ", calMortgageResult);


    return(     
        
        <MortgageCalDiv>
            <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>

                <InputRowDiv>
                    <CalMortLabel for="insuranceCost">Monthly Insurance Payment($)</CalMortLabel>
                    <InputDiv>
                        <Input
                            type="text" 
                            placeholder=""
                            name={"insuranceCost"}
                            id={"insuranceCost"} 
                            required={true}
                            handleChange={handleChange} 
                            
                        />
                    </InputDiv>
                </InputRowDiv>

                <InputRowDiv>
                    <CalMortLabel for="propertyTaxRate">Annual Property Tax(%)</CalMortLabel>
                    <InputDiv>
                        <Input
                            type="text" 
                            placeholder=""
                            name={"propertyTaxRate"}
                            id={"propertyTaxRate"} 
                            required={true}   
                            handleChange={handleChange}              
                        />
                    </InputDiv>
                    
                </InputRowDiv>

                <InputRowDiv>
                    <CalMortLabel for="downPayment">Down Payment($)</CalMortLabel>
                    <InputDiv>
                        <Input
                            type="text" 
                            placeholder=""
                            name={"downPayment"}
                            id={"downPayment"} 
                            required={true}   
                            handleChange={handleChange}              
                        />
                    </InputDiv>

                </InputRowDiv>
                
                <InputRowDiv>
                    <CalMortLabel for="realtyPrice">Purchase Price($)</CalMortLabel>
                    <InputDiv>
                        <Input
                            type="text" 
                            placeholder=""
                            name={"realtyPrice"}
                            id={"realtyPrice"} 
                            required={true}       
                            handleChange={handleChange}          
                        />
                    </InputDiv>
                </InputRowDiv>

                <InputRowDiv>
                    <CalMortLabel for="repayTerm">Repayment Term(yr)</CalMortLabel>
                    <InputDiv>
                        <Input
                            type="text" 
                            placeholder=""
                            name={"repayTerm"}
                            id={"repayTerm"} 
                            required={true}  
                            handleChange={handleChange}               
                        />
                    </InputDiv>
                </InputRowDiv>

                <InputRowDiv>
                    <CalMortLabel for="interestRate">Interest Rate(%)</CalMortLabel>
                    <InputDiv>
                        <Input
                            type="text" 
                            placeholder=""
                            name={"interestRate"}
                            id={"interestRate"} 
                            required={true}    
                            handleChange={handleChange}             
                        />
                    </InputDiv>
                </InputRowDiv>
                
                {/* <InputDiv>
                    <CalMortLabel for="hoaFee">Home Owner Association Fee</CalMortLabel>
                    <Input 
                        type="text" 
                        placeholder=""
                        name={"hoaFee"}
                        id={"hoaFee"} 
                        required={true}     
                        handleChange={handleChange}            
                    />
                </InputDiv>     */}
                {/* <Submit type="submit" 
                        onClick={(e)=>handleSubmit(e, formData)}>Calculate</Submit> */}
                <Submit type="submit">Calculate</Submit>
            </StyledForm>        

            <MortgageCalResultDiv>            
                {calMortgageResult && <CalculationMortgageResult calMortgageResult={calMortgageResult} />}
            </MortgageCalResultDiv>
        </MortgageCalDiv>
    );
}

const MortgageCalDiv=styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;


    border: 2px solid var(--primary-color);
`

const Submit = styled.button`

    width: 440px;
    height: 30px;

    background-color: var(--menu-button-background-color);
    color: white;
    border: none;
    margin-top: 5px;
    border-radius: 10px;

    font-weight: bold;

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
    align-items: center;
`
const CalMortLabel=styled.label`
    width: 250px;
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

const InputDiv=styled.div`
    width: 200px;
    height: 30px;    

    margin-bottom: 16px;
`

const MortgageCalResultDiv=styled.div`
    width: 200px;
    height: 305px;

    background-color: #d9c4f2;
    
    margin-right: 50px;
    padding: 10px 0px 0px 10px;
    
`



export default CalculationMortgage;