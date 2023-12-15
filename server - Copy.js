const server = require("express")
const App = server()

const {MongoClient}  = require("mongodb");

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url)

App.listen(5100 , ()=>
{
    console.log("Server is started succefully")
})

App.get("/" , (req , res) =>
{
    res.send("welcome to server")
})


async function getConnection()
{
    let res = await client.connect();

    let db = res.db("marvellousDb");

    let collection = db.collection("Student");

    let data = await collection.find().toArray();

    return data;

}

let data = getConnection();

App.get("/getDetails" , (req ,res)=>
{
    res.json(data);
    console.log(data);
})