import React from "react";
import SearchBar from "./SearchBar";
import { Button, Checkbox, Dropdown, Label } from "flowbite-react";

export default function StandartMenu({
  isFiturCrud,
  table,
  onClickAdd,
  searchValue: initialValue,
  onChange,
  onExportExcel,
}: any) {
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows;
  const removeRows = () => {
    meta.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row: any) => row.original.id)
    );
    table.resetRowSelection();
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        {isFiturCrud ? (
          <Button size="xs" color="light" onClick={onClickAdd}>
            Add
          </Button>
        ) : (
          <></>
        )}
        {isFiturCrud ? (
          selectedRows.length > 0 ? (
            <Button size="xs" color="light" onClick={removeRows}>
              Remove
            </Button>
          ) : (
            <Button size="xs" color="light" disabled>
              Remove
            </Button>
          )
        ) : (
          <></>
        )}

        {onExportExcel && (
          <Button size="xs" color="light" onClick={onExportExcel}>
            Export Ke Excel
          </Button>
        )}

        <div className="flex items-center gap-4 ">
          <Dropdown
            className="max-h-screen overflow-auto"
            size="sm"
            color="light"
            label="Column"
            placement="bottom"
            dismissOnClick={false}
          >
            <Dropdown.Header key={"header"}>
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
