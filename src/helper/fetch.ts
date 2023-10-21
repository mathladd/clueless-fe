export const fetcher = (...args: Array<unknown>) =>
  fetch([...args] as unknown as RequestInfo).then((res) => res.json());
