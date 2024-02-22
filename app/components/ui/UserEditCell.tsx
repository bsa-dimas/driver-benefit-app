import { MouseEvent } from "react";
import { MdLockReset } from "react-icons/md";

export const UserEditCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const validRow = meta?.validRows[row.id];
  // console.log(row.id + " " + JSON.stringify(validRow));
  // const disableSubmit = validRow
  //   ? Object.values(validRow)?.some((item) => !item)
  //   : false;

  const disableSubmit = false;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      e.currentTarget.name === "cancel"
        ? meta?.revertData(row.index)
        : meta?.updateRow(row.index);
    }
  };

  const resetPassword = (e: MouseEvent<HTMLButtonElement>) => {
    meta?.resetPassword(row.index);
  };

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  return (
    <div className="flex gap-2">
      {meta?.editedRows[row.id] ? (
        <div className="edit-cell-action flex gap-2">
          <button className="btn btn-xs" onClick={setEditedRows} name="cancel">
            ⚊
          </button>{" "}
          <button
            className="btn btn-xs"
            onClick={setEditedRows}
            name="done"
            disabled={disableSubmit}
          >
            ✔
          </button>
        </div>
      ) : (
        <div className="edit-cell-action flex gap-2">
          <button className="btn" onClick={resetPassword} name="edit">
            <MdLockReset />
          </button>
          <button className="btn btn-xs" onClick={setEditedRows} name="edit">
            ✐
          </button>
          <button className="btn btn-xs" onClick={removeRow} name="remove">
            X
          </button>
        </div>
      )}
    </div>
  );
};
