export interface FakeSyncOptions {
  minDelay?: number;
  maxDelay?: number;
  failRate?: number;
}

export interface FakeSyncFunctions {
  [key: string]: (...args: any[]) => any;
}

export type Promisified<F> = F extends (...args: infer A) => infer R ? (...args: A) => Promise<Awaited<R>> : never;

export type PromisifiedMap<T extends Record<string, (...args: any[]) => any>> = {
  [K in keyof T]: Promisified<T[K]>;
};

export interface FakeSync {
  defaults: FakeSyncOptions;
  registerDefaults(options: FakeSyncOptions): void;
  register<T extends Record<string, (...args: any[]) => any>>(
    funcs: T,
    options?: FakeSyncOptions
  ): PromisifiedMap<T>;
}

declare const fakesync: FakeSync;

export default fakesync;
export { fakesync };
