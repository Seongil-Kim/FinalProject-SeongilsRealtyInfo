import styled from "styled-components";

const FrontShowImageBox=(realtyInfoObj)=>{
    

    return(
        <Wrapper>
            <Location><TitleP>New York</TitleP></Location>
            <InfoDetail realtyInfo={realtyInfoObj.realtyInfo}></InfoDetail>
        </Wrapper>
    );

}

const Wrapper=styled.div`

  position: relative;

  width: 250px;
  height: 500px;
  
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center; 
  
  /* border: 1px solid yellow; */
  z-index: 1;

`

const Location=styled.div`
    width: 100%;
    height: 19%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center; 

    background-color: #8D71B8;

    font-weight: bold;

    position: absolute;
    border-radius: 10px;    
    margin-bottom: 480px;

`

const TitleP=styled.div`
    z-index: 0;
`

const InfoDetail=styled.div`
    width: 100%;
    height: 80%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center; 

    background-color: #8D71B8;

    background-image: url(${p=>p.realtyInfo});
    background-size: cover;

    z-index: 1;
    
`



export default FrontShowImageBox;