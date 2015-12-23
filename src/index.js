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
export default function check(generators, propertyFn, options, msg) {
    if (typeof options === 'string') {
        msg = options;
        options = {};
    }

    let result = testcheck.check(
        testcheck.property(generators, propertyFn), options);

    if (result.result === true) {
        this.pass(msg);
    } else {
        this.fail(msg, {
            expected: { result: true },
            actual: result
        });
    }
}


// Re-exported for convenience
export { gen, sample } from 'testcheck';
