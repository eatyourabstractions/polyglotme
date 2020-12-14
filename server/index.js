"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {getAllPhrases, getSomePhrases} = require('./api-routes/languages')
const {getQuote} = require('./api-routes/quotes')


const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))


  .get('/getAllPrases', getAllPhrases)

  .get('/getSomePhrases/:num', getSomePhrases)

  .get('/getQuote', getQuote)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));