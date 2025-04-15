const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from "public"
const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

// POST handler for the Mad Lib form
server.post('/ITC505/lab-7/index.html', (req, res) => {
    const { noun, adjective, verb, place, celebrity } = req.body;

    // Input validation
    if (!noun || !adjective || !verb || !place || !celebrity) {
        res.send(`
            <h1>Oops! Missing Fields</h1>
            <p>Please make sure you fill out all the fields in the form.</p>
            <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
        `);
        return;
    }

    // The Mad Lib story
    const madLib = `
        One day, a group of ${noun} were wandering through a ${adjective} forest.
        They suddenly decided to ${verb} all the way to ${place}.
        To their surprise, ${celebrity} was waiting there with a treasure map!
    `;

    res.send(`
        <h1>Your Mad Lib Story</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Play Again</a>
    `);
});

// Dev vs Production port handling
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
