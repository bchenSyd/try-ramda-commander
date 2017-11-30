"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.start = undefined;

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = {
    result: "SUCCESS",
    interfaceVersion: "1.0.3",
    requested: "10/17/2013 15:31:20",
    lastUpdated: "10/16/2013 10:52:39",
    tasks: [{
        id: 104, complete: false, priority: "high",
        dueDate: "2013-11-29", username: "Scott",
        title: "Do something", created: "9/22/2013"
    }, {
        id: 105, complete: false, priority: "medium",
        dueDate: "2013-11-22", username: "Lena",
        title: "Do something else", created: "9/22/2013"
    }, {
        id: 107, complete: true, priority: "high",
        dueDate: "2013-11-22", username: "Mike",
        title: "Fix the foo", created: "9/22/2013"
    }, {
        id: 108, complete: false, priority: "low",
        dueDate: "2013-11-15", username: "Lena",
        title: "Adjust the bar", created: "9/25/2013"
    }, {
        id: 110, complete: false, priority: "medium",
        dueDate: "2013-11-15", username: "Scott",
        title: "Rename everything", created: "10/2/2013"
    }, {
        id: 112, complete: true, priority: "high",
        dueDate: "2013-11-27", username: "Lena",
        title: "Alter all quuxes", created: "10/5/2013"
    }, {
        id: 113, complete: true, priority: "high",
        dueDate: "2013-11-27", username: "Lena",
        title: "Alter all quuxes", created: "10/5/2013"
        // , ...
    }]
};
function serverRequest() {
    return new Promise(function (res, rej) {
        setTimeout(function () {
            res(data);
        }, 1000);
    });
}

function clientCode(userName) {
    return serverRequest().then(_ramda2.default.prop('tasks')).then(_ramda2.default.filter(_ramda2.default.propEq('username', userName))).then(_ramda2.default.reject(_ramda2.default.propEq('complete', true))).then(_ramda2.default.map(_ramda2.default.pick(['id', 'dueDate', 'title', 'priority']))).then(_ramda2.default.sortBy(_ramda2.default.prop('dueDate')));
}

clientCode('Lena').then(function (result) {
    console.log(result);
});

var start = exports.start = function start() {
    clientCode('Lena').then(function (result) {
        console.log(result);
    });
};
//# sourceMappingURL=index.js.map