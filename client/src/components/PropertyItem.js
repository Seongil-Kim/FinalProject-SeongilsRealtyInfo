import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

const PropertyItem=({propertyItem, showDetail})=>{
    console.log("propertyItem: ", propertyItem);
    return (
        <PropertyItemDiv onClick={()=>{showDetail(propertyItem)}}>
            property id: {propertyItem.property_id}
        </PropertyItemDiv>
    );
}

const PropertyItemDiv=styled.div`
    width: 100%;
    height: 250px;

    box-sizing: border-box;
    border: 1px solid black;
    margin: 0;
    padding: 10px;

    background-color: yellow;

    &:hover{
        cursor:pointer;
        background-color: #28D44D;
    }
    
`

export default PropertyItem;