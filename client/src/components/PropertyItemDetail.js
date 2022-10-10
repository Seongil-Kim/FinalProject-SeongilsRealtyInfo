import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import {useNavigate} from 'react-router-dom';

import { useState, useEffect } from "react";

import ReactScrollableFeed from 'react-scrollable-feed';

const PropertyItemDetail=({propertyDetailInfoObj})=>{

    const navigator=useNavigate();
    // const [additionalInfo, setAdditionalInfo]=useState(null);
    const [propertyDetailPlus, setPropertyDetailPlus]=useState(null);
    const [rateInfo, setRateInfo]=useState(null);

    // If those are in useEffect with a vacant array, the detail page is not updated except for the first click for an element, 
    // because every code in useEffect runs only once.
    useEffect(()=>{

        // const promises=[];
        
        // The data from basic property detail which is included in prop will be showed without delay.
        // But additional data from fetching will be showed later.
        // const propertyDetail=fetch(`/api/realty-info-detail/${propertyDetailInfoObj.property_id}`)
        // .then((res)=>res.json())
        // .then((data)=>{            
        //     console.log("property detail: ", data.propertyDetail);
        //     return data.propertyDetail;
        // })        
        // .catch((error)=>{
        //     console.error("Error: ", error);
        // // errorHandler("error-receive");
        // });

        fetch(`/api/realty-info-detail/${propertyDetailInfoObj.property_id}`)
        .then((res)=>res.json())
        .then((data)=>{            
            console.log("property detail: ", data.propertyDetail);
            setPropertyDetailPlus(data.propertyDetail);
        })        
        .catch((error)=>{
            console.error("Error: ", error);
        // errorHandler("error-receive");
        });

        // Request loan opportunity and interest info.
        // const rateInfo=fetch(`/api/mortgage/check-rate?price=${propertyDetailInfoObj.price}&zip=${propertyDetailInfoObj.address.postal_code}`)
        // .then((res)=>res.json())
        // .then((data)=>{            
        //     console.log("Rate Info: ", data.rateInfo);  
        //     return data.rateInfo;        
        // })        
        // .catch((error)=>{
        //     console.error("Error: ", error);
        // // errorHandler("error-receive");
        // });

        fetch(`/api/mortgage/check-rate?price=${propertyDetailInfoObj.price}&zip=${propertyDetailInfoObj.address.postal_code}`)
        .then((res)=>res.json())
        .then((data)=>{            
            console.log("Rate Info: ", data.rateInfo);  
            setRateInfo(data.rateInfo);
        })        
        .catch((error)=>{
            console.error("Error: ", error);
        // errorHandler("error-receive");
        });

        // console.log("var_propertyDetail: ", propertyDetail);
        // console.log("var_rateInfo: ", rateInfo);       
        
        // Promise.all([propertyDetail,rateInfo])
        // .then((result)=>{
        // // console.log("result: ", result);
        // setAdditionalInfo({propertyDetail: result[0], rateInfo: result[1]});
        // });

    },[propertyDetailInfoObj]);

    // console.log("additionalInfoObj: ", additionalInfo);

    console.log("propertyDetailPlus: ", propertyDetailPlus);
    console.log("rateInfo: ", rateInfo);
    

    return (
        <PropertyItemDetailShowDiv>

            
                <PropertyItemDetailShow>
                    
                    <ReactScrollableFeed>
                        {/* Info From Property List Element */}
                        {propertyDetailPlus && 
                            <div>
                                Property Id: {propertyDetailInfoObj.property_id} <br/>
                                Property Type: {propertyDetailInfoObj.prop_type} <br/>
                                Property Status: {propertyDetailInfoObj.prop_status} <br/>
                                Price of Property: {propertyDetailInfoObj.price} <br/>
                                
                                Address: {propertyDetailInfoObj.address.line}, {propertyDetailInfoObj.address.city},&nbsp;
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
                                {/* Agent Office: <img src={propertyDetailPlus.properties[0].branding.listing_office.details.photo}/>  */}
                                Agent Office: {propertyDetailPlus.properties[0].branding.listing_office.details.name} <br/> 
                                Agent Phone: {propertyDetailPlus.properties[0].branding.listing_office.details.phone} <br/> 
                                Agent Link: {propertyDetailPlus.properties[0].branding.listing_office.details.link} <br/> 

                                Description: {propertyDetailPlus.properties[0].description} <br/> 
                                Feature Tags: {
                                    propertyDetailPlus.properties[0].feature_tags.map((featureTag)=>{
                                        return <span>#{featureTag} </span>
                                    })
                                } <br/>
                                Feature: 
                                            {
                                                
                                                propertyDetailPlus.properties[0].features.map((feature)=>{
                                                    return feature.text.map((sub_feature)=>{
                                                                return <p>{sub_feature}</p>
                                                        })
                                                })
                                            } <br/> 

                                Last Update: {propertyDetailPlus.properties[0].last_update} <br/> 
                                Listing Status: {propertyDetailPlus.properties[0].listing_status} <br/> 
                                Photos: <br/>
                                {
                                    propertyDetailPlus.properties[0].photos.map((photo)=>{
                                        return <img src={photo.href} />
                                })} <br/>
                                
                                Property History: {propertyDetailPlus.properties[0].property_history.map((history)=>{
                                    return <p>
                                            {/* <span>Data Source Name: {history.datasource_name}</span> &nbsp; */}
                                            <span>Date: {history.date}</span>, &nbsp;
                                            <span>{history.event_name}</span>, &nbsp;
                                            <span>{history.price}</span>
                                        </p>
                                })} <br/> 

                                Tax History<br/>
                                {
                                    propertyDetailPlus.properties[0].tax_history.map((taxByYear)=>{
                                        return (
                                            <div>
                                                Year: {taxByYear.year}<br/>
                                                Price Accessment: <br/>
                                                Building: {taxByYear.assessment.building}<br/>
                                                Land: {taxByYear.assessment.land}<br/>
                                                Total: {taxByYear.assessment.total}<br/>
                                                Tax: {taxByYear.tax}<br/>
                                            </div>
                                        )                      
                                    })
                                }<br/>

                                Year Built: {propertyDetailPlus.properties[0].year_built}<br/><br/>
                            </div>
                        }
                        
                        Rate Info: <br/><br/>
                        {/* Info from Rate Info fetched by zip code and property price(assumed 80% loan percent) */}
                        {rateInfo &&                            
                            <RateInfoContainer>
                            
                                <ReactScrollableFeed>
                                    
                                    {/* {rateInfo.disclosures.advertising_disclosure}<br/>
                                    {rateInfo.disclosures.rate_disclosure}<br/> */}
                                    {rateInfo.rates.length!==0 ? 
                                        rateInfo.rates.map((rate)=>{                                    
                                            return  (                                            
                                                    <RateInfoDiv>
                                                        Advertiser: {rate.advertiser}, &nbsp;
                                                        Loan Type: {rate.loanTypeDisplayName}, &nbsp;
                                                        Suggested Rate: {rate.rate}, &nbsp;                                        
                                                        Loan Fee: {rate.loanFees}<br/>                                        
                                                    </RateInfoDiv>                                            
                                            )
                                        })
                                        :
                                        <NoInfoDiv>
                                            There is no information on interest rate.
                                        </NoInfoDiv>
                                    }
                                </ReactScrollableFeed>
                            </RateInfoContainer>
                            
                        }

                    </ReactScrollableFeed>                   
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
    width: 99%;
    height: 100%;

    background-color: #ab7bed;
    color: white;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: left;
    
    padding: 30px 0px 30px 30px;
`

const PropertyItemDetailShow=styled.div`
    width: 100%;
    height: 95%;    
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

const RateInfoContainer=styled.div`
    width: 85%;
    height: 310px;
    background-color: purple;
    padding: 0;
    margin: 0;
`

const RateInfoDiv=styled.div`
    width: 97%;
    height: 50px;
    background-color: blue;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    padding: 5px 0px 0px 5px;
`

const NoInfoDiv=styled.div`
    margin: 10px 0px 10px 10px;
    padding: 5px 0px 0px 5px;
`