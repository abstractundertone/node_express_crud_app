const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const dbName = 'quotes-db'
const url = 'mongodb://127.0.0.1:27017'

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  if (err) return console.log(err);
  db = client.db(dbName);
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)

  app.listen(3000, function() {
    console.log('Listening on port 3000');
  })
})

app.use(bodyParser.urlencoded({extended: true}))

app.post('/quotes', (req, res) => {
  db.collection('quotes').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database');
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find().toArray((err, result) => {
    if(err) return console.log(err);

    res.render('index.ejs', {quotes: result})
  })
})

app.set('view engine', 'ejs')