// import { readDirSync } from 'fs';

import path from 'path';

import fs from 'fs';

import { h } from 'preact';

import render from 'preact-render-to-string';

import frontmatter from 'front-matter';

import glob from 'glob';

import marked from 'marked';

const readFiles = () => new Promise((resolve, reject) => {
    glob('**/*.md', { cwd: 'content' }, (err, files) => {
        if (err) { return reject(err); }
        resolve(files);
    });
});

const readSingleFile = filename => new Promise((resolve, reject) => {
    fs.readFile(path.join('content', filename), 'utf-8', (err, content) => {
        if (err) { return reject(err); }

        const x = frontmatter(content);
        x.originalPath = filename;
        x.html = marked(x.body);
        resolve(x);
    });
});

readFiles().then(files => {
    console.log(files);

    return Promise.all(files.map(readSingleFile));
}).then(files => {
    console.log(files);
});




// console.log(x);

// const fs = require('fs');
// fs.readdirSync

// const x = fs.readdirSync(path.join(__dirname, '../content'));
