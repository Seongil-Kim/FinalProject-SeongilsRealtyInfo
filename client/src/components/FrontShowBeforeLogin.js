import styled from "styled-components";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import FrontShowImageBox from "./FrontShowImageBox"

const FrontShowBeforeLogin=()=>{
    

    return (
        <>
            <StyledTippy content="If you sign in, you can get more realty information based on several cities.">
                <FrontShowImageBox realtyInfo={"/images/newyork1.jpg"}/>
            </StyledTippy>
            <StyledTippy content="If you sign in, you can get more realty information based on several cities.">
                <FrontShowImageBox realtyInfo={"/images/newyork2.jpg"}/>
            </StyledTippy>
            <StyledTippy content="If you sign in, you can get more realty information based on several cities.">
                <FrontShowImageBox realtyInfo={"/images/newyork3.jpg"}/>
            </StyledTippy>
        </>
    );

}

const StyledTippy=styled(Tippy)`
    background-color: black;
    color: white;
`

export default FrontShowBeforeLogin;