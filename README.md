# fakesync

fakesync wraps synchronous or async functions so they behave like async
calls with configurable delay and simulated failures. It's intentionally
small and dependency-free — useful for frontend development and tests.

Quick summary
- `registerDefaults(options)` — set global `minDelay`, `maxDelay`, `failRate`.
- `register(funcs, options)` — returns a new object mapping each function
  to a Promise-returning wrapper which applies the delay and failure rules.

Installation

```sh
npm install fakesync
```

Basic usage

```js
const fakesync = require('fakesync'); // or require('./index') if installed locally

fakesync.registerDefaults({ minDelay: 100, maxDelay: 1000, failRate: 0.1 });

// your function
function getUser(id) {
  return { id, name: 'Alice' };
}

// `api` contains the wrapped, Promise-returning functions
const api = fakesync.register({ getUser });

// call the wrapped function
(async () => {
  try {
    const user = await api.getUser(1);
    console.log(user);
  } catch (err) {
    console.error('Request failed:', err.message);
  }
})();
```

TypeScript

This package ships `index.d.ts` so TypeScript can infer the names and
signatures of registered functions. `register` returns a strongly-typed
object mapping your original functions to Promise-returning versions.

Notes

- `register` no longer mutates the exported `fakesync` object; it returns
  a new API object. This keeps the exported module stable and improves
  type safety.
- Behavior: each wrapped function waits a random delay between `minDelay`
  and `maxDelay` and rejects with `Error('Simulated failure')` with
  probability `failRate`.

Contributions

Contributions and issues welcome. Create a PR or open an issue on GitHub.
