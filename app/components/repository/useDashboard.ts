import useSWR, { mutate } from "swr";
import { Departemen } from "../models/departemen_model";
import { getSession } from "next-auth/react";
import CredentialFetch from "../lib/CredentialFetch";
import { redirect } from "next/navigation";

const urlGetPendapatanSopirDashboard = `/pendapatan-sopir-dashboard`;
const urlGetPotonganSopirDashboard = `/potongan-sopir-dashboard`;
const urlGetTotalDashboard = `/total-dashboard`;

export type PendapatanSopir = {
  nama: string;
  total: string;
};

export type TotalDashBoard = {
  pendapatanfinal: string;
  pendapatantotal: string;
  potongantotal: string;
};

async function getPendapatanSopirRequest() {
  const res = await CredentialFetch(urlGetPendapatanSopirDashboard, {});
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return res.json();
}

async function getPotonganSopirRequest() {
  const res = await CredentialFetch(urlGetPotonganSopirDashboard, {});
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return res.json();
}

async function getTotalRequest() {
  const res = await CredentialFetch(urlGetTotalDashboard, {});
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return res.json();
}

export default function useDashBoard() {
  const {
    data: dataPendapatanSopir,
    isValidating: isValidatingPendapatanSopir,
    error: errorPendapatanSopir,
  } = useSWR(urlGetPendapatanSopirDashboard, getPendapatanSopirRequest);

  const {
    data: dataPotonganSopir,
    isValidating: isValidatingPotonganSopir,
    error: errorPotonganSopir,
  } = useSWR(urlGetPotonganSopirDashboard, getPotonganSopirRequest, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      return;
    },
  });

  const {
    data: dataTotal,
    isValidating: isValidatingTotal,
    error: errorTotal,
  } = useSWR(urlGetTotalDashboard, getTotalRequest, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      return;
    },
  });

  return {
    dataPendapatanSopir: dataPendapatanSopir ?? [],
    isValidatingPendapatanSopir,
    errorPendapatanSopir,

    dataPotonganSopir: dataPotonganSopir ?? [],
    isValidatingPotonganSopir,
    errorPotonganSopir,

    dataTotal: dataTotal ?? [],
    isValidatingTotal,
    errorTotal,
  };
}
