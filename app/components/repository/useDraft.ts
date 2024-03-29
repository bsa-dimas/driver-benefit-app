import useSWR, { mutate } from "swr";
import { DrafTransaksi } from "../models/draft_transaksi_model";
import { getSession } from "next-auth/react";
import CredentialFetch from "../lib/CredentialFetch";

const url = `/draft-transaksi`;

async function updateRequest(id: string, data: DrafTransaksi) {
  const response = await CredentialFetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(data: DrafTransaksi) {
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

async function postDataRequest(idPeriode: number) {
  const response = await CredentialFetch(`${url}/post-draft-transaksi`, {
    method: "POST",
    body: JSON.stringify({
      periode: idPeriode,
    }),
  });
  return response.json();
}

async function postingDraftDataRequest(idPeriode: number) {
  const response = await CredentialFetch(
    `${url}/posting-draft-data-transaksi`,
    {
      method: "POST",
      body: JSON.stringify({
        periode: idPeriode,
      }),
    }
  );
  return response.json();
}

const importData = async (file: any) => {
  const body = new FormData();
  body.append("file", file);

  const response = await CredentialFetch(`${url}/import-excel`, {
    method: "POST",
    body: body,
  });
  return response.json();
};

export default function usePeriode() {
  const { data, isValidating, error } = useSWR(url, getRequest);

  const updateRow = async (id: string, postData: DrafTransaksi) => {
    return updateRequest(id, postData).finally(() => {
      mutate(url);
    });
  };

  const deleteRow = async (id: string) => {
    return deleteRequest(id).finally(() => {
      mutate(url);
    });
  };

  const addRow = async (postData: DrafTransaksi) => {
    return addRequest(postData).finally(() => {
      mutate(url);
    });
  };

  const addImportData = async (file: any) => {
    return importData(file).finally(() => {
      mutate(url);
    });
  };

  const postData = async (file: any) => {
    return postDataRequest(file).finally(() => {
      mutate(url);
    });
  };

  const postingDraftData = async (data: any) => {
    return postingDraftDataRequest(data).finally(() => {
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
    addImportData,
    postData,
    postingDraftData,
  };
}
