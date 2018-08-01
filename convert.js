const xml2js = require('xml2js');
const fs = require('fs');

// first argument is the perseus xml file
const inputPath = process.argv[2];
// second is the output file to create/write to
const outputPath = process.argv[3];

const charMap = {
    'a': 'α',
    'b': 'β',
    'c': 'ξ',
    'd': 'δ',
    'e': 'ε',
    'f': 'φ', 
    'g': 'γ',
    'h': 'η',
    'i': 'ι',
    'k': 'κ',
    'l': 'λ',
    'm': 'μ',
    'n': 'ν',
    'o': 'ο',
    'p': 'π',
    'q': 'θ',
    'r': 'ρ',
    's': 'σ',
    't': 'τ',
    'u': 'υ',
    'w': 'ω',
    'x': 'χ',
    'y': 'ψ',
    'z': 'ζ',
    '/': ''
};

fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    const parser = new xml2js.Parser();
    parser.parseString(data, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        Object.entries(result.frequencies).forEach(freq => {
            console.log(freq);
        });
    });
});