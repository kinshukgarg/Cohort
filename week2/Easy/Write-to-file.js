const fs = require('fs');
 
const content = "This is a test file. We are learning about async write operations in Node.js.";


fs.writeFile('output.txt', content, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('File has been written successfully');
});

// Simulate an expensive operation to observe async behavior
function expensiveOperation() {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) { // 1 million iterations
        sum += i;
    }
    console.log('Expensive operation completed');
}

// Perform the expensive operation
expensiveOperation();
