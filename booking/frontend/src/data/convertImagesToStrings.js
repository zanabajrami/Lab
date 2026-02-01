const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'HotelsData.js');
let content = fs.readFileSync(filePath, 'utf-8');

// Kthe import-et e fotove në array string
// import hotel1 from "../images/hotel1.jpg";
content = content.replace(/import\s+(\w+)\s+from\s+['"](.+?\.(jpg|jpeg|png|webp))['"];?/g, '');

// Zëvendëso variablat në array images me string
// [hotel1, hotel1_1, hotel1_2] -> ["../images/hotel1.jpg","../images/hotel1_1.jpg","../images/hotel1_2.jpg"]
content = content.replace(/images:\s*\[([^\]]+)\]/g, (match, p1) => {
    const imgs = p1.split(',').map(i => i.trim());
    const strings = imgs.map(v => `"../images/${v}.jpg"`); // ose .jpeg/.png nëse duhet
    return `images: [${strings.join(',')}]`;
});

// Ruaj versionin e modifikuar si file i ri
fs.writeFileSync(path.join(__dirname, 'HotelsDataStrings.js'), content);

console.log('✅ HotelsDataStrings.js u krijua me paths të string.');
