import {
  ListingSearchParams,
  PagedListingResponse,
} from "@/types/listing";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function searchListings(
  params: ListingSearchParams
): Promise<PagedListingResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const response = await fetch(
    `${API_BASE_URL}/api/listings/search?${query.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Listing search failed: ${response.status}`);
  }

  return response.json();
}