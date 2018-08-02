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
    const rows = xpath.select("//tr", table);

    let anki = {};

    rows.forEach(row => {
        const greek = xpath.select("string(.//td[2]/a)", row);
        const english = xpath.select("string(.//td[8])", row);
        if (!anki[greek]) {
            anki[greek] = english;
        } else {
            let newEnglish = anki[greek] + ", " + english;
            anki[greek] = newEnglish;
        }
    });

    let ankiString = "";

    Object.keys(anki).forEach(key => {
        let cardText = anki[key].replace(";", "").replace(",,", ",").replace(/,\n\s+/, ", ");
        ankiString += key + ";" + cardText + "\r\n";
    });

    fs.writeFile(outputPath, ankiString, err => {
        if (err) {
            console.log(err);
        }
        console.log("written!");
    });
});