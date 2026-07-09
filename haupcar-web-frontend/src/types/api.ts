export interface ApiPaginationRequest {
  page: number;
  limit: number;
}

export interface ApiPaginationResponse {
  page: number;
  limit: number;
  totalPage: number;
  totalRaws: number;
  prev: boolean;
  next: boolean;
}
