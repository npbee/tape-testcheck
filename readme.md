# Tape Testcheck

Use [Testcheck](https://github.com/leebyron/testcheck-js) with [Tape](https://github.com/substack/tape).  

## Usage

This is a small library that simply adds a `check` method to Tape's `test`
method.

### A basic test

```javascript
import test from 'tape-testcheck';

test('Something', t => {
    t.check(
        [t.gen.int],
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
import test from 'tape-testcheck';

test('Something', t => {
    // with options
    t.check(
        [t.gen.int],
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
import test from 'tape-testcheck';

test('Something', t => {

    t.check(
        [t.gen.int],
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


### t.gen

Alias for `testcheck.gen`.

### t.sample

Alias for `testcheck.sample`
