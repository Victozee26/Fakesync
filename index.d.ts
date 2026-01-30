declare module 'fakesync' {
  export interface FakeSyncOptions {
    minDelay?: number;
    maxDelay?: number;
    failRate?: number;
  }

  export interface FakeSync {
    defaults: FakeSyncOptions;
    registerDefaults(options: FakeSyncOptions): void;
    register<T extends Record<string, (...args: unknown[]) => unknown>>(
      funcs: T,
      options?: FakeSyncOptions
    ): {
      [K in keyof T]: (...args: Parameters<T[K]>) => Promise<Awaited<ReturnType<T[K]>>>;
    };
  }

  const fakesync: FakeSync;
  export default fakesync;
  export { fakesync };
}
