const fs = require('fs');


function expensiveOperation() {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) { // 1 million iterations
        sum += i;
    }
    console.log('Expensive operation completed');
}

// Read the contents of the file asynchronously
fs.readFile('ex.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File contents:');
    console.log(data);
});

// Perform an expensive operation to see how it affects the output
expensiveOperation();
