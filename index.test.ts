import { check, Specification } from "./index";

function id<X>(x: X): X { return x; }
function succ(x: number): number { return x + 1; }
function show(x: number): string { return x.toString(); }
function constant<X, Y>(y: Y): (_: X) => Y { return _ => y; }
function add(a: number, b: number): number { return a + b; }

const SPEC_ID = [
  { in: "", out: "" },
  { in: "hello", out: "hello" },
];

const SPEC_SUCC = [
  { in: 5, out: 6 },
  { in: 100, out: 101 },
];

const SPEC_SHOW = [
  { in: 5, out: "5" },
  { in: 100, out: "100" },
];

const SPEC_ADD: Specification<[number, number], number> = [
  { in: [0, 0], out: 0 },
  { in: [2, 5], out: 7 },
];

it(`id`, () => {
  check(id).against(SPEC_ID);
  expect(() => check(id).against(SPEC_SUCC)).toThrowError();
});

it(`succ`, () => {
  check(succ).against(SPEC_SUCC);
});

it(`show`, () => {
  check(show).against(SPEC_SHOW);
});

it(`constant`, () => {
  const WHAT = "what";
  const constantWhat = constant(WHAT);
  check(constantWhat).against([ { in: 5, out: WHAT } ]);
  expect(() => check(constantWhat).against(SPEC_ID)).toThrowError();
});

it(`add`, () => {
  const tuplifiedAdd = (x: [number, number]) => add(...x);
  check(tuplifiedAdd).against(SPEC_ADD);
});
