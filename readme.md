# Tape Testcheck

[![Build Status](https://travis-ci.org/npbee/tape-testcheck.svg)](https://travis-ci.org/npbee/tape-testcheck)

A [Tape extension](https://github.com/atabel/extend-tape) to use 
[Testcheck](https://github.com/leebyron/testcheck-js) with 
[Tape](https://github.com/substack/tape).  

## Usage

To have access to the `t.check` method, you need to extend tape with the exported
`check` function.

```javascript
import tape from 'tape';
import addAssertions from 'extend-tape';
import check from 'tape-testcheck';

// Add the `check` assertion
const test = addAssertions(tape, { check });

// Now you can test away
test('Something', t => {
    t.check(...);
});
```

For convenience, the `gen` and `sample` methods are re-exported for usage with
your checks:

```javascript
import tape from 'tape';
import addAssertions from 'extend-tape';
import check, { gen, sample } from 'tape-testcheck';
```

### A basic test

```javascript
import tape from 'tape';
import addAssertions from 'extend-tape';
import check, { gen, sample } from 'tape-testcheck';

const test = addAssertions(tape, { check });

test('Something', t => {
    t.check(
        [gen.int],
        num => typeof num === 'number',
        'it works!'
    );
});
```

```bash
# Outputs:
$ ok 1 it works!
```

### With Options

```javascript
import tape from 'tape';
import addAssertions from 'extend-tape';
import check, { gen, sample } from 'tape-testcheck';

const test = addAssertions(tape, { check });

test('Something', t => {
    // with options
    t.check(
        [gen.int],
        num => typeof num === 'number',
        { times: 10 },
        'works with options'
    );
});
```

```bash
# outputs
$ ok 1 works with options
```

### A failing test

```javascript
import tape from 'tape';
import addAssertions from 'extend-tape';
import check, { gen, sample } from 'tape-testcheck';

const test = addAssertions(tape, { check });

test('Something', t => {

    t.check(
        [gen.int],
        num => typeof num === 'string',
        'it fails!'
    );
});
```

```bash
# Outputs:
$ not ok 1 it fails!
  ---
    operator: fail
    expected: |-
      { result: true }
    actual: |-
      { fail: [ 0 ], 'failing-size': 0, 'num-tests': 1, result: false, shrunk: { depth: 0, result: false, smallest: [ 0 ], 'total-nodes-visited': 0 } }
    at: ...
```


## API

### t.check(generators, propertyFn, options, msg)

- `generators`: An array of testcheck generators
- `propertyFn`: The testcheck property function to run
- `options`: Testcheck options
- `msg`: The message to use in the test (same as any other Tape message, e.g.
  `t.ok(value, msg)`

Run a testcheck property on `propertyFn` with the provided `generators` and
`options`.  The `msg` will be passed to the `t.pass` and `t.fail` methods.
