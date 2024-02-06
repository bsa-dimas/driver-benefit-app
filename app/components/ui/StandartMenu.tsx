import React from "react";
import SearchBar from "./SearchBar";
import { Button } from "flowbite-react";

export default function StandartMenu({
  table,
  onClickAdd,
  searchValue: initialValue,
  onChange,
}: {
  table: any;
  onClickAdd: any;
  searchValue: string | number;
  onChange: (value: string | number) => void;
}) {
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows;
  const removeRows = () => {
    meta.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row: any) => row.index)
    );
    table.resetRowSelection();
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button size="xs" color="light" onClick={onClickAdd}>
          Add
        </Button>
        {selectedRows.length > 0 ? (
          <Button size="xs" color="light">
            Remove
          </Button>
        ) : (
          <Button size="xs" color="light" disabled>
            Remove
          </Button>
        )}
      </div>
      <SearchBar value={initialValue} onChange={onChange} />
    </div>
  );
}
