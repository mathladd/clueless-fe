export function shortContract(str?: string, r = 6, l = 4) {
  if (!str) return '';

  let ret = str;
  if (ret.substring(0, 2) === '0x') {
    ret = ret.slice(2);
  }

  if (ret.length <= r + l + 2) {
    return ret;
  }

  const { length } = ret;
  const left = ret.slice(0, r);
  const right = ret.slice(length - l, length);
  return [left, right].join('..');
}

export default shortContract;
