export interface FakeSyncOptions {
  minDelay?: number;
  maxDelay?: number;
  failRate?: number;
}

export interface FakeSyncFunctions {
  [key: string]: (...args: any[]) => any;
}

export type FakeSync = {
  defaults: FakeSyncOptions;
  registerDefaults(options: FakeSyncOptions): void;
  register(funcs: FakeSyncFunctions, options?: FakeSyncOptions): void;
  [key: string]: any;
};

declare const fakesync: FakeSync;

export default fakesync;
export { fakesync };
