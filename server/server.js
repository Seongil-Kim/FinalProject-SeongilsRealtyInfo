const port = 8000;

const express = require("express");
const helmet = require("helmet");
const morgan = require('morgan');

const {
    testGet,
    getCityList,
    getRealtyInfoFeedOnCity,
    calculMortgage,
    saveUserFeedback
  } = require("./handlers");

express()
    .use(helmet())
    .use(morgan('tiny'))
    // .use(express.static("public"))
    .use(express.json())
    // .use(express.urlencoded({ extended: false }))
    // .use("/", express.static(__dirname + "/"))

    // .get('/', (req, res) => {          
    //       res.status(200).json({status: 200, message: "Seongil's RealtyInfo"})
    //     }
    // )
    
    //get city list which <<Seongil's RealtyInfo>> provides services.
    .get("/api/test", testGet)
    .get("/db/city-list", getCityList)
    .get("/api/realty-info-feed/:city", getRealtyInfoFeedOnCity)
    .post("/api/calcul-mortgage",calculMortgage)
    .post("/db/user-feedback", saveUserFeedback)


    // this is our catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    // handle 404s(MongoDB 1)
    // .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))
    
    .listen(port, () => {
        console.log(`Server launched on port ${port}`)
    }); 