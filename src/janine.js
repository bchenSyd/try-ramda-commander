var execSync = require('child_process').execSync;

let branch = execSync(`git rev-parse --abbrev-ref HEAD`).toString('utf8');
console.log(branch)