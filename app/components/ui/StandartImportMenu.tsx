import React from "react";
import SearchBar from "./SearchBar";
import { Button, Checkbox, Dropdown, FileInput, Label } from "flowbite-react";

export default function StandartImportMenu({
  isLoading,
  refImportExcel,
  onChange,
  onImportExcel,
}: any) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <FileInput
          name="file"
          sizing="sm"
          onChange={onChange}
          ref={refImportExcel}
        />

        {onImportExcel && (
          <Button
            size="xs"
            color="light"
            onClick={onImportExcel}
            isProcessing={isLoading}
          >
            Import Dari Excel
          </Button>
        )}
      </div>
    </div>
  );
}
