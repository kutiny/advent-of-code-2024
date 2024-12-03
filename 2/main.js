import { readFileSync } from 'fs';

const reports = readFileSync('./data.txt', 'utf8')
    .split('\n')
    .slice(0, -1)
    .map(report => report.split(/\s+/).map(Number));

function calculateSafeReports(reports) {
    let safeReports = 0;

    for (let i = 0; i < reports.length; ++i) {
        const isOk = isSafe(reports[i]);
        safeReports += isOk || isSafeWithDampener(reports[i]);
    }

    return safeReports;
}

function isSafe(report) {
    const base = [...new Set(report)];
    let isAscending = base[0] < base[1];
    let isOk = true;
    for (let j = 0; j < report.length - 1; ++j) {
        isOk = isOk && isLevelSafe(report[j], report[j + 1], isAscending);
    }
    return isOk;
}

function isLevelSafe(x, i, isAsc) {
    if (x === i) { return false }
    if (isAsc && x > i) { return false }
    if (!isAsc && x < i) { return false }

    const distance = Math.abs(x - i);
    if (distance < 1 || distance > 3) { return false }

    return true;
}

function isSafeWithDampener(report) {
    for (let j = 0; j < report.length; ++j) {
        const safe = isSafe([...report.slice(0, j), ...report.slice(j + 1)]);

        if (safe) {
            return 1;
        };
    }

    return 0;
}

console.log(calculateSafeReports(reports));
