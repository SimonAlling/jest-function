// Cannot use Iterable because then the parameter of `against` gets type `any`.
export type Specification<X, Y> = ReadonlyArray<Readonly<{
  in: X;
  out: Y;
}>>;

export function check<X, Y>(f: (x: X) => Y) {
  return {
    against(specification: Specification<X, Y>): void {
      for (const mapping of specification) {
        expect({ ...mapping, out: f(mapping.in) }).toEqual(mapping);
      }
    },
  };
}
