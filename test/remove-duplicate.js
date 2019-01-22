const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    historySize: 0
});

let tempSymbol = '';

rl
    .on('line', symbol => {
        if (!tempSymbol) {
            tempSymbol = ' ';
            return;
        }

        if (tempSymbol === symbol) {
            return;
        }

        tempSymbol = symbol;

        process.stdout.write(symbol + '\n');
    });
