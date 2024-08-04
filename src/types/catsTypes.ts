export interface Cat {
  id: number;
  name: string;
  color: string;
}

export interface NewCat {
  name: string;
  color: string;
}

export interface AddCatResponse extends Cat {}

export interface GetCatsQueryParams {
  page: number;
  limit: number;
}

export interface GetCatsResponse {
  data: Cat[];
  totalCount: number;
}

export interface UpdateCatParams {
  id: number;
  name?: string;
  color?: string;
}

export interface UpdateCatResponse extends Cat {}

export type DeleteCatResponse = NonNullable<unknown>;
