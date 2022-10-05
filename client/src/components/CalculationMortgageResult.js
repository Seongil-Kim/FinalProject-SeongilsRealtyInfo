import styled from "styled-components";

const CalculationMortgageResult=({calMortgageResult})=>{
    
    console.log("receivedCalMortgageData: ", calMortgageResult);

    return (
        <CalMortgageResultDiv>
            {calMortgageResult.monthly_payment}
        </CalMortgageResultDiv>
    );

}

const CalMortgageResultDiv= styled.div`
    
`

export default CalculationMortgageResult;