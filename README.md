# Fakesync

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

After registering, `fakesync.register({...})` returns an object whose methods are Promise-returning wrappers around the original functions. Call the returned methods (not properties added to the `fakesync` object) to get the delayed/possibly failing behavior.

## Example

See `example.js` for a complete example.

```js
const fakesync = require('fakesync');

fakesync.registerDefaults({ minDelay: 100, maxDelay: 1000, failRate: 0.1 });

function mySyncFunc(x) {
  return x * 2;
}

const api = fakesync.register({ mySyncFunc });

(async () => {
  try {
    const result = await api.mySyncFunc(5); // 10, after random delay
    console.log(result);
  } catch (err) {
    console.error('Function failed:', err);
  }
})();
```

**please feel free to contribute 🙏**

**Updates Loading…**

## TypeScript

This package provides a declaration file so TypeScript-aware editors and
tooling can understand dynamically registered functions. After installing,
you can import normally and call your registered handlers with type help:

```ts
import fakesync from 'fakesync';

fakesync.register({ handleSignInClick: () => {/* ... */} });

// TypeScript will understand fakesync.handleSignInClick exists at runtime
// but may still be `any`-typed unless you declare a stronger signature.
```
