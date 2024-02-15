import useSWR, { mutate } from "swr";
import { DrafTransaksi } from "../models/draft_transaksi_model";
import { getSession } from "next-auth/react";
import CredentialFetch from "../lib/CredentialFetch";
import CredentialUploadFetch from "../lib/CredentialUploadFetch";
import { redirect } from "next/navigation";
import { throws } from "assert";

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

async function deleteSelectionRequest(id: string) {
  const response = await CredentialFetch(`${url}/deletebulkid`, {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
  });
  return response.json();
}

async function getRequest() {
  const response = await CredentialFetch(url, {});
  if (response.status == 401) {
    const error = new Error("Unauthenticated");
    throw error;
  }
  return response.json();
}

async function postDataRequest(idPeriode: number) {
  const response = await CredentialFetch(`${url}/kalkulasi-draft-transaksi`, {
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

  const response = await CredentialUploadFetch(`${url}/import-excel`, {
    method: "POST",
    body: body,
  });
  return response.json();
};

export default function usePeriode() {
  const { data, isValidating, error } = useSWR(url, getRequest, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Only retry up to 10 times.
      if (retryCount >= 10) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

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

  const deleteRowSelection = async (id: string) => {
    return deleteSelectionRequest(id).finally(() => {
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
    deleteRowSelection,
    updateRow,
    deleteRow,
    addImportData,
    postData,
    postingDraftData,
  };
}
