const fs = require("fs");

const template = fs.readFileSync("./bin/userstyle-template.txt").toString();
const json = JSON.parse(fs.readFileSync("./package.json"));

var templateReplaced = template.replace(/%NAME%/g, json.displayName)
    .replace(/%NAMESPACE%/g, json.namespace)
    .replace(/%DESCRIPTION%/g, json.description)
    .replace(/%AUTHOR%/g, json.author);

templateReplaced = templateReplaced.replace(/[\u200B-\u200D\uFEFF]/g, '');

if (process.argv[2] === undefined) {
    templateReplaced = templateReplaced.replace(/%VERSION%/g, json.version);
} else {
    templateReplaced = templateReplaced.replace(/%VERSION%/g,
        json.version.substring(0, json.version.lastIndexOf(".")) +
        process.argv[2].substring(process.argv[2].lastIndexOf("."))
    );
}

fs.writeFileSync("./build/style.user.css",
    templateReplaced +
    `@-moz-document domain("e621.net"), domain("e926.net") { \n` +
    fs.readFileSync("./build/style.min.css") +
    ` } \n`
);
fs.writeFileSync("./build/style.min.css", templateReplaced + fs.readFileSync("./build/style.min.css"));
