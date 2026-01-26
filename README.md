# fasync

A minimal JavaScript package to wrap functions and make them behave like fake async functions with configurable delay and failure rate.

## Installation

Since this is a local package, require it directly:

```js
const fasync = require('./index');
```

For npm publishing later, you can publish it and install via npm.

## API

### `fasync.registerDefaults(options)`

Set global default options.

- `options.minDelay`: Minimum delay in ms (default 0)
- `options.maxDelay`: Maximum delay in ms (default 500)
- `options.failRate`: Probability of rejection (0-1, default 0)

### `fasync.register(funcs, options)`

Register functions to be wrapped.

- `funcs`: Object with function names as keys and functions as values
- `options`: Override options for these functions

After registering, `fasync.funcName()` returns a Promise that resolves with the original return value after a random delay, or rejects based on failRate.

## Example

See `example.js` for a complete example.

```js
const fasync = require('./index');

fasync.registerDefaults({ minDelay: 100, maxDelay: 1000, failRate: 0.1 });

function mySyncFunc(x) {
  return x * 2;
}

fasync.register({ mySyncFunc });

(async () => {
  const result = await fasync.mySyncFunc(5); // 10, after delay
})();
```