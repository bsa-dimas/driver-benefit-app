import useSWR, { mutate } from "swr";
import { Periode } from "../models/periode_model";
import { getSession } from "next-auth/react";
import CredentialFetch from "../lib/CredentialFetch";
import { redirect } from "next/navigation";

const url = `/periode`;

async function updateRequest(id: string, data: Periode) {
  const response = await CredentialFetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(data: Periode) {
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

async function getPeriodeLockFalse() {
  const response = await CredentialFetch(`/getPeriodeLockFalse`, {});
  return response.json();
}

export default function usePeriode() {
  const { data, isValidating, error } = useSWR(url, getRequest);

  const {
    data: dataDraftTransaksi,
    isValidating: isValidatingDraftTransaksi,
    error: errorDraftTransaksi,
  } = useSWR(`${url}/getPeriodeLockFalse`, getPeriodeLockFalse);

  const updateRow = async (id: string, postData: Periode) => {
    return updateRequest(id, postData).finally(() => {
      mutate(url);
    });
  };

  const deleteRow = async (id: string) => {
    return deleteRequest(id).finally(() => {
      mutate(url);
    });
  };

  const addRow = async (postData: Periode) => {
    return addRequest(postData).finally(() => {
      mutate(url);
    });
  };

  return {
    data: data ?? [],
    isValidating,
    error,
    dataDraftTransaksi: dataDraftTransaksi ?? [],
    isValidatingDraftTransaksi,
    errorDraftTransaksi,
    addRow,
    updateRow,
    deleteRow,
  };
}
