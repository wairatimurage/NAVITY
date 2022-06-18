const { db } = require("../models/pilotModel");

db.institutions.insertMany([
  {
    name: "Wa Anga",
    accountType: "institution",
    website: "https://www.x.com",
    logo: "",
    email: "wa-anga@x.com",
    password: "mkuu",
    telephone: [],
    liscenced: true,
    liscenceExpiry: "",
    mailingList: true,
    bio: {
      description:
        "iRed® is revolutionising how people and companies do inspections. Founded in 2002, our team of industry experts use thermal imaging, multispectral, photogrammetry and drone deployment technologies to deliver surveys, training and equipment solutions nationwide. Specifically designed for new and experienced drone pilots looking to extend their skills, we’re proud to have the largest range of industry-focused drone courses available in the UK. iRed is a DJI Enterprise Partner, CAA Approved NQE, and leading supplier of specialist drone platforms, sensors, and enterprise support.",
      services: ["Thermal Inspection", ""],
    },
    socials: {
      instagram: "example.com",
      twitter: "example.com",
      linkedIn: "example.com",
    },
    locations: ["Nairobi"],
    reviews: [{ name: "Andy", comment: "blaah blaah", rating: 3 }],
  },
]);
