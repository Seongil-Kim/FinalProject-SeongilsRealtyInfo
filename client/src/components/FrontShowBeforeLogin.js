import FrontShowImageBox from "./FrontShowImageBox"

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const FrontShowBeforeLogin=()=>{
    

    return (
        <>
            <Tippy content="If you sign in, you can get more realty information based on several cities.">
                <FrontShowImageBox realtyInfo={"/images/newyork1.jpg"}/>
            </Tippy>
            <Tippy content="If you sign in, you can get more realty information based on several cities.">
                <FrontShowImageBox realtyInfo={"/images/newyork2.jpg"}/>
            </Tippy>
            <Tippy content="If you sign in, you can get more realty information based on several cities.">
                <FrontShowImageBox realtyInfo={"/images/newyork3.jpg"}/>
            </Tippy>
        </>
    );

}

export default FrontShowBeforeLogin;