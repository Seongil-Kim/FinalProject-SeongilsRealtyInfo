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
    collectionNameSearchArea: "SearchArea",
    collectionNameFeedBack: "UserFeedBack"
}

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const getCityList = async (req, res) => {


    // console.log("getCityList");
    const client = new MongoClient(MONGO_URI, options);

    try {
        // creates a new client
        
      
        await client.connect();
        
        const db = client.db(dbAccess.dbName);
              
        const cityList=await db.collection(dbAccess.collectionNameSearchArea).find().toArray();

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
          city: city,
          state_code: stateCode,
          offset: '0',
          limit: '10',
          sort: 'relevance'
        },
        headers: {
        'X-RapidAPI-Key': XRapidAPIKey,        
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

    // console.log("realtyFeed: ", JSON.parse(realtyFeed));

    realtyFeed ?
          res.status(200).json({ status: 200, realtyFeed: JSON.parse(realtyFeed) })
        : res.status(404).json({ status: 404, message: "Realty Feed Not Found" });
    
}

const getRealtyInfoDetail= async (req, res) => {
  
  // console.log("parameter: ", req.params.propertyId);

  // Get Property Detail
  const options = {
    method: 'GET',
    url: 'https://realty-in-us.p.rapidapi.com/properties/v2/detail',
    qs: {property_id: req.params.propertyId},
    headers: {
      'X-RapidAPI-Key': XRapidAPIKey,
      'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
      useQueryString: true
    }
  };
  
  const propertyDetail=await request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    // console.log(body);
  });

  // console.log("server property detail: ", JSON.parse(propertyDetail));

  propertyDetail
        ? res.status(200).json({ status: 200, propertyDetail: JSON.parse(propertyDetail) })
        : res.status(404).json({ status: 404, message: "City List Not Found" });
}

const getRateInfo=async(req, res) =>{

  
  const query_price=req.query.price;
  const query_zip=req.query.zip;
  
  
  // console.log("query price: ", query_price);
  // console.log("query zip: ", query_zip);
  
  const options = {
    method: 'GET',
    url: 'https://realty-in-us.p.rapidapi.com/mortgage/check-rates',
    qs: {
      creditScore: 'excellent',
      points: 'all',
      loanPurpose: 'purchase',
      loanTypes: 'ALL',
      loanPercent: '80',
      propertyPrice: query_price,
      zip: query_zip
    },
    headers: {
      'X-RapidAPI-Key': '0494b40be9msh640180524ca3679p12f607jsnd957a78e053a',
      'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
      useQueryString: true
    }
  };
  
  const rateInfo=await request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    // console.log(body);
  });

  // console.log("server rateInfo: ", JSON.parse(rateInfo));

  rateInfo
        ? res.status(200).json({ status: 200, rateInfo: JSON.parse(rateInfo) })
        : res.status(404).json({ status: 404, message: "Interest Rate Info Not Found" });

}



const calculMortgage= async (req, res) =>{
    const calculBaseObj=req.body;
    // console.log("serverSide Calcul Obj: ", calculBaseObj);

    // It does not provide the right result. So I change it to other endpoints.
    // From mortgage/v2/calculate To mortgage/calculate(Deprecating)
    // const options = {
    //   method: 'GET',
    //   url: 'https://realty-in-us.p.rapidapi.com/mortgage/v2/calculate',
    //   qs: {
    //     home_insurance: req.body.insuranceCost,
    //     property_tax_rate: req.body.propertyTaxRate,
    //     down_payment: req.body.downPayment,
    //     price: req.body.realtyPrice,
    //     term: req.body.repayTerm,
    //     rate: req.body.interestRate,
    //     hoa_fees: req.body.hoaFee,
    //     apply_veterans_benefits: 'false'
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': XRapidAPIKey,
    //     'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
    //     useQueryString: true
    //   }
    // };

    const options = {
      method: 'GET',
      url: 'https://realty-in-us.p.rapidapi.com/mortgage/calculate',
      qs: {
        hoi: req.body.insuranceCost,
        tax_rate: req.body.propertyTaxRate,
        downpayment: req.body.downPayment,
        price: req.body.realtyPrice,
        term: req.body.repayTerm,
        rate: req.body.interestRate
      },
      headers: {
        'X-RapidAPI-Key': XRapidAPIKey,
        'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
        useQueryString: true
      }
    };
    
    const mortgageCalResult=await request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      // console.log("body: ", body);
    });

    console.log("fetch response: ", JSON.parse(mortgageCalResult));

    mortgageCalResult ?
          res.status(200).json({ status: 200, mortgageCalResult: JSON.parse(mortgageCalResult) })
        : res.status(404).json({ status: 404, message: "Calculation Result Not Found" });
}

const saveUserFeedback= async (req, res) =>{
    
    console.log("userFeedbackObj: ", req.body);

    const generatedId=uuidv4();

    const feedbackObj={_id: generatedId, ...req.body};

    const client = new MongoClient(MONGO_URI, options);

    try {
        // creates a new client
        
      
        await client.connect();
        
        const db = client.db(dbAccess.dbName);
              
        const feedbackSave=await db.collection(dbAccess.collectionNameFeedBack).insertOne(
          feedbackObj
         );

        // console.log("message: ", feedbackSave); 
  
        feedbackSave
        ? res.status(200).json({ status: 200, message: "We received your message." })
        : res.status(404).json({ status: 404, message: "City List Not Found" });
  
    } 
    catch (err) {
        res.status(500).json({ status: 500, msg: "Server Error" });
    }
    finally {
        client.close();
    }  
}

module.exports = {  
    getCityList,
    getRealtyInfoFeedOnCity,
    getRealtyInfoDetail,
    getRateInfo,
    calculMortgage,
    saveUserFeedback
};