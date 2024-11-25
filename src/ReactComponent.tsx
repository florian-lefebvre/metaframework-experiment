const frameworkComponent = <TFn extends (...args: any[]) => any>(
  framework: string,
  fn: TFn
) =>
  Object.assign(fn, {
    __framework: framework,
  });

export const ReactComponent = frameworkComponent("react", function () {
  return <div>React</div>;
});
