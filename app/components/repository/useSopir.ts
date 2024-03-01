import useSWR, { mutate } from "swr";
import { Sopir } from "../models/sopir_model";
import { getSession } from "next-auth/react";
import CredentialFetch from "../lib/CredentialFetch";
import { redirect } from "next/navigation";

const url = `/sopir`;

async function updateRequest(id: string, data: Sopir) {
  const response = await CredentialFetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(data: Sopir) {
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
  if (!response.ok) return undefined;
  return response.json();
}

export default function useSopir() {
  const { data, isValidating, error } = useSWR(url, getRequest);

  // if (!data) {
  //   redirect("/login?message=expire");
  // }

  const updateRow = async (id: string, postData: Sopir) => {
    postData.dept_id = postData.nama_departemen!;
    return updateRequest(id, postData).finally(() => {
      mutate(url);
    });
  };

  const deleteRow = async (id: string) => {
    return deleteRequest(id).finally(() => {
      mutate(url);
    });
  };

  const addRow = async (postData: Sopir) => {
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
