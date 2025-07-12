"use client";

import { useQueryState } from "nuqs";
import { SearchInput } from "@/components/search-input";
import { searchParser } from "../search-params";

type TicketSearchInputProps = {
  placeholder: string;
};
export function TicketSearchInput({ placeholder }: TicketSearchInputProps) {
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      placeholder={placeholder}
      value={search}
      onChange={setSearch}
    />
  );
}
