const { db } = require("../models/quoteModel");

db.quotes.insertMany([
  {
    name: "mtu",
    email: "mtu@x.com",
    telephone: "+254711111111",
    location: "Uasin Gishu",
    service: { type: Object },
    date: { type: Object },
  },
]);
