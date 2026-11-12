export interface Listing {
  id: string;
  source: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  latitude: number;
  longitude: number;
  listedDate: string;
  status: string;
  description: string;
}

export interface ListingSearchResult {
  listing: Listing;
  relevanceScore: number;
}

export interface PagedListingResponse {
  content: ListingSearchResult[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface ListingSearchParams {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  city?: string;
  keyword?: string;
  targetBudget?: number;
  page?: number;
  pageSize?: number;
}