
/* eslint-disable */
var childProcess = require('child_process');

function execTests() {
    const child = childProcess.spawn(
        // 'yarn',
        // [
        //     'babel-node',
        //     'src/index.js'],
        'git',
        [   'rev-parse',
             '--abbrev-ref',
            'HEAD'],
    );

    child.stdout.on('data', function (data) {
        console.log(`programmatically print child spawn stdout ${data}`)
    });

    child.on('close', (exitCode) => {
        console.log('closed! exit code:', exitCode);
    });

    child.on('error', (childErr) => {
        console.log(childErr);
        rej(childErr);
    });
}


execTests();