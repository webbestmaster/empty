const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let lines = [];

rl
    .on('line', (line) => {
        lines.push(line);
    })
    .on('close', () => {
        const [jewels, stones] = lines;

        let result = 0;

        const stonesLength = stones.length;

        for (let stoneIndex = 0; stoneIndex < stonesLength; stoneIndex += 1) {
            if (jewels.includes(stones.charAt(stoneIndex))) {
                result += 1;
            }
        }

        process.stdout.write(result.toString());
    });
