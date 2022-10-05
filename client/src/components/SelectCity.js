import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import { useEffect, useState, useContext} from "react";

import {CityContext} from "./CityContext";



const SelectCity=({showPropertyListInCity})=>{

    // const [cityList,setCityList]=useState([]);

    const {state: {cityList}, action: {saveCityListToContext}}=useContext(CityContext); 

    useEffect(()=>{
        fetch("/db/city-list")
        .then((res)=>res.json())
        .then((data)=>{
            // console.log("citylistData: ", data);
            // setCityList(data.cityList);
            saveCityListToContext(data.cityList);
        })        
        .catch((error)=>{
            console.error("Error: ", error);
        // errorHandler("error-receive");
        });
    },[]);

    return (
        <>
            {cityList &&
                <CityListCombo onChange={showPropertyListInCity}>
                    {cityList.map((cityInfo)=>{
                        return <option>{cityInfo.city}</option>
                    })}
                </CityListCombo>
            }
        </>
    );
}

const CityListCombo=styled.select`
    width: 50%;
    height: 25px;
    
    background-color: grey;
    
`

export default SelectCity;