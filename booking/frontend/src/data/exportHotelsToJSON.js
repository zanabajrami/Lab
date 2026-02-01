import fs from "fs";
import { hotels } from "./HotelsDataStrings.js"; 

fs.writeFileSync("hotels.json", JSON.stringify(hotels, null, 2));
console.log("✅ hotels.json u krijua me sukses!");
