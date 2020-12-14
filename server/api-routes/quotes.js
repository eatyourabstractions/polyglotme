const quotes = require("../data/quotes.json");

const getQuote = (req, res) => {
    console.log('getQuotes')
    const oneQuote = quotes[Math.floor(Math.random() * quotes.length)];
      try {
        res.status(200).json({ status: 200, data: oneQuote });
      } catch {
        (err) => {
          res.status(200).json({ status: 200, error: err });
        };
      }
    };


    module.exports = {
        getQuote,
   
    }