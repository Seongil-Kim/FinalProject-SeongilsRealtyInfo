// API Info: https://rapidapi.com/apidojo/api/realty-in-us/

import { useEffect } from "react";

function App() {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0494b40be9msh640180524ca3679p12f607jsnd957a78e053a',
      'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
    }
  };  

  useEffect(()=>{
    fetch('https://realty-in-us.p.rapidapi.com/agents/get-profile?advertiser_id=1633379&nrds_id=150577018', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
  
  },[]);  

  return(
    <h1>haha</h1>
  );

}
    

export default App;
