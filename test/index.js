import test from '../src';
import sinon from 'sinon';

test('The `check` method', t => {

    t.ok(
        typeof t.check === 'function',
        'was installed correctly'
    );

    t.check(
        [t.gen.int],
        num => {
            t.ok(typeof num === 'number', 'generates correctly.');
            return true;
        },
        { times: 10 },
        '--'
    );

    t.check(
        [t.gen.int],
        num => typeof num === 'number',
        'works with passing properties'
    );

    sinon.stub(t, 'fail');
    t.check(
        [t.gen.int],
        num => typeof num === 'string',
        'works with failing properties'
    )

    let failArg1 = t.fail.lastCall.args[0];
    let failArg2 = t.fail.lastCall.args[1];

    t.equal(
        failArg1,
        'works with failing properties',
        'sends along the given message with a failing property.'
    );

    t.ok(
        failArg2.actual,
        'sends along the check results with a failing property.'
    );
    t.fail.restore();


    let cb = sinon.stub().returns(true);

    t.check(
        [t.gen.int],
        cb,
        { times: 20 },
        '---'
    );

    t.equal(cb.callCount, 20, 'works with options');

    t.end();
});
