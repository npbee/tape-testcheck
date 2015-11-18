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

/**
 * Run a testcheck check function on the given propertyFn, generators, and
 * options.
 *
 * @param {Array} generators An array of testcheck generators
 * @param {Function} properyFn The property function to test.
 * @param {Object} options An option object for testcheck options.
 * @param {String} msg The message to pass to the Tape methods on pass/fail.
 *
 */
_tapeLibTest2['default'].prototype.check = function (generators, propertyFn, options, msg) {
    if (this._skip) {
        return this.end();
    }

    if (typeof options === 'string') {
        msg = options;
        options = {};
    }

    this.emit('prerun');

    try {
        var result = _testcheck2['default'].check(_testcheck2['default'].property(generators, propertyFn), options);

        if (result.result === true) {
            this.pass(msg);
        } else {
            this.fail(msg, {
                expected: { result: true },
                actual: result
            });
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
