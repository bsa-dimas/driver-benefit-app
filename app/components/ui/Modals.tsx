import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({ show, setShow }: Props) {
  return (
    <>
      {show && (
        <div className="fixed top-0 flex items-center justify-center p-10 left-0 right-0 bottom-0 bg-opacity-25 bg-black z-10">
          <div className="bg-white p-10 rounded-lg max-w-2xl z-50 relative overflow-y-scroll">
            <div
              className="absolute top-5 right-5 bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition-all cursor-pointer"
              onClick={() => setShow(false)}
            >
              <Image
                src="https://iconape.com/wp-content/png_logo_vector/cross-2.png"
                className="h-3 w-3"
                alt="image"
              />
            </div>
            <div className="font-bold text-2xl">Order placed successfully!</div>
            <div className="mt-5 font-medium">
              Your order has been placed successfully! Our team will have a look
              at your order and we will be responsible to deliver the
              deliverables on or before the delivery date. If you have any
              questions about your order, feel free to contact our support team.
              You can also track your order to know the latest status.
            </div>
            <div className="mt-5 space-x-3">
              <button className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all">
                Track order
              </button>
              <button
                onClick={() => setShow(false)}
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
              >
                Close modal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
