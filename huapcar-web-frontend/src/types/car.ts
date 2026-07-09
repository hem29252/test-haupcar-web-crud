import type { ApiPaginationRequest, ApiPaginationResponse } from "./api";

export interface ICar {
  brand: string;
  created_at: string;
  id: string;
  model: string;
  name: string;
  notes: string;
  registration_number: string;
  updated_at: string;
}

export interface ICarResponse {
  rows: ICar[];
  pagination: ApiPaginationResponse;
}

export interface ICarCreateRequest {
  registration_number: string;
  brand: string;
  model: string;
  notes?: string;
}

export interface ICarUpdateRequest {
  registration_number: string;
  brand: string;
  model: string;
  notes?: string;
}

export interface ICarPaginationRequest extends ApiPaginationRequest {
  search?: string;
  startDate?: string;
  endDate?: string;
}
