import { Button, Modal, TextInput } from "flowbite-react";
import React from "react";

type Field = {
  name: string;
  type: string;
  required?: boolean;
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
                return (
                  <TextInput
                    key={field.name}
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.name}
                    required={field.required}
                  />
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
