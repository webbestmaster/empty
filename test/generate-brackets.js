const readline = require('readline');

const openBracket = '1';
const closeBracket = '0';

const rl = readline.createInterface({
    input: process.stdin
});

rl
    .on('line', count => {
        if (count === '0') {
            return;
        }

        if (count === '1') {
            process.stdout.write('()');
            return;
        }

        generate(parseInt(count, 10));
    });

function generate(numberOfPair) {
    const [begin, end] = getBeginEnd(numberOfPair);
    const beginDex = parseInt(end, 2);
    const endDex = parseInt(begin, 2);

    for (let iterator = beginDex; iterator > endDex; iterator -= 2) {
        const testLine = iterator.toString(2);

        if (isNeededLine(testLine)) {
            process.stdout.write(getLineAsBrackets(testLine) + '\n');
        }
    }
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
        if (line[index] === openBracket) {
            counter += 1;
        } else {
            counter -= 1;

            if (counter < 0) {
                return false;
            }
        }
    }

    return counter === 0;
}

function getLineAsBrackets(line) {
    return line.replace(/1/g, '(').replace(/0/g, ')');
}
