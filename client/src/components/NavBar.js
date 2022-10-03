import styled from "styled-components";

import { useAuth0 } from '@auth0/auth0-react';

import NavBarMenu from "./NavBarMenu";

const NavBar=({isUser})=>{
    
    const 
    {
        isAuthenticated,
        loginWithRedirect,
        logout,
        user,
        isLoading
    } = useAuth0();

    // const isUser=isAuthenticated && user;

    console.log("test: ", {isAuthenticated, loginWithRedirect, logout, user, isLoading});

    return (
        <>
            <PageTitle>Seongil's RealtyInfo</PageTitle>
        
            {!isUser ?
                
                // <LogSignInOutButton backColor={var(--button-background-color)} onClick={loginWithRedirect}>Login/Signup</LogSignInOutButton>       
                <LogSignInOutButton backColor={"#8D45FA"} onClick={loginWithRedirect}>Login/Signup</LogSignInOutButton>
            :   
                <> 
                    <NavBarMenu />
                    <LogSignInOutButton backColor={"blue"} onClick={()=>{
                            logout({returnTo: window.location.origin})
                    }}>Logout</LogSignInOutButton>
                </>
            }
        </>        
    );
}

// const NavBar = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-wrap: nowrap;
//   justify-content: flex-start;
//   align-items: center; 
// `

const PageTitle=styled.p`
    font-size: var(--header-font-size);
    font-family: var(--heading-font-family);
    font-weight: bold;
    color: var(--header-font-color);   
    
    padding-left: var(--header-padding-lr);
`
const LogSignInOutButton=styled.button`

    width: var(--logsign-button-width);
    height: var(--button-height);

    background-color: ${p=>p.backColor};

    font-size: var(--button-font-size);
    font-weight: bold;
    color: var(--button-font-color);
    
    border: 0px;
    border-radius: var(--button-border-radius);

    &:hover{
        cursor: pointer;
        transform: scale(1.05);
    }
`



export default NavBar;