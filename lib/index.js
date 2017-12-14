'use strict';

var _seleniumStandalone = require('selenium-standalone');

var _seleniumStandalone2 = _interopRequireDefault(_seleniumStandalone);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function seleniumInstall() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var bar = void 0;

    function handleProgress(totalLength, progressLength, chunkLength) {
        bar = bar || new _progress2.default('Selenium standalone downloading [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 40,
            total: totalLength
        });

        bar.tick(chunkLength);
    }

    return new Promise(function (resolve, reject) {
        _seleniumStandalone2.default.install(Object.assign(options, {
            logger: function logger(message) {
                return console.log(message);
            },
            progressCb: handleProgress
        }), function (err) {
            return err ? reject(err) : resolve();
        });
    });
}

//step 1: install selenium-standalone with webdrivers
// seleniumInstall();

var options = {
    port: 12306
};

// selenium.start(  , (err, seleniumInst) => {
//     if (err) {
//         console.log(`   ------   selenium serve error : ${JSON.stringify(err)}`);
//         return reject(err);
//     }
//     console.log(`   ------   selenium serve on ${options.port}`);
//     seleniumInst.port = options.port;
//     cosnole.log(seleniumInst);
// });

_seleniumStandalone2.default.start(function (err, child) {
    child.stderr.on('data', function (data) {
        console.log(data.toString());
    });
});