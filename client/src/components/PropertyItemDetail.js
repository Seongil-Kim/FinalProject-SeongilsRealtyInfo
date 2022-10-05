import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import {useNavigate} from 'react-router-dom';

const PropertyItemDetail=({propertyDetailInfoObj})=>{

    const navigator=useNavigate();

    fetch("/api/test")
    .then((res)=>res.json())
    .then((data)=>{            
        console.log("property detail: ", data.propertyDetail);            
    })        
    .catch((error)=>{
        console.error("Error: ", error);
    // errorHandler("error-receive");
    });

    return (
        <PropertyItemDetailShowDiv>
            <PropertyItemDetailShow>
                
                Property Id: {propertyDetailInfoObj.property_id} <br/>
                Property Type: {propertyDetailInfoObj.prop_type} <br/>
                Property Status: {propertyDetailInfoObj.prop_status} <br/>
                Price of Property: {propertyDetailInfoObj.price} <br/>
                
                Address: {propertyDetailInfoObj.address.line} {propertyDetailInfoObj.address.city}
                         {propertyDetailInfoObj.address.state} <br/> 
                Postal Code: {propertyDetailInfoObj.address.postal_code} <br/> 
                
                # of Beds: {propertyDetailInfoObj.beds} <br/> 
                # of Bath: {propertyDetailInfoObj.baths} <br/> 

                {/* Lot Size:  {propertyDetailInfoObj.lot_size.size} {propertyDetailInfoObj.lot_size.units} <br/>  */}

                Agent Id: {propertyDetailInfoObj.agents[0].advertiser_id} <br/> 
                Agent: {propertyDetailInfoObj.agents[0].name} <br/> 
                {/* Agent Photo: <img src={propertyDetailInfoObj.agents[0].photo.href}/> <br/> */}

                RDC Web: {propertyDetailInfoObj.rdc_web} <br/> 


                
            </PropertyItemDetailShow>
            <MortgageCalButton onClick={(event)=>{
                                    event.preventDefault(); //to remove default function from parent.
                                    navigator("/calcul-mortgage");
                                }}>
                Calculate Loan Repaying Schedule
            </MortgageCalButton>
        </PropertyItemDetailShowDiv>

        
    );

}

export default PropertyItemDetail;


const PropertyItemDetailShowDiv=styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: left;
    
    padding: 50px;
`

const PropertyItemDetailShow=styled.div`
    width: 100%;
    height: 100%;

    
`

const MortgageCalButton=styled.button`
    width: 250px;
    height: 50px;

    font-weight: bold;
    color: white;
    
    background-color: var(--menu-button-background-color);
    
    &:hover{
        cursor: pointer;
        background-color: grey;
    }
`