export interface queryString {
  readonly page?: number;
  readonly limit?: number;
  [key: string]: any;
}

export interface PaginationQuery {
  totalPages?: number;
  currentPage?: number;
  limit?: number;
  next?: number;
  prev?: number;
}