import Test from 'tape/lib/test';
import test from 'tape';
import testcheck from 'testcheck';

Test.prototype.check = function (gens, prop, opts, msg) {
    if (this._skip) { return this.end(); }

    if (typeof opts === 'string') {
        msg = opts;
        opts = {};
    }

    this.emit('prerun');

    try {
        let result = testcheck.check(testcheck.property(gens, prop), opts);

        if (result.result) {
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
