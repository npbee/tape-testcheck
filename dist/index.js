'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tapeLibTest = require('tape/lib/test');

var _tapeLibTest2 = _interopRequireDefault(_tapeLibTest);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _testcheck = require('testcheck');

var _testcheck2 = _interopRequireDefault(_testcheck);

_tapeLibTest2['default'].prototype.check = function (gens, prop, opts, msg) {
    if (this._skip) {
        return this.end();
    }

    if (typeof opts === 'string') {
        msg = opts;
        opts = {};
    }

    this.emit('prerun');

    try {
        var result = _testcheck2['default'].check(_testcheck2['default'].property(gens, prop), opts);

        if (result.result) {
            this.pass(msg);
        } else {
            this.fail(JSON.stringify(result, null, 4));
        }
    } catch (err) {
        this.error(err);
        return;
    }

    this.emit('run');
};

_tapeLibTest2['default'].prototype.gen = _testcheck2['default'].gen;
_tapeLibTest2['default'].prototype.sample = _testcheck2['default'].sample;

exports['default'] = _tape2['default'];
module.exports = exports['default'];
