"use client";

import { Alert, Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";

type Field = {
  label?: string;
  default?: string;
  name: string;
  type: string;
  required?: boolean;
  dataSelect?: FieldSelect[];
};

export type FieldSelect = {
  id: string;
  value: string;
};

const field = {};

export default function CreateForm({
  fields,
  onSubmit,
  isOpen,
  closeModal,
  errorBE,
}: {
  fields: Field[];
  onSubmit: (e: any) => void;
  isOpen: boolean;
  closeModal: () => void;
  errorBE?: any;
}) {
  const renderErrors = (field: string) =>
    errorBE?.[field]?.map((error: string, index: number) => (
      <span key={`error${index}`}>{error.replace("nik", "nim")}</span>
    ));

  const [data, setData] = useState<string>();
  const onChange = (e: any) => {
    const index = e.target.selectedIndex;
    setData(e.target.value);
  };

  return (
    <div>
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Tambah Data</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form
              className="flex flex-col gap-2 align-middle"
              onSubmit={onSubmit}
            >
              {fields.map((field, index) => {
                if (field.type == "select") {
                  return (
                    <div key={index}>
                      <Label
                        key={`Label${field.name}`}
                        htmlFor={field.name}
                        color={renderErrors(field.name) && "failure"}
                        value={field.label ?? field.name}
                      />
                      <Select
                        key={`Select${field.name}`}
                        name={field.name}
                        required={field.required}
                        onChange={onChange}
                        color={renderErrors(field.name) && "failure"}
                        helperText={renderErrors(field.name)}
                      >
                        <option value="">{field.label}</option>
                        {field.dataSelect?.map(
                          (data: FieldSelect, index: number) => (
                            <option key={index} value={data.id}>
                              {data.value}
                            </option>
                          )
                        )}
                      </Select>
                    </div>

                    // <Select
                    //   sizing="sm"
                    //   key={field.name}
                    //   required={field.required}
                    //   onChange={onChange}
                    // >
                    //   <option key={0} value="">
                    //     Pilih Kode Transaksi
                    //   </option>
                    //   <option key={1} value="U">
                    //     U - Upah
                    //   </option>
                    //   <option key={2} value="P">
                    //     P - Pendapatan Lain - Lain
                    //   </option>
                    //   <option key={3} value="K">
                    //     K - Keluar Lain - Lain
                    //   </option>
                    //   <option key={4} value="A">
                    //     A - Ambil Tabungan
                    //   </option>
                    // </Select>
                  );
                } else {
                  return (
                    <div key={index}>
                      <Label
                        key={`label${field.name}`}
                        htmlFor={field.name}
                        color={renderErrors(field.name) && "failure"}
                        value={field.label ?? field.name}
                      />
                      <TextInput
                        key={`TextInput${field.name}`}
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        onChange={() => {}}
                        value={field.default}
                        placeholder={field.label ?? field.name}
                        required={field.required}
                        color={renderErrors(field.name) && "failure"}
                        helperText={renderErrors(field.name)}
                      />
                    </div>
                  );
                }
              })}
              <Button type="submit">Save</Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
