
/* eslint-disable */
var childProcess = require('child_process');

function execTests() {
    return new Promise((res, rej) => {
        const child = childProcess.spawn(
            'yarn',
            [   'babel-node',
                'src/index.js'
            ],
            {
                // programmatically get spwan output, you have to comment out below line
                stdio: [0, 1, 2], //calling-process.stdin: 0, calling-process.stdout:1, calling-process.err:2
            },
        );

        // child.stdout.on('data', function(data){
        //     console.log(`programmatically print child spawn stdout ${data}`)
        // });

        child.on('close', (exitCode) => {
            console.log('closed! exit code:', exitCode);
            res(exitCode);
        });

        child.on('error', (childErr) => {
            console.log(childErr);
            rej(childErr);
        });
    });
}


execTests()
.then(exitCode=>{
    console.log('child exit code: ' + exitCode)
})
.catch(err=>{
    console.error(err)
});

process.exit(0); // here is how you control process return code