import { Review } from "./review.model";

export interface ReviewsPage {
  content: Review[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { unsorted: boolean; sorted: boolean; empty: boolean; };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}