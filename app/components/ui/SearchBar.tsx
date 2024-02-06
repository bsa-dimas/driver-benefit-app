import React from "react";
import DebuncedInput from "./DebuncedInput";

export default function SearchBar({
  value: initialValue,
  onChange,
}: {
  value: string | number;
  onChange: (value: string | number) => void;
}) {
  return (
    <DebuncedInput
      value={initialValue ?? ""}
      onChange={onChange}
      className="block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search"
    />
  );
}
