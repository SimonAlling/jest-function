# jest-function

Delightful function testing.

[![NPM Version][shield-npm]][npm-url]
[![Downloads Stats][shield-downloads]][npm-url]


## Installation

```
npm install --save-dev jest-function
```


## Usage

```typescript
import { check } from "jest-function";

function length(s: string): number {
  return s.length;
}

it(`length`, () => {
  check(length).against([
    { in: "", out: 0 },
    { in: "hello", out: 5 },
  ]);
  // Equivalent:
  expect(length("")).toEqual(0);
  expect(length("hello")).toEqual(5);
});
```

### _n_-ary functions

```typescript
function add(a: number, b: number): number {
  return a + b;
}

it(`add`, () => {
  const tuplifiedAdd = (args: [number, number]) => add(...args);
  check(tuplifiedAdd).against([
    { in: [0, 0], out: 0 },
    { in: [2, 5], out: 7 },
  ]);
});
```


## Contribute

`npm run verify` lints, builds and tests the package.


[npm-url]: https://npmjs.org/package/jest-function
[shield-npm]: https://img.shields.io/npm/v/jest-function.svg
[shield-downloads]: https://img.shields.io/npm/dm/jest-function.svg
