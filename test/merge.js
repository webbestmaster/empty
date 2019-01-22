const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let isFirst = true;

const result = [];

rl
    .on('line', line => {
        if (isFirst) {
            isFirst = false;
            return;
        }

        const array = line.split(' ');

        array.shift();

        result.push(...array);
    })
    .on('close', () => {
        const sorted = result.sort((a, b) => a - b);

        process.stdout.write(sorted.join(' '));
    });
