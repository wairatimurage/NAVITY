const fs = require("fs");
const path = require("path");
const tinify = require("tinify");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

function tinifyImage(baseString, destinationPath) {
  tinify.key = process.env.TINIFY_API_KEY;
  const buf = Buffer.from(baseString, "base64");

  return new Promise((resolve, reject) =>
    tinify.fromBuffer(buf).toBuffer(function (err, resultData) {
      if (err) reject(err);
      return resolve(
        fs.writeFileSync(destinationPath, resultData, {
          encoding: "base64",
        })
      );
    })
  );
}

function tinifyBase64(baseString) {
  // returns a base 64 string result
  tinify.key = process.env.TINIFY_API_KEY;
  const buf = Buffer.from(baseString, "base64");

  return new Promise((resolve, reject) =>
    tinify.fromBuffer(buf).toBuffer(function (err, resultData) {
      if (err) reject(err);
      return resolve(resultData);
    })
  );
}

module.exports = { tinifyImage, tinifyBase64 };
