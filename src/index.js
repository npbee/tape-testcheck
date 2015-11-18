import Test from 'tape/lib/test';
import test from 'tape';
import testcheck from 'testcheck';

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
Test.prototype.check = function (generators, propertyFn, options, msg) {
    if (this._skip) { return this.end(); }

    if (typeof options === 'string') {
        msg = options;
        options = {};
    }

    this.emit('prerun');

    try {
        let result = testcheck.check(testcheck.property(generators, propertyFn), options);

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

Test.prototype.gen = testcheck.gen;
Test.prototype.sample = testcheck.sample;

export default test;
