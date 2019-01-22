const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let isFirst = true;

let result = [];

rl
    .on('line', line => {
        // if (isFirst) {
        //     isFirst = false;
        //     return;
        // }

        const array = line.split(' '); //.map(a => parseInt(a, 10));

        // array.shift();

        result = mergeSordedArrays(result, array, parseInt(array[0], 10) + 1);
    })
    .on('close', () => {
        process.stdout.write(result.join(' '));
    });


function mergeSordedArrays(arrFirst, arrSecond, arrSecondLength) {
    const arrSort = [];
    // let arrSortLength = 0;
    let i = 0;
    let j = 1; // ignore first element

    // сравниваем два массива, поочередно сдвигая указатели
    const arrFirstLength = arrFirst.length;
    // const arrSecondLength = arrSecond.length;

    while (i < arrFirstLength && j < arrSecondLength) {
        arrSort.push(arrFirst[i] - arrSecond[j] < 0 ? arrFirst[i++] : arrSecond[j++]);
        // arrSort[arrSortLength] = arrFirst[i] < arrSecond[j] ? arrFirst[i++] : arrSecond[j++];
        // arrSortLength += 1;
    }

    if (i === arrFirstLength) {
        return arrSort.concat(arrSecond.slice(j));
    }

    if (j === arrSecondLength) {
        return arrSort.concat(arrFirst.slice(i));
    }

    return arrSort.concat(arrFirst.slice(i), arrSecond.slice(j));

    // обрабатываем последний элемент при разной длине массивов
    // и возвращаем один отсортированный массив
    // return [
    //     ...arrSort,
    //     ...arrFirst.slice(i),
    //     ...arrSecond.slice(j)
    // ];
}
