export interface FakeSyncOptions {
  minDelay?: number;
  maxDelay?: number;
  failRate?: number;
}

export interface FakeSyncFunctions {
  [key: string]: (...args: any[]) => any;
}

export interface FakeSyncWrappedFunctions {
  [key: string]: (...args: any[]) => Promise<any>;
}

export interface FakeSync extends FakeSyncWrappedFunctions {
  defaults: FakeSyncOptions;
  registerDefaults(options: FakeSyncOptions): void;
  register(funcs: FakeSyncFunctions, options?: FakeSyncOptions): void;
}

declare const fakesync: FakeSync;

export default fakesync;
export { fakesync };
