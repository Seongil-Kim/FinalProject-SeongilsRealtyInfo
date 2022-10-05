// API Info: https://rapidapi.com/apidojo/api/realty-in-us/

import { useEffect } from "react";

function App() {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 
      'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
    }
  };  

  useEffect(()=>{
    fetch('https://realty-in-us.p.rapidapi.com/properties/v2/detail?property_id=M2213041897', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
  
  },[]);  

  return(
    <h1>haha</h1>
  );

}
    

export default App;
