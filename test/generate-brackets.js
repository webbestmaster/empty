const readline = require('readline');

const openBracket = '1';
const closeBracket = '0';

const rl = readline.createInterface({
    input: process.stdin
});

rl
    .on('line', count => {
        generate(parseInt(count, 10));
    })
    .on('close', () => {
    });

function generate(numberOfPair) {
    const [begin, end] = getBeginEnd(numberOfPair);
    const beginDex = parseInt(end, 2);
    const endDex = parseInt(begin, 2);

    for (let iterator = beginDex; iterator > endDex; iterator -= 2) {
        const testLine = iterator.toString(2);

        if (isNeededLine(testLine)) {
            console.log(getLineAsBrackets(testLine));
        }
    }

    console.log(begin, end);
}

function getBeginEnd(numberOfPair) {
    const centerNumber = (numberOfPair - 1) * 2;
    const begin = openBracket + new Array(centerNumber).fill(closeBracket).join('') + closeBracket;
    const end = openBracket + new Array(centerNumber).fill(openBracket).join('') + closeBracket;

    return [begin, end];
}

function isNeededLine(line) {
    let counter = 0;
    const lineLength = line.length;

    for (let index = 0; index < lineLength; index += 1) {
        const char = line[index];

        if (char === openBracket) {
            counter += 1;
            continue;
        }

        counter -= 1;

        if (counter < 0) {
            return false;
        }
    }

    return counter === 0;
}

function getLineAsBrackets(line) {
    return line.replace(/1/g, '(').replace(/0/g, ')');
}
