

import selenium from 'selenium-standalone';
import Progress from 'progress';
function seleniumInstall(options = {}) {
    let bar;

    function handleProgress(totalLength, progressLength, chunkLength) {
        bar = bar ||
            new Progress('Selenium standalone downloading [:bar] :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 40,
                total: totalLength
            });

        bar.tick(chunkLength);
    }

    return new Promise((resolve, reject) => {
        selenium.install(Object.assign(options, {
            logger: message => console.log(message),
            progressCb: handleProgress
        }), (err) => {
            return err ? reject(err) : resolve();
        });
    });
}

//step 1: install selenium-standalone with webdrivers
seleniumInstall();

selenium.start({
    seleniumArgs: ['-port', '12345']
}, function (err, child) {
   
});
