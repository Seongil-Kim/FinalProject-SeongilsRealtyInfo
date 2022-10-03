const {MongoClient}=require("mongodb");

require("dotenv").config();

// console.log(process.env.MONGO_URI);

const { MONGO_URI } = process.env;
// console.log(MONGO_URI);

const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

const {v4:uuid4}=require("uuid");
let idArray=[];
for (let i=0; i<10; i++)
{
    idArray.push(uuid4());
}
console.log(idArray);

// At first, we serve 10 cities.
const searchArea=[    
    {   
        _id: idArray[0],
        city: "New York City",
        stateCode: "NY"
    },
    {
        _id: idArray[1],
        city: "Los Angeles",
        stateCode: "CA"
    },
    {
        _id: idArray[2],
        city: "Chicago",
        stateCode: "IL"
    },
    {
        _id: idArray[3],
        city: "Houston",
        stateCode: "TX"
    },
    {
        _id: idArray[4],
        city: "Phoenix",
        stateCode: "AZ"
    },
    {
        _id: idArray[5],
        city: "Philadelphia",
        stateCode: "PA"
    },
    {
        _id: idArray[6],
        city: "San Antonio",
        stateCode: "TX"
    },
    {
        _id: idArray[7],
        city: "San Diego",
        stateCode: "CA"
    },
    {
        _id: idArray[8],
        city: "Dallas",
        stateCode: "TX"
    },
    {
        _id: idArray[9],
        city: "San Jose",
        stateCode: "CA"
    }

]
     
const dbFunction = async (dbName) => {   

    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    await db.collection("SearchArea").insertMany(searchArea);

    // close the connection to the database server
    client.close();
    console.log("disconnected!");
};


dbFunction("Seongils_RealtyInfo");