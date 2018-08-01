const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const fs = require('fs');

// first argument is the perseus xml file
const inputPath = process.argv[2];
// second is the output file to create/write to
const outputPath = process.argv[3];

fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
        console.log("ERROR: ");
        console.log(err);
    }

    const doc = new dom().parseFromString(data);
    const table = xpath.select("table", doc)[0];
    console.log("table: ", table);
    // const rows = xpath.select("//tr", table);
    // console.log(rows);
});