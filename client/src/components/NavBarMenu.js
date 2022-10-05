import styled from "styled-components";

import {Link} from "react-router-dom";

const NavBarMenu=()=>{
    
    return (

        <NavBarMenuDiv>
            <MenuUl>
                <MenuLI>                    
                    <StyledLink to="/" active="true">Property Search</StyledLink>
                </MenuLI>
                <MenuLI>                    
                    <StyledLink to="/calcul-mortgage">Calculation Mortgage</StyledLink>                    
                </MenuLI>
                <MenuLI>                    
                    <StyledLink to="/userfeedback">User's Feedback</StyledLink>                    
                </MenuLI>
            </MenuUl>
        </NavBarMenuDiv>

    );

}

const NavBarMenuDiv=styled.div`

    /* border: 1px solid yellow; */
    
`

const MenuUl=styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center; 
`

const MenuLI=styled.li`
    background-color: var(--menu-button-background-color);
    color: white;    
    padding: 10px 20px;
    margin: 0px 10px;
    font-weight: bold;

    border-radius: 5px;

    &:hover{
        background-color: black;
    }
`

const MenuItemDiv=styled.div`
`

const StyledLink=styled(Link)`
    text-decoration: none;       
    color: white;    
    
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;              
    }    
`

export default NavBarMenu;