// @ts-ignore
import { readFileSync } from 'fs';

const raw: string = readFileSync('input.txt', 'utf8');

function calculate(text: string): number {
    let total = 0;
    text.replace(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g, (_, p1, p2) => {
        total += +p1 * +p2;
        return _;
    });
    return total;
}

function processString(text: string): number {
    let total = 0;
    text.split('do()').forEach(block => {
        block.split('don\'t()').forEach((parts, index) => {
            if (index === 0) {
                total += calculate(parts);
            }
        });
    });
    return total;
}

console.log(processString(raw));
