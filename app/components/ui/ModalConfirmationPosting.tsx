"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ModalConfirmationPosting({
  onSubmit,
  isOpen,
  closeModal,
}: any) {
  return (
    <>
      <Modal show={isOpen} size="md" onClose={() => closeModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Data tidak bisa diubah setelah di Posting, Posting Data Draft?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={onSubmit}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => closeModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
