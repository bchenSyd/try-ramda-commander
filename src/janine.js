var execSync = require('child_process').execSync;


// git 2.2+
// git branch --show-current
let branch = execSync(`git rev-parse --abbrev-ref HEAD`).toString('utf8');
console.log(branch)
