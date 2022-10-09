import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import {useNavigate} from 'react-router-dom';

import { useState, useEffect } from "react";

const PropertyItemDetail=({propertyDetailInfoObj})=>{

    const navigator=useNavigate();
    const [additionalInfo, setAdditionalInfo]=useState(null);

    // If those are in useEffect with a vacant array, the detail page is not updated except for the first click for an element, 
    // because every code in useEffect runs only once.
    useEffect(()=>{

        // const promises=[];
        
        // The data from basic property detail which is included in prop will be showed without delay.
        // But additional data from fetching will be showed later.
        const propertyDetail=fetch(`/api/realty-info-detail/${propertyDetailInfoObj.property_id}`)
        .then((res)=>res.json())
        .then((data)=>{            
            console.log("property detail: ", data.propertyDetail);
            return data.propertyDetail;
        })        
        .catch((error)=>{
            console.error("Error: ", error);
        // errorHandler("error-receive");
        });

        // Request loan opportunity and interest info.
        const rateInfo=fetch(`/api/mortgage/check-rate?price=${propertyDetailInfoObj.price}&zip=${propertyDetailInfoObj.address.postal_code}`)
        .then((res)=>res.json())
        .then((data)=>{            
            console.log("Rate Info: ", data.rateInfo);  
            return data.rateInfo;        
        })        
        .catch((error)=>{
            console.error("Error: ", error);
        // errorHandler("error-receive");
        });

        // console.log("var_propertyDetail: ", propertyDetail);
        // console.log("var_rateInfo: ", rateInfo);       
        
        Promise.all([propertyDetail,rateInfo])
        .then((result)=>{
        console.log("result: ", result);
        setAdditionalInfo({propertyDetail: result[0], rateInfo: result[1]});
    });

    },[propertyDetailInfoObj]);

    

    return (
        <PropertyItemDetailShowDiv>

            {additionalInfo && 
                <PropertyItemDetailShow>
                    
                    {/* Info From Property List Element */}
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

                    {/* Info From Property Detail fetched by property_id */}
                    Agent Office: <img src={additionalInfo.propertyDetail.properties[0].branding.listing_office.details.photo}/> 
                                  {additionalInfo.propertyDetail.properties[0].branding.listing_office.details.name} <br/> 
                    Agent Phone: {additionalInfo.propertyDetail.properties[0].branding.listing_office.details.phone} <br/> 
                    Agent Link: {additionalInfo.propertyDetail.properties[0].branding.listing_office.details.link}
                    

                    {/* Info from Rate Info fetched by zip code and property price(assumed 80% loan percent) */}

                    
                </PropertyItemDetailShow>
            }
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