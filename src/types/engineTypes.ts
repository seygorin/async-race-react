import { MutationDefinition } from "@reduxjs/toolkit/query";
import { ApiBuilder } from "./apiTypes";

export interface EngineSuccessResponse {
  velocity: number;
  distance: number;
  error?: boolean;
  stopped?: boolean;
}

export interface EngineErrorResponse {
  id: number;
  velocity: number;
  distance: number;
  error: boolean;
  errorMessage: string;
}

export type EngineResponse = EngineSuccessResponse & { id: number };

export type EngineResult = EngineResponse | EngineErrorResponse;

export type { EngineResult as EngineResultType };

export type EngineMutation = (arg: number) => Promise<EngineResponse | undefined>;

export interface DriveEngineSuccessResponse {
  success: boolean;
}

export interface DriveEngineErrorResponse {
  id: number;
  success: boolean;
  error: boolean;
  errorMessage: string;
}

export type DriveEngineResponse = DriveEngineSuccessResponse & { id: number };

export type EngineMutationDefinition = MutationDefinition<
  number,
  ApiBuilder,
  "Engine" | "Cats" | "Winners",
  EngineResponse,
  "api"
>;
