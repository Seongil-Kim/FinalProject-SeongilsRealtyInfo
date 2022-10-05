import {createContext, useReducer, useEffect} from "react";

export const CityContext=createContext(null);


const initialState={    
    currentUser: null,
    cityList: null,
    cityPropertyObjArray: new Array(),
    searchResultObj: null    
};

const reducer=(state,action) => {
    switch (action.type){        

        case ("save-city-list"):
        {
            // console.log("context city list: ", action.cityList);
            return {...state, cityList: action.cityList};
        }

        case ("save-property-list"):
        {
            console.log("City Property Obj Array: ", state.cityPropertyObjArray);
            return {...state, cityPropertyObjArray: [...state.cityPropertyObjArray, action.cityPropertyObj]};
        }

        default:
            console.log("default");
    }
}

export const CityProvider=({children})=>{

    const [state, dispatch]=useReducer(reducer,initialState);

    // useEffect(()=>{

    //     fetch("/api/me/profile")
    //     .then((res)=>res.json())
    //     .then((data)=>{            
        
    //     })
    //     .then((data)=>{
          
    //     })
    //     .catch((error)=>{
    //       console.error("Error: ", error);
    //     });


    // },[]);

    const saveCityListToContext=(cityList)=>{
        
        dispatch(
            {
            type: "save-city-list",
            cityList: cityList
        });
    }

    const saveCityPropertyListContext=(cityPropertyObj)=>{
        
        dispatch(
            {
            type: "save-property-list",
            cityPropertyObj: cityPropertyObj
        });
    }

    return (
        <CityContext.Provider
            value={{state, 
                    action: {
                        saveCityListToContext,
                        saveCityPropertyListContext
            }}}
        >
            {children}
        </CityContext.Provider>
    );

}