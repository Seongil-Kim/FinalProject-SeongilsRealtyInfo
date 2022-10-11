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
                            <PropertyDetailDiv>
                                <PropertyBasicInfoDiv>
                                
                                    Property Id: {propertyDetailInfoObj.property_id} <br/>
                                    Address: {propertyDetailInfoObj.address.line}, {propertyDetailInfoObj.address.city},&nbsp;
                                            {propertyDetailInfoObj.address.state} <br/> 
                                    Postal Code: {propertyDetailInfoObj.address.postal_code} <br/> 

                                    Property Type: {propertyDetailInfoObj.prop_type} <br/>
                                    Property Status: {propertyDetailInfoObj.prop_status} <br/>
                                    Price of Property: {propertyDetailInfoObj.price} <br/>
                                    Year Built: {propertyDetailPlus.properties[0].year_built}
                                
                                </PropertyBasicInfoDiv>                                
                                
                                {/* # of Beds: {propertyDetailInfoObj.beds} <br/> 
                                # of Bath: {propertyDetailInfoObj.baths} <br/>  */}

                                {/* Lot Size:  {propertyDetailInfoObj.lot_size.size} {propertyDetailInfoObj.lot_size.units} <br/>  */}

                                <PhotoTitleDiv>
                                    Photos
                                </PhotoTitleDiv>                             
                                
                                <PhotoGalleryDiv>
                                    <ReactScrollableFeed>
                                    {
                                        propertyDetailPlus.properties[0].photos.map((photo)=>{
                                            return <img src={photo.href} />
                                    })}
                                    </ReactScrollableFeed>
                                </PhotoGalleryDiv>

                                <DescrtiptionDiv>
                                    Description: <br/> {propertyDetailPlus.properties[0].description} <br/> 
                                </DescrtiptionDiv>                                

                                <FeatureTagsDiv>
                                    Feature Tags: <br/>
                                    {
                                        propertyDetailPlus.properties[0].feature_tags.map((featureTag)=>{
                                            return <span>#{featureTag} </span>
                                        })
                                    } 
                                </FeatureTagsDiv>
                                
                                <FeaturesDiv>
                                    Features: <br/>
                                                {
                                                    
                                                    propertyDetailPlus.properties[0].features.map((feature)=>{
                                                        return feature.text.map((sub_feature)=>{
                                                                    return <p>{sub_feature}</p>
                                                            })
                                                    })
                                                }
                                </FeaturesDiv>                               
                                
                                <AgentInfoDiv>
                                    Agent Id: {propertyDetailInfoObj.agents[0].advertiser_id} <br/> 
                                    Agent: {propertyDetailInfoObj.agents[0].name} <br/> 
                                    {/* Agent Photo: <img src={propertyDetailInfoObj.agents[0].photo.href}/> <br/> */}

                                    RDC Web: {propertyDetailInfoObj.rdc_web} <br/> 

                                    {/* Info From Property Detail fetched by property_id */}
                                    {/* Agent Office: <img src={propertyDetailPlus.properties[0].branding.listing_office.details.photo}/>  */}
                                    Agent Office: {propertyDetailPlus.properties[0].branding.listing_office.details.name} <br/> 
                                    Agent Phone: {propertyDetailPlus.properties[0].branding.listing_office.details.phone} <br/> 
                                    Agent Link: {propertyDetailPlus.properties[0].branding.listing_office.details.link} <br/> 
                                </AgentInfoDiv>

                                <ListingInfoDiv>
                                    Last Update: {propertyDetailPlus.properties[0].last_update} <br/> 
                                    Listing Status: {propertyDetailPlus.properties[0].listing_status} <br/>
                                </ListingInfoDiv>

                                <MortgageCalButton onClick={(event)=>{
                                        event.preventDefault(); //to remove default function from parent.
                                        navigator("/calcul-mortgage");
                                    }}>
                                    Calculate Loan Repaying Schedule
                                </MortgageCalButton>                          
                                
                                <PropertyHistoryDiv>
                                    Property History: {propertyDetailPlus.properties[0].property_history.map((history)=>{
                                        return <p>
                                                {/* <span>Data Source Name: {history.datasource_name}</span> &nbsp; */}
                                                <span>Date: {history.date}</span>, &nbsp;
                                                <span>{history.event_name}</span>, &nbsp;
                                                <span>{history.price}</span>
                                            </p>
                                    })}
                                </PropertyHistoryDiv>
                                
                                <TaxHistoryDiv>
                                    Tax History<br/>
                                    <ReactScrollableFeed>
                                        {
                                            propertyDetailPlus.properties[0].tax_history.map((taxByYear)=>{
                                                return (
                                                    <div>
                                                        Year: {taxByYear.year}, &nbsp;
                                                        Price Accessment- &nbsp;
                                                        Building: {taxByYear.assessment.building}, &nbsp;
                                                        Land: {taxByYear.assessment.land}, &nbsp;
                                                        Total: {taxByYear.assessment.total}, &nbsp;
                                                        Tax: {taxByYear.tax}&nbsp;
                                                    </div>
                                                )                      
                                            })
                                        }
                                    </ReactScrollableFeed>
                                </TaxHistoryDiv>                         
                            </PropertyDetailDiv>
                        }
                        
                        
                        {/* Info from Rate Info fetched by zip code and property price(assumed 80% loan percent) */}
                        {rateInfo &&                            
                            
                            <RateInfoDiv>
                                <RateInfoTitleDiv>
                                    Rate Info
                                </RateInfoTitleDiv>
                                
                                <RateInfoContainer>
                                    
                                    <ReactScrollableFeed>
                                        
                                        {/* {rateInfo.disclosures.advertising_disclosure}<br/>
                                        {rateInfo.disclosures.rate_disclosure}<br/> */}
                                        {rateInfo.rates.length!==0 ? 
                                            rateInfo.rates.map((rate)=>{                                    
                                                return  (                                            
                                                        <RateInfoItemDiv>
                                                            Advertiser: {rate.advertiser}, &nbsp;
                                                            Loan Type: {rate.loanTypeDisplayName}, &nbsp;
                                                            Suggested Rate: {rate.rate}, &nbsp;                                        
                                                            Loan Fee: {rate.loanFees}<br/>                                        
                                                        </RateInfoItemDiv>                                            
                                                )
                                            })
                                            :
                                            <NoInfoDiv>
                                                There is no information on interest rate.
                                            </NoInfoDiv>
                                        }
                                    </ReactScrollableFeed>
                                </RateInfoContainer>
                            </RateInfoDiv>
                        }

                    </ReactScrollableFeed>
                    
                    

                </PropertyItemDetailShow>
            
            
        </PropertyItemDetailShowDiv>

        
    );

}

export default PropertyItemDetail;


const PropertyItemDetailShowDiv=styled.div`
    width: 99%;
    height: calc(100% + 50px);

    background-color: #ab7bed;
    /* background-color: yellow; */
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
    height: 100%;
`

const PropertyDetailDiv=styled.div`

`

const PropertyBasicInfoDiv=styled.div`
    width: 50%;
    /* height: 120px; */

    background-color: #1e0242;
    border-radius: 10px;
    padding: 10px 0 10px 10px;
    
`

const PhotoTitleDiv=styled.div`
    width: 70px;
    height: 45px;

    background-color: #0a85f7;
    border-radius: 10px;
    padding: 10px;    
    
    position: relative;
    top: 10px;
    z-index: 0;
`

const PhotoGalleryDiv=styled.div`
    width: 68%;
    height: 305px;

    background-color: white;

    padding-left: 5px;

    position: relative;
    z-index: 1;   
`

const DescrtiptionDiv=styled.div`
    width: 68%;
    /* height: 160px; */

    background-color: #5c1ce6;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
`

const FeatureTagsDiv=styled.div`
    width: 68%;
    /* height: 160px; */

    background-color: #401bf7;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
`

const FeaturesDiv=styled.div`
    width: 40%;
    /* height: 160px; */

    background-color: #401bf7;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
`

const AgentInfoDiv=styled.div`
    width: 50%;
    height: 120px;

    background-color: #9264f5;
    border-radius: 10px;
    padding: 10px 0 10px 10px;
    margin-top: 10px;
`

const ListingInfoDiv=styled.div`
     width: 50%;
    /* height: 160px; */

    background-color: #c6a2f5;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
`

const PropertyHistoryDiv=styled.div`
    width: 83%;
    /* height: 45px; */

    background-color: #8d14a8;
    border-radius: 10px;
    padding: 10px;
    
    position: relative;
    margin-top: 10px;
    
`

const TaxHistoryDiv=styled.div`
    width: 83%;
    /* height: 250px; */

    background-color: #6d1182;
    border-radius: 10px;

    padding: 10px;

    margin-top: 10px;
`

const MortgageCalButton=styled.button`
    width: 250px;
    height: 50px;

    font-weight: bold;
    color: white;
    
    background-color: var(--menu-button-background-color);

    border: 1px solid black;
    border-radius: 10px;


    margin-top: 10px;
    
    &:hover{
        cursor: pointer;
        background-color: #c41cd6;
    }
`

const RateInfoDiv=styled.div`

    width: 83%;
    height: 400px;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: left;
    
    padding-top: -20px;

`

const RateInfoTitleDiv=styled.div`
    width: 90px;
    height: 45px;

    background-color: #dd16f7;
    border-radius: 10px;
    padding: 10px;  
    
    position: relative;
    z-index: 0;
    top: 30px;
    
`

const RateInfoContainer=styled.div`
    width: 100%;
    height: 310px;
    background-color: purple;
    padding: 0;
    margin: 20px 0;

    position: relative;
    z-index: 1;
`

const RateInfoItemDiv=styled.div`
    width: 97%;
    height: 50px;
    background-color: #3c4502;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    padding-left: 5px;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: left;

    
`

const NoInfoDiv=styled.div`
    margin: 10px 0px 10px 10px;
    padding: 5px 0px 0px 5px;
`