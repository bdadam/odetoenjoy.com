const fs = require('fs');
const htmlMinifier = require('html-minifier');
const promisify = require('util').promisify;

const minify = html =>
    htmlMinifier.minify(html, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        // conservativeCollapse: true
    });

const writeFile = promisify(fs.writeFile);

module.exports = (file, html) => {
    writeFile(file, minify(html));
};
