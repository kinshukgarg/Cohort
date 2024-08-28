
// Counter without setInterval
// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)



let counter = 0;

function incrementCounter() {
    console.log(counter);
    counter++;
    // Call incrementCounter again after 1 second (1000 milliseconds)
    setTimeout(incrementCounter, 1000);
}

// Start the counter
incrementCounter();
