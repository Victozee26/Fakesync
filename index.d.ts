export interface FakeSyncOptions {
  minDelay?: number;
  maxDelay?: number;
  failRate?: number;
}

export interface FakeSyncFunctions {
  [key: string]: (...args: any[]) => any;
}

export interface FakeSync {
  defaults: FakeSyncOptions;
  registerDefaults(options: FakeSyncOptions): void;
  register(funcs: FakeSyncFunctions, options?: FakeSyncOptions): void;
  // Allow accessing any registered function as a property returning a Promise
  [name: string]: any;
}

declare const fakesync: FakeSync;

export = fakesync;
export as namespace fakesync;
