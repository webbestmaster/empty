const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    historySize: 0
});

let tempSymbol = '';
let isFirst = true;

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

        process.stdout.write(symbol + '\n');
    });
