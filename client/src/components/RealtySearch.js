import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import { useState, useContext } from "react";

import {CityContext} from "./CityContext";

import SelectCity from "./SelectCity";

const RealtySearch = () =>
{
    
    const {state: {cityList}}=useContext(CityContext); 
    
    const showPropertyInCity=(e)=>{
        // console.log("select target: ", e.target.value);
        const selectedCity=cityList.filter((city)=>{
            // console.log("city in function: ", city.city);
            return city.city===e.target.value;
        });

        // console.log("selected city: ", selectedCity);
        
        const stateOfCity=selectedCity[0].stateCode;
        
        // console.log("cityList: ", cityList);
        // console.log("state: ", stateOfCity);

        fetch(`/api/realty-info-feed/${selectedCity[0].city}?stateCode=${stateOfCity}`)
        .then((res)=>res.json())
        .then((data)=>{            
            console.log("feed data: ", data.realtyFeed);
        })        
        .catch((error)=>{
            console.error("Error: ", error);
        // errorHandler("error-receive");
        });
    }

    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '0494b40be9msh640180524ca3679p12f607jsnd957a78e053a',
          'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
        }
      };           
    
    //   useEffect(()=>{
    //     console.log("start");
    //     // fetch('https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=New%20York%20City&state_code=NY&offset=0&limit=200&sort=relevance', options)
    //     fetch('https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=Los%20Angeles&state_code=CA&offset=0&limit=200&sort=relevance', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));    
    //   },[]);

    return (
        <>
            <LeftSideSearch>

                <SelectCityDiv>           
                    <SelectCity showPropertyInCity={showPropertyInCity} />
                </SelectCityDiv>

                <CityPropertyFetchResultDiv>

                </CityPropertyFetchResultDiv>

            </LeftSideSearch>
                        
            <RightSideDetail>
                
            </RightSideDetail>
        </>
    )
    
}

const LeftSideSearch=styled.div`
    width: 20%;
    height: 100%;
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
    /* height: calc(100%-50px); */
    
    
    background-color: yellow;

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
`

export default RealtySearch;