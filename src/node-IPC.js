
/* eslint-disable */
var childProcess = require('child_process');

function execTests() {
    const child = childProcess.spawn(
        // 'yarn',
        // [
        //     'babel-node',
        //     'src/index.js'],
        'git',
        ['rev-parse',
          '--abbrev-ref',
          'HEAD'],
        // {
        //   stdio: [0, 1, 2], //calling-process.stdin: 0, calling-process.stdout:1, calling-process.err:2
        // }
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