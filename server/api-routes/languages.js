
const phrases = require("../data/phrases.json");
const words = require('an-array-of-spanish-words');
const {getRandom} = require('./utils');



const getAllPhrases = (req, res) => {
  console.log('getAllPhrases')
    try {
      res.status(200).json({ status: 200, data: phrases });
    } catch {
      (err) => {
        res.status(200).json({ status: 200, error: err });
      };
    }
  };

  const getSomePhrases = (req, res) => {
    console.log('getSomePhrases')
    let num = req.param('num');
    const randomWords = getRandom( words.filter(w => w.length <= 7), 20)
    console.log('num => ', num)
    let myPhrases = getRandom(phrases, num)
      try {
        res.status(200).json({ status: 200, data: myPhrases, extraWords: randomWords });
      } catch {
        (err) => {
          res.status(200).json({ status: 200, error: err });
        };
      }
    };

  module.exports = {
      getAllPhrases,
      getSomePhrases
  }