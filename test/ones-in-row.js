const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

const neededSymbol = '1';

let max = 0;
let candidate = 0;
let isFirst = true;

rl
    .on('line', symbol => {
        console.log(symbol);

        if (isFirst) {
            isFirst = false;
            return;
        }

        if (symbol === neededSymbol) {
            candidate += 1;
            return;
        }

        if (candidate > max) {
            max = candidate;
        }

        candidate = 0;
    })
    .on('close', () => {
        if (candidate > max) {
            max = candidate;
        }

        process.stdout.write(max.toString());
    });
