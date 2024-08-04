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
}

export interface GetWinnersResponse {
  winners: Winner[];
  totalCount: number;
}
