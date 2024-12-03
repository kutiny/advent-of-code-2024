import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf8');

const [c, j] = data.split('\n').reduce(( acc, curr ) => {
    if (curr === '') return acc;

    const [v1, v2] = curr.split(/\s+/).map(x => +(x.trim()));
    acc[0].push(v1);
    acc[1].push(v2);

    return acc;
}, [[], []]);

function calculateDistance(c, j) {
    const left = c.sort((a, b) => a - b);
    const right = j.sort((a, b) => a - b);

    let distance = 0;
    for (let i = 0; i < c.length; ++i) {
        distance += Math.abs(left[i] - right[i]);
    }
    return distance
}

function calculateSimilarityScore(m, n) {
    let similarityScore = 0;

    for (let i = 0; i < m.length; ++i) {
        const timesAppeared = n.filter(item => item === m[i]).length;
        similarityScore += m[i] * timesAppeared;
    }

    return similarityScore;
}

// console.log(calcDistance(c, j));
console.log(calculateSimilarityScore(c, j));
