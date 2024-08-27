
/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

// function wait(n) {
// }

// module.exports = wait;

function wait(n) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, n * 1000); // n seconds, so we multiply by 1000 to convert to milliseconds
    });
}

module.exports = wait;
