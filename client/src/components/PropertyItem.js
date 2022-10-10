import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";



const PropertyItem=({propertyItem, showDetail})=>{
    console.log("propertyItem: ", propertyItem);
    return (
        <PropertyItemDiv onClick={()=>{showDetail(propertyItem)}}>
            Address: {propertyItem.address.line}, {propertyItem.address.city},&nbsp; 
                     {propertyItem.address.state_code} <br/>
            Price: ${propertyItem.price} <br/>
            Type: {propertyItem.prop_type} <br/>
            Beds: {propertyItem.beds}, Bath: {propertyItem.baths}
        </PropertyItemDiv>
    );
}

const PropertyItemDiv=styled.div`
    width: 100%;
    height: 500px;

    box-sizing: border-box;
    border: 1px solid #d7aef2;
    margin: 0;
    padding: 10px;
    color: white;

    background-color: #9e54f7;

    &:hover{
        cursor:pointer;
        background-color: #d3baf5;
    }
    
`

export default PropertyItem;