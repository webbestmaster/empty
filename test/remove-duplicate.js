const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let tempSymbol = '';
let isFirst = true;
const result = [];

rl
    .on('line', symbol => {
        if (isFirst) {
            isFirst = false;
            return;
        }

        if (tempSymbol === symbol) {
            return;
        }

        tempSymbol = symbol;

        result.push(symbol);
    })
    .on('close', () => {
        process.stdout.write(result.join('\n'));
    });
