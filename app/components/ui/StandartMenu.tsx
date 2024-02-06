import React from "react";
import SearchBar from "./SearchBar";
import { Button, Checkbox, Dropdown, Label } from "flowbite-react";

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
        <div className="flex">
          <Dropdown
            className="h-1/2 overflow-auto items-center flex"
            size="xs"
            color="light"
            label="Column"
            dismissOnClick={false}
          >
            <Dropdown.Header>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="header"
                  {...{
                    checked: table.getIsAllColumnsVisible(),
                    onChange: table.getToggleAllColumnsVisibilityHandler(),
                  }}
                />
                <Label htmlFor="header">All</Label>
              </div>
            </Dropdown.Header>
            {table.getAllLeafColumns().map((column: any, i: number) => {
              return (
                <Dropdown.Item key={column.id}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={column.id}
                      {...{
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                      }}
                    />
                    <Label htmlFor={column.id}>{column.id}</Label>
                  </div>
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </div>
      </div>
      <SearchBar value={initialValue} onChange={onChange} />
    </div>
  );
}
