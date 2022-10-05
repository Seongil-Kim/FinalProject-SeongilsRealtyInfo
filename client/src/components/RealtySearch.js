import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import { useState, useContext } from "react";

import {CityContext} from "./CityContext";

import SelectCity from "./SelectCity";
import PropertyItem from "./PropertyItem";
import PropertyItemDetail from "./PropertyItemDetail";

const RealtySearch = () =>
{
    
    const {state: {cityList, cityPropertyObjArray},
           action: saveCityPropertyListContext}=useContext(CityContext); 
    
    const [propertyListObjsInCity, setPropertyListObjInCity]=useState([]);
    const [propertyItemForDetail, setPropertyItemForDetail]=useState(null);

    const showPropertyListInCity=(e)=>{
        
        e.preventDefault(); //to remove event handler from parent.
        // console.log("select target: ", e.target.value);
        const selectedCity=cityList.filter((city)=>{
            // console.log("city in function: ", city.city);
            return city.city===e.target.value;
        });

        console.log("selected city: ", selectedCity);
        
        const stateOfCity=selectedCity[0].stateCode;
        
        // console.log("cityList: ", cityList);
        // console.log("state: ", stateOfCity);

        fetch(`/api/realty-info-feed/${selectedCity[0].city}?stateCode=${stateOfCity}`)
        .then((res)=>res.json())
        .then((data)=>{            
            // console.log("feed data: ", data.realtyFeed);
            // const cityPropertyObj={
            //     [selectedCity[0].city]: data.realtyFeed.properties
            // }
            // console.log("cityPropertyObj: ", cityPropertyObj);
            // saveCityPropertyListContext(cityPropertyObj);
            console.log("data properties: ", data.realtyFeed.properties);
            setPropertyListObjInCity(data.realtyFeed.properties);
        })        
        .catch((error)=>{
            console.error("Error: ", error);
        // errorHandler("error-receive");
        });
    }

    console.log("Property List Object In the City: ", propertyListObjsInCity);

    // const showPropertyDetailOnRightSide=(e, property)=>{
    //     console.log("target: ", e.target.innerText);        
    //     setPropertyItemForDetail(property);        
    // }

    console.log("state variable-propertyItemForDetail: ", propertyItemForDetail);

    
    
    return (
        <>
            <LeftSideSearch>

                <SelectCityDiv>           
                    <SelectCity showPropertyListInCity={showPropertyListInCity} />
                </SelectCityDiv>

                <CityPropertyFetchResultDiv>
                    {propertyListObjsInCity.length!==0? 
                        propertyListObjsInCity.map((property)=>{
                            // return <PropertyItem propertyItem={property} 
                            //         showDetail={showPropertyDetailOnRightSide}/>
                            return <PropertyItem propertyItem={property} 
                                       showDetail={setPropertyItemForDetail}/>
                        })
                        :
                        null                        
                     }
                </CityPropertyFetchResultDiv>

            </LeftSideSearch>
                        
            <RightSideDetail>
                {propertyItemForDetail &&
                    <PropertyItemDetail propertyDetailInfoObj={propertyItemForDetail} />
                } 
            </RightSideDetail>
        </>
    )
    
}

const LeftSideSearch=styled.div`
    width: 20%;
    height: 100%;
    background-color: yellow; 
`
const SelectCityDiv=styled.div`
    width: 100%;
    height: 50px;    
    
    background-color: red;
    

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`

const CityPropertyFetchResultDiv=styled.div`
    width: 100%;
    height: calc(100% - 50px);    
    
    background-color: brown;    
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
`

const RightSideDetail=styled.div`
    width: 80%;
    height: 100%;
    background-color: black;

    color: white;
`

export default RealtySearch;