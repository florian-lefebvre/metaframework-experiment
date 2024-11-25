export const frameworkComponent = <TFn extends (...args: any[]) => any>(
  framework: string,
  fn: TFn
) =>
  Object.assign(fn, {
    __framework: framework,
  });
