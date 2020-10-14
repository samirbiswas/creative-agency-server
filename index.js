const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 5000

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Well come to mongo and node!');
})


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://agencyUser:nE0GX8fJ7morkgH0@cluster0.xaiaa.mongodb.net/agencydb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("agencydb").collection("agency");
  console.log("database connected");


  app.post('/addData',(req, res)=>{
    const adddata = req.body;
    
    collection.insertOne(adddata)
    .then(result=>{
     
      res.send(result.insertedCount > 0);

    })
    
});


});





app.listen(port)