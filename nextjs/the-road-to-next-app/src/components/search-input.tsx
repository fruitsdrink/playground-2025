"use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};
export function SearchInput({
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // const value = event.target.value;
      // const params = new URLSearchParams(searchParams);

      // if (value) {
      //   params.set("search", value);
      // } else {
      //   params.delete("search");
      // }

      // replace(`${pathname}?${params.toString()}`, {
      //   scroll: false,
      // });

      onChange(event.target.value);
    },
    250
  );

  return (
    <Input
      defaultValue={value}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
}
