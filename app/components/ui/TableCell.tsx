import { useState, useEffect, ChangeEvent } from "react";
import { NumberFormatBase, NumericFormat } from "react-number-format";

type Option = {
  label: string;
  value: string;
};

function toCurrency(numberString: any) {
  let number = parseFloat(numberString);
  return number.toLocaleString("ID");
}

const format = (numStr: any) => {
  if (numStr === "") return "";
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(numStr);
};

export const TableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    if (columnMeta?.type === "numeric") {
      !initialValue ? setValue("") : setValue(toCurrency(initialValue));
    } else {
      !initialValue ? setValue("") : setValue(initialValue);
    }
    // !initialValue ? setValue("") : setValue(initialValue);
  }, [initialValue]);

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    displayValidationMessage(e);
    tableMeta?.updateData(row.index, column.id, value, e.target.validity.valid);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    displayValidationMessage(e);
    setValue(e.target.value);
    tableMeta?.updateData(
      row.index,
      column.id,
      e.target.value,
      e.target.validity.valid
    );
  };

  const displayValidationMessage = <
    T extends HTMLInputElement | HTMLSelectElement
  >(
    e: ChangeEvent<T>
  ) => {
    if (columnMeta?.validate) {
      const isValid = columnMeta.validate(e.target.value);
      if (isValid) {
        e.target.setCustomValidity("");
        setValidationMessage("");
      } else {
        e.target.setCustomValidity(columnMeta.validationMessage);
        setValidationMessage(columnMeta.validationMessage);
      }
    } else if (e.target.validity.valid) {
      setValidationMessage("");
    } else {
      setValidationMessage(e.target.validationMessage);
    }
  };

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onSelectChange}
        value={initialValue}
        required={columnMeta?.required}
        title={validationMessage}
      >
        {columnMeta?.options?.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : // (
    //   <input
    //     className="input input-bordered input-sm w-full max-w-xs"
    //     disabled={columnMeta?.disabled}
    //     value={unformatLocaleStringifyNumber(value, "ID")}
    //     onChange={(e) => setValue(e.target.value)}
    //     onBlur={onBlur}
    //     type={columnMeta?.type || "text"}
    //     required={columnMeta?.required}
    //     pattern={columnMeta?.pattern}
    //     title={validationMessage}
    //   />
    // );

    columnMeta?.type === "numeric" ? (
      <NumberFormatBase
        className="input input-bordered input-sm w-full max-w-xs"
        value={value}
        // onChange={(e) => setValue(e.target.value)}
        onValueChange={(values) => {
          const { formattedValue, value, floatValue } = values;
          // do something with floatValue
          setValue(floatValue);
        }}
        onBlur={onBlur}
        format={format}
      />
    ) : (
      <input
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        disabled={columnMeta?.disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
        required={columnMeta?.required}
        pattern={columnMeta?.pattern}
        title={validationMessage}
      />
    );
  }
  return <span>{value}</span>;
};
