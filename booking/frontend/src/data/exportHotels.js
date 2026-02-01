require("@babel/register")({
  extensions: [".js", ".jsx"]
});

const fs = require("fs");
const { hotels } = require("./HotelsData");

fs.writeFileSync("hotels.json", JSON.stringify(hotels, null, 2));
console.log("Hotels JSON saved!");
