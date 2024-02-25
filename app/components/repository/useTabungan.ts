import useSWR, { mutate } from "swr";
import { Tabungan } from "../models/tabungan_model";
import { getSession } from "next-auth/react";
import CredentialFetch from "../lib/CredentialFetch";
import { redirect } from "next/navigation";

const url = `/tabungan`;

async function updateRequest(id: string, data: Tabungan) {
  const response = await CredentialFetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(data: Tabungan) {
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

async function getSummaryRequest() {
  const response = await CredentialFetch("/tabungan-summary", {});
  return response.json();
}

export default function useTabungan() {
  const { data, isValidating, error } = useSWR(url, getRequest);

  const {
    data: dataSummary,
    isValidating: isValidatingSummary,
    error: errorSummary,
  } = useSWR("/tabungan-summary", getSummaryRequest);

  const updateRow = async (id: string, postData: Tabungan) => {
    return updateRequest(id, postData).finally(() => {
      mutate(url);
    });
  };

  const deleteRow = async (id: string) => {
    return deleteRequest(id).finally(() => {
      mutate(url);
    });
  };

  const addRow = async (postData: Tabungan) => {
    return addRequest(postData).finally(() => {
      mutate(url);
    });
  };

  return {
    data: data ?? [],
    isValidating,
    error,
    dataSummary: dataSummary,
    isValidatingSummary,
    errorSummary,
    addRow,
    updateRow,
    deleteRow,
  };
}
