const { MongoClient, Batch } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url)

async function getConnection()
{
    let res =await client.connect();
    let db = res.db("marvellousDb");

    return db.collection("Student");
}



// read the data 
async function getData()
{
    let data = await getConnection();
    data =await data.find().toArray();
    console.log("Data is  : ");
    console.log(data);
}

// inserting the data 

async function insertData()
{
    let data = await getConnection();

    let result = await data.insertOne({Batch: 'Full stack Angular', Fees: 1000})

    if(result.acknowledged)
    {
        console.log("inserrting the data successfully")
    }
}

// update the data 
async function updateData()
{
    let data  =await getConnection();

    let res = data.updateOne({Batch : "PPA"} , {$set : {Batch: 'Full stack Angular/ javascript', Fees: 2000}});

    if(res.acknowledged)
    {
        console.log("Updating succesfully");
    }
}

//deleting the data
async function deleteData()
{
    let res  = await getConnection();
    let data  =res.deleteOne({"Name" : "Full stack Angular/ javascript"});

    if(data.acknowledged)
    {
        console.log("Deleting the data succfully");
    }
}


 function main()
{
    // insertData();
    // updateData();
    // deleteData();
    getData();

}

main()