# fasync

fakesync makes it easy to turn any function into a fake async call for front-end testing. You can add delays, simulate failures, and make fake data behave like it’s coming from a real back-end. It’s small, simple, and doesn’t require a full mock server—perfect when you just need realistic responses without extra setup.

## Installation

Install from npm:
```js
npm install fakesync
```

Or require locally if testing:
```js
const fakesync = require('./index');
```

## API

### `fakesync.registerDefaults(options)`

Set global default options.

- `options.minDelay`: Minimum delay in ms (default 0)
- `options.maxDelay`: Maximum delay in ms (default 500)
- `options.failRate`: Probability of rejection (0-1, default 0)

### `fakesync.register(funcs, options)`

Register functions to be wrapped.

- `funcs`: Object with function names as keys and functions as values
- `options`: Override options for these functions

After registering, `fakesync.funcName()` returns a Promise that resolves with the original return value after a random delay, or rejects based on failRate.

## Example

See `example.js` for a complete example.

```js
const fakesync = require('fakesync');

fakesync.registerDefaults({ minDelay: 100, maxDelay: 1000, failRate: 0.1 });

function mySyncFunc(x) {
  return x * 2;
}

fakesync.register({ mySyncFunc });

(async () => {
  try {
    const result = await fakesync.mySyncFunc(5); // 10, after random delay
    console.log(result);
  } catch (err) {
    console.error('Function failed:', err);
  }
})();
```