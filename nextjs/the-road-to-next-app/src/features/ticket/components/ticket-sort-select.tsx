"use client";

import { useQueryStates } from "nuqs";
import {
  SortObject,
  SortSelect,
  SortSelectOption,
} from "@/components/sort-select";
import { sortOptions, sortParser } from "../search-params";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};
export function TicketSortSelect({ options }: TicketSortSelectProps) {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleOnChange = (sort: SortObject) => {
    setSort(sort);
  };

  return (
    <SortSelect value={sort} onChange={handleOnChange} options={options} />
  );
}
