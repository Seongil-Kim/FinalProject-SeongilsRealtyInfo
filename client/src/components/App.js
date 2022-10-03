import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

// import BackgroundImage from '/images/photo_montreal.jpg';

import NavBar from "./NavBar";
import FrontShowBeforeLogin from "./FrontShowBeforeLogin";
import RealtySearch from "./RealtySearch";
import CalculationMortgage from "./CalculationMortgage";
import UserFeedback from "./UserFeedback";

import { useAuth0 } from '@auth0/auth0-react';

const handleSubmit = (e, formData) => {
  
}

const App = () => {

  const 
  {
      isAuthenticated,  
      user,        
  } = useAuth0();

  const isUser=isAuthenticated && user;

  

  return ( 
    <RealtyInfoDiv>
      <GlobalStyles />
      
      <Router>
        <NavBarDiv>
          <NavBar isUser={isUser}/>
        </NavBarDiv>
        
        {
          !isUser ?          
          <BackgroundDiv>
            <FrontShowBeforLoginDiv>
              <Routes>
                <Route path="/" element={<FrontShowBeforeLogin />} />
              </Routes>
            </FrontShowBeforLoginDiv>
          </BackgroundDiv>
          :          
          <FrontShowAfterLoginDiv>                
              <Routes>
                <Route path="/" element={<RealtySearch />} />
                <Route path="/calcul-mortgage" element={<CalculationMortgage handleSubmit={handleSubmit}/>} />
                <Route path="/userfeedback" element={<UserFeedback handleSubmit={handleSubmit}/>} />                
              </Routes>
            
          </FrontShowAfterLoginDiv>         
         
        }
        </Router>
      
    </RealtyInfoDiv>   
    
  );
}

const RealtyInfoDiv = styled.div`

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* align-items: center;  */
`
const NavBarDiv = styled.div`
  
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center; 

  background-color: var(--primary-color);
  padding-right: var(--header-padding-lr);
  
`

const BackgroundDiv = styled.div`
  
  width: 100%;
  height: 90%;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center; 

  border: 1px solid black;

  /* background-image: url(--front-page-background-image); */
  background-image: url('/images/photo_montreal.jpg');
  background-size: cover;

  position: relative;
  z-index: -1;
`

const FrontShowBeforLoginDiv=styled.div`
  width: var(--front-show-panel-width);
  height: var(--front-show-panel-height);

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center; 

  /* border: 1px solid black; */
`

const FrontShowAfterLoginDiv=styled.div`
  width: 100%;
  height: 90%;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center; 
`



export default App;
