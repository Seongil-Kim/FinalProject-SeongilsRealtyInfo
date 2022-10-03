// const fetch = require('node-fetch');
const request = require('request-promise');

const {MongoClient}=require("mongodb");

require("dotenv").config();

// console.log(process.env.MONGO_URI);

const { MONGO_URI, XRapidAPIKey } = process.env;
// console.log(MONGO_URI);

const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

const dbAccess={
    dbName: "Seongils_RealtyInfo",
    collectionName: "SearchArea"
}

const getCityList = async (req, res) => {


    // console.log("getCityList");
    const client = new MongoClient(MONGO_URI, options);

    try {
        // creates a new client
        
      
        await client.connect();
        
        const db = client.db(dbAccess.dbName);
              
        const cityList=await db.collection(dbAccess.collectionName).find().toArray();

        // console.log("city list: ", cityList); 
  
        cityList
        ? res.status(200).json({ status: 200, cityList: cityList })
        : res.status(404).json({ status: 404, message: "City List Not Found" });
  
    } 
    catch (err) {
        res.status(500).json({ status: 500, msg: "Server Error" });
    }
    finally {
        client.close();
    }     
    
};

const getRealtyInfoFeedOnCity= async (req, res) =>{
    const city=req.params.city;
    const stateCode=req.query.stateCode
    // console.log("city and state: ", `${city} ${stateCode}`);

    const options = {
        method: 'GET',
        url: 'https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale',
        qs: {
          city: 'San Jose',
          state_code: 'CA',
          offset: '0',
          limit: '10',
          sort: 'relevance'
        },
        headers: {
        'X-RapidAPI-Key': XRapidAPIKey,
        // 'X-RapidAPI-Key': '0494b40be9msh640180524ca3679p12f607jsnd957a78e053a',
        'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
          useQueryString: true
        }
      };
      
      
      const realtyFeed=await request(options, (error, response, body) => {
          if (error) throw new Error(error);        
        // console.log("body", body);
        // return JSON.parse(body.properties);
        // realtyFeed=response;
      });

    // const realtyFeed=await request(options);

    console.log("realtyFeed: ", realtyFeed);

    realtyFeed ?
          res.status(200).json({ status: 200, realtyFeed: realtyFeed })
        : res.status(404).json({ status: 404, message: "Realty Feed Not Found" });
    
}

const calculMortgage= async (req, res) =>{
    const calculBaseObj=req.body;
}

const saveUserFeedback= async (req, res) =>{
    const userFeedbackObj=req.body;
}

module.exports = {
    getCityList,
    getRealtyInfoFeedOnCity,
    calculMortgage,
    saveUserFeedback
};