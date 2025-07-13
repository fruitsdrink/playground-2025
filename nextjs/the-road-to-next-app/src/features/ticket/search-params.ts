// export type SearchParams = {
//   search: string | string[] | undefined;
//   sort: string | string[] | undefined;
// };

// export type SearchParams = Record<string, string | string[] | undefined>;

import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
});
// export const sortParser = parseAsString.withDefault("newest").withOptions({
//   shallow: false,
//   clearOnDefault: true,
// });

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(5),
};

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  // sort: sortParser,
  ...sortParser,
  ...paginationParser,
});

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
