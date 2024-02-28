"use client";

import { Button, Modal, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";

type Field = {
  name: string;
  type: string;
  required?: boolean;
  data?: string[];
};

const field = {};

export default function CreateForm({
  fields,
  onSubmit,
  isOpen,
  closeModal,
}: {
  fields: Field[];
  onSubmit: (e: any) => void;
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [data, setData] = useState<string>();
  const onChange = (e: any) => {
    const index = e.target.selectedIndex;
    setData(e.target.value);
  };

  return (
    <div>
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Add</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form
              className="flex flex-col gap-2 align-middle"
              onSubmit={onSubmit}
            >
              {fields.map((field) => {
                if (field.type == "select") {
                  return (
                    <Select
                      sizing="sm"
                      key={field.name}
                      required={field.required}
                      onChange={onChange}
                    >
                      <option key={0} value="">
                        Pilih Kode Transaksi
                      </option>
                      <option key={1} value="U">
                        U - Upah
                      </option>
                      <option key={2} value="P">
                        P - Pendapatan Lain - Lain
                      </option>
                      <option key={3} value="K">
                        K - Keluar Lain - Lain
                      </option>
                      <option key={4} value="A">
                        A - Ambil Tabungan
                      </option>
                    </Select>
                  );
                }

                return (
                  <div>
                    <div className="text-gray-900 dark:text-white">
                      {field.name}
                    </div>
                    <TextInput
                      key={field.name}
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.name}
                      required={field.required}
                    />
                  </div>
                );
              })}

              {/* {fields.map((field: any) => {
                if (field.type === "text" || field.type === "number") {
                  <TextInput
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.id}
                    {...field.required}
                  />;
                }
              })} */}
              {/* <TextInput id="name" type="text" placeholder="name" required />
              <TextInput id="email" type="email" placeholder="email" required />
              <TextInput
                id="role_id"
                type="number"
                placeholder="role_id"
                required
              /> */}
              <Button type="submit">Save</Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
