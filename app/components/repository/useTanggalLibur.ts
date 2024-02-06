import useSWR, { mutate } from "swr";
import { TanggalLibur } from "../models/tanggallibur_model";
import { getSession } from "next-auth/react";
import CredentialFetch from "../lib/CredentialFetch";

const url = `/tanggallibur`;

async function updateRequest(id: string, data: TanggalLibur) {
  const response = await CredentialFetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(data: TanggalLibur) {
  const response = await CredentialFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

async function deleteRequest(id: string) {
  const response = await CredentialFetch(`${url}/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

async function getRequest() {
  const response = await CredentialFetch(url, {});
  return response.json();
}

export default function useTanggalLibur() {
  const { data, isValidating, error } = useSWR(url, getRequest);

  const updateRow = async (id: string, postData: TanggalLibur) => {
    return updateRequest(id, postData).finally(() => {
      mutate(url);
    });
  };

  const deleteRow = async (id: string) => {
    return deleteRequest(id).finally(() => {
      mutate(url);
    });
  };

  const addRow = async (postData: TanggalLibur) => {
    return addRequest(postData).finally(() => {
      mutate(url);
    });
  };

  return {
    data: data ?? [],
    isValidating,
    error,
    addRow,
    updateRow,
    deleteRow,
  };
}
