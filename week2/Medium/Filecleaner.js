const fs = require('fs');


function cleanContent(content) {
    // Replace multiple spaces with a single space using a regular expression
    return content.replace(/\s+/g, ' ').trim();
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    
    const cleanedContent = cleanContent(data);

 
    fs.writeFile('input.txt', cleanedContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('File cleaned and written successfully');
    });
});
