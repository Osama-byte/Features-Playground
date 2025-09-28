
var GLOBAL_TITLE = 'JS Feature Demo (global)';

function appendOutput(text) {
    const out = document.getElementById('output');
    out.textContent += text + '\n';
}

document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('output').textContent = '';
});

document.getElementById('runBtn').addEventListener('click', runDemo);

function runDemo() {
    const inputStr = document.getElementById('inputString').value;
    const numbersRaw = document.getElementById('inputNumbers').value;
    document.getElementById('output').textContent =`Title: ${GLOBAL_TITLE } \n`;

    try {
        appendOutput('--- STRING OPERATIONS ---');
        const trimmed = inputStr.trim();
        appendOutput('Original: ' + trimmed);
        appendOutput('Uppercase: ' + trimmed.toUpperCase());
        appendOutput('Lowercase: ' + trimmed.toLowerCase());
        if (trimmed.includes('JavaScript')) {
            appendOutput('This mentions JavaScript!');
        }
        const words = trimmed.split(/\s+/);
        appendOutput('Words count: ' + words.length);
        for (const w of words) {
            const clean = w.replace(/[^a-zA-Z0-9]/g, '');
            appendOutput(' • ' + clean + ' (first3: ' + clean.slice(0, 3) + ')');
        }
    } catch (err) {
        appendOutput('Error: ' + err);
    } finally {
        appendOutput('String block finished.');
    }

    appendOutput('\n--- NUMBER OPERATIONS ---');
    let parts = numbersRaw.split(',');
    let parsedNumbers = [];
    for (let i = 0; i < parts.length; i++) {
        let piece = parts[i].trim();
        try {
            if (piece === '') continue;
            const n = parseFloat(piece);
            if (Number.isNaN(n)) throw new Error(`${piece}is not a number`);
            appendOutput(`Parsed ${ i }: ${ n }(toFixed(2): ${ n.toFixed(2) }`);
            parsedNumbers.push(n);
        } catch (e) {
            appendOutput('Error at index ' + i + ': ' + e.message);
        }
    }

    let idx = 0, sum = 0;
    while (idx < parsedNumbers.length) { sum += parsedNumbers[idx]; idx++; }
    appendOutput('Sum: ' + sum);
    if (parsedNumbers.length === 0) { appendOutput('No valid numbers'); }
    else if (sum > 100) { appendOutput('Sum is large (>100)'); }
    else { appendOutput('Sum is normal'); }

    if (parsedNumbers.length > 0) {
        const avg = sum / parsedNumbers.length;
        appendOutput('Average (rounded): ' + Math.round(avg));
        appendOutput('Average (2 decimals): ' + avg.toFixed(2));
    }

    appendOutput('\n--- SCOPE DEMO ---');
    appendOutput('GLOBAL_TITLE: ' + GLOBAL_TITLE);
    (function () { let GLOBAL_TITLE = 'LOCAL TITLE'; appendOutput('Inside fn: ' + GLOBAL_TITLE); })();
    appendOutput('Outside fn: ' + GLOBAL_TITLE);

    appendOutput('\n--- SWITCH EXAMPLE ---');
    const size = parsedNumbers.length;
    switch (true) {
        case size === 0: appendOutput('Zero numbers'); break;
        case size < 3: appendOutput('Small list'); break;
        case size < 6: appendOutput('Moderate list'); break;
        default: appendOutput('Large list');
    }

    appendOutput('\n--- DEMO COMPLETE ---');
}

