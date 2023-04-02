const express = require("express");

const quoteRoutes = (Quote) => {
  const quoteRouter = express.Router();
  quoteRouter
    .route("/")
    .get((req, res) => {
      Quote.findAll()
        .then((quotes) => {
          const returnQuotes = quotes.map((quote) => {
            const newQuote = quote.toJSON();
            delete newQuote.__v;
            return newQuote;
          });
          return res.status(304).json(returnQuotes);
        })
        .catch((err) => {
          if (err) {
            return res.send(err);
          }
        });
    })
    .post((req, res) => {
      Quote.create(req.body)
        .then((quote) => {
          res.status(201).json(quote);
        })
        .catch((err) => {
          res.send(err);
        });
    });

  return quoteRouter;
};

module.exports = quoteRoutes;
