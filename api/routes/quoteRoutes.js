const express = require("express");

const quoteRoutes = (Quote) => {
  const quoteRouter = express.Router();
  quoteRouter
    .route("/")
    .get((req, res) => {
      Quote.find((err, quotes) => {
        if (err) {
          return res.send(err);
        }
        const returnQuotes = quotes.map((quote) => {
          const newQuote = quote.toJSON();
          delete newQuote.__v;
          return newQuote;
        });
        return res.status(304).json(returnQuotes);
      });
    })
    .post((req, res) => {
      const quote = new Quote(req.body);
      quote.save((err, quote) => {
        if (err) {
          res.send(err);
        }
        res.status(201).json(quote);
      });
    });

  return quoteRouter;
};

module.exports = quoteRoutes;
