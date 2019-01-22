const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

const lineList = [];

rl
    .on('line', line => {
        lineList.push(line);
    })
    .on('close', () => {
        process.stdout.write(isAnagrams.apply(null, lineList) ? '1' : '0');
    });

function isAnagrams(lineA, lineB) {
    if (typeof lineA !== 'string' || typeof lineB !== 'string') {
        return false;
    }

    if (lineA.length !== lineB.length) {
        return false;
    }

    // по сути нужно посчитать вхожение каждого символа, как напирмер тут
    // http://qaru.site/questions/160132/finding-if-two-words-are-anagrams-of-each-other
    // см public static bool AreAnagrams(string s1, string s2) ...

    return lineA.split('').sort().join('') === lineB.split('').sort().join('');
}
