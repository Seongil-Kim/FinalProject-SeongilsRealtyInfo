import styled from "styled-components";

const CalculationMortgageResult=({calMortgageResult})=>{
    
    console.log("receivedCalMortgageData: ", calMortgageResult);

    return (
        <CalMortgageResultDiv>
            Loan Amount: {calMortgageResult.loan_amount}<br/>
            Monthly Payment: {calMortgageResult.monthly_payment}<br/>
            Total Payment: {calMortgageResult.total_payment}
        </CalMortgageResultDiv>
    );

}

const CalMortgageResultDiv= styled.div`
    
`

export default CalculationMortgageResult;