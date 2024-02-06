import useSWR, { mutate } from "swr";
import { Departemen } from "../models/departemen_model";
import { getSession } from "next-auth/react";
import CredentialFetch from "../lib/CredentialFetch";

const url = `/departemen`;

async function updateRequest(id: string, data: Departemen) {
  const response = await CredentialFetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(data: Departemen) {
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

export default function usePeriode() {
  const { data, isValidating, error } = useSWR(url, getRequest);

  const updateRow = async (id: string, postData: Departemen) => {
    return updateRequest(id, postData).finally(() => {
      mutate(url);
    });
  };

  const deleteRow = async (id: string) => {
    return deleteRequest(id).finally(() => {
      mutate(url);
    });
  };

  const addRow = async (postData: Departemen) => {
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
