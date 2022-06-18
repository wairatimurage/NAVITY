const { db } = require("../models/pilotModel");

db.pilots.insertMany([
  {
    name: "Rubani",
    accountType: "pilot",
    email: "waAnga@x.com",
    insured: true,
    liscenced: { status: true, expiry: "" },
    mailingList: true,
    professional: true,
    telephone: "+25471111111111",
    website: "waanga.com",
    password: "mkuu",
    logo: "",
    bio: {
      description:
        "iRed® is revolutionising how people and companies do inspections. Founded in 2002, our team of industry experts use thermal imaging, multispectral, photogrammetry and drone deployment technologies to deliver surveys, training and equipment solutions nationwide. Specifically designed for new and experienced drone pilots looking to extend their skills, we’re proud to have the largest range of industry-focused drone courses available in the UK. iRed is a DJI Enterprise Partner, CAA Approved NQE, and leading supplier of specialist drone platforms, sensors, and enterprise support.",
      services: ["Aerial Photography", "Crop Spraying", "Aerial Inspection"],
      dronesFlown: ["Quad-copter"],
      rating: [],
    },
    socials: {
      instagram: "example.com",
      twitter: "example.com",
      linkedIn: "example.com",
    },
    locations: ["Baringo, Nairobi, Uasin-Gishu"],
    reviews: [{ name: "Andy", comment: "blaah blaah", rating: 3 }],
  },
]);
