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
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xaiaa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
 const uri = "mongodb+srv://agencyUser:nE0GX8fJ7morkgH0@cluster0.xaiaa.mongodb.net/agencydb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("agencydb").collection("agency");
  const reviweCollection = client.db("agencydb").collection("products");
  const adminCollection = client.db("agencydb").collection("adminEmail");
  console.log("database connected");


  app.post('/addData',(req, res)=>{
    const adddata = req.body;
    
    collection.insertOne(adddata)
    .then(result=>{
     
      res.send(result.insertedCount > 0);

    })
    
});


app.get('/order', (req, res) => {
  collection.find({email: req.query.email})
      .toArray((err, documents) => {
          res.send(documents);
      })
});


app.post('/addreview',(req, res)=>{
  const reviewData = req.body;
  
  reviweCollection.insertOne(reviewData)
  .then(result=>{
   
    res.send(result.insertedCount > 0);

  });
  
});


app.get('/review', (req, res) => {
  reviweCollection.find({})
      .toArray((err,documents) => {
          res.send(documents);
      })
});

app.post('/adminAdd',(req, res)=>{
  const addAdmin = req.body;
  
  adminCollection.insertOne(addAdmin)
  .then(result=>{
   
    res.send(result.insertedCount > 0);

  })
  
});

});


app.listen(port)