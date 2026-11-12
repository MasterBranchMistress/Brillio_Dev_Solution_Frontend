
"use client";

import { useEffect, useState } from "react";
import ListingFilters from "@/components/Listing/ListingFilters";
import { searchListings } from "@/lib/api";
import {
  ListingSearchParams,
  PagedListingResponse,
} from "@/types/listing";
import ListingCard from "@/components/Listing/ListingCard";

export default function Home() {
  const [results, setResults] = useState<PagedListingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: ListingSearchParams) => {
    try {
      setLoading(true);
      setError(null);

      const data = await searchListings(params);
      setResults(data);
    } catch (err) {
      console.error("Listing search failed:", err);
      setError("Unable to retrieve listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch({ page: 0, pageSize: 10 });
  }, []);

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Listing Search</h1>

      <ListingFilters onSearch={handleSearch} />

      {loading && <p>Loading listings...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && results && (
  <section className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Search Results</h2>
      <span className="text-sm text-muted-foreground">
        {results.totalElements} properties found
      </span>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {results.content.map((result) => (
        <ListingCard
          key={`${result.listing.source}-${result.listing.id}`}
          result={result}
        />
      ))}
    </div>
  </section>
)}
    </main>
  );
}
