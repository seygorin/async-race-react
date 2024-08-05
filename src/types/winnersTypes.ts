import { ColumnType } from "antd/es/table";
import { ReactNode } from "react";

export interface Winner {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface Winners {
  id: number;
  name: string;
  color: string;

  bestTime: number;
}

export interface CreateWinnerParams {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface CreateWinnerResponse {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface DeleteWinnerParams {
  id: number;
}

export interface UpdateWinnerParams {
  id: number;
  wins: number;
}

export interface UpdateWinnerResponse {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface GetWinnersParams {
  page: number;
  limit: number;
  sort?: "id" | "wins" | "time";
  order?: "ASC" | "DESC";
}

export interface GetWinnersResponse {
  winners: Winner[];
  totalCount: number;
}

export type WinnerColumnType = ColumnType<Winner>;

export type ActionColumnType = Omit<WinnerColumnType, "render"> & {
  render: (value: unknown, record: Winner, index: number) => ReactNode;
};

export type WinnerColumnsType = (WinnerColumnType | ActionColumnType)[];
