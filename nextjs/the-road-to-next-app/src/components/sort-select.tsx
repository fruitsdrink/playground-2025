"use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SortSelectOption = {
  sortKey: string;
  sortValue: string;
  label: string;
};

export type SortObject = {
  sortKey: string;
  sortValue: string;
};
type SortSelectProps = {
  // defaultValue: string;
  value: SortObject;
  onChange: (sort: SortObject) => void;
  options: SortSelectOption[];
};
export function SortSelect({ value, onChange, options }: SortSelectProps) {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  const handleSort = (compositeKey: string) => {
    // const params = new URLSearchParams(searchParams);

    // if (value === defaultValue) {
    //   params.delete("sort");
    // } else if (value) {
    //   params.set("sort", value);
    // } else {
    //   params.delete("sort");
    // }

    // replace(`${pathname}?${params.toString()}`, {
    //   scroll: false,
    // });

    // const sortValue = options.find(
    //   (option) => option.sortKey === sortKey
    // )?.sortValue;

    const [sortKey, sortValue] = compositeKey.split("_");

    onChange({ sortKey, sortValue });
  };

  return (
    <Select
      // defaultValue={searchParams.get("sort")?.toString() || defaultValue}
      defaultValue={value.sortKey + "_" + value.sortValue}
      onValueChange={handleSort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + "_" + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
