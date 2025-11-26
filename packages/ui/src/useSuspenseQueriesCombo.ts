/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useSuspenseQueries,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";

type ExtractData<T> =
  T extends UseSuspenseQueryOptions<any, any, infer TData, any> ? TData : never;

export const useSuspenseQueriesCombo = <
  TQueries extends Record<string, UseSuspenseQueryOptions<any, any, any, any>>,
>(
  queries: TQueries
) => {
  const keys = Object.keys(queries);
  const values = Object.values(queries);
  const results = useSuspenseQueries({
    queries: values,
    combine: (result) => ({
      isError: result.some((r) => r.isError),
      error: result.map((r) => r.error).find((r) => r) || null,
      data: Object.fromEntries(result.map((r, i) => [keys[i], r.data])) as {
        [K in keyof TQueries]: ExtractData<TQueries[K]>;
      },
    }),
  });
  return results;
};
