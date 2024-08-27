




function sleep(milliseconds) {
    return new Promise((resolve) => {
        const start = Date.now();
        // Busy wait until the specified time has passed
        while (Date.now() - start < milliseconds) {
            // Do nothing
        }
        resolve();
    });
}

module.exports = sleep;
