"use client";

import { FormEvent, useState } from "react";
import { ListingSearchParams } from "@/types/listing";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ListingFiltersProps {
  onSearch: (params: ListingSearchParams) => void;
}

export default function ListingFilters({ onSearch }: ListingFiltersProps) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");
  const [targetBudget, setTargetBudget] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch({
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minBedrooms: minBedrooms ? Number(minBedrooms) : undefined,
      city: city.trim() || undefined,
      keyword: keyword.trim() || undefined,
      targetBudget: targetBudget ? Number(targetBudget) : undefined,
      page: 0,
      pageSize: 10,
    });
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinBedrooms("");
    setCity("");
    setKeyword("");
    setTargetBudget("");

    onSearch({
      page: 0,
      pageSize: 10,
    });
  };

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City
          </label>
          <Input
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="minBedrooms" className="text-sm font-medium">
            Minimum Bedrooms
          </label>
          <Input
            id="minBedrooms"
            type="number"
            min="0"
            placeholder="Any"
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="keyword" className="text-sm font-medium">
            Description Keyword
          </label>
          <Input
            id="keyword"
            placeholder="e.g. Metro, garden, parking"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="minPrice" className="text-sm font-medium">
            Minimum Price ($)
          </label>
          <Input
            id="minPrice"
            type="number"
            min="0"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="maxPrice" className="text-sm font-medium">
            Maximum Price ($)
          </label>
          <Input
            id="maxPrice"
            type="number"
            min="0"
            placeholder="No limit"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="targetBudget" className="text-sm font-medium">
            Target Budget ($)
          </label>
          <Input
            id="targetBudget"
            type="number"
            min="1"
            placeholder="Your ideal budget"
            value={targetBudget}
            onChange={(e) => setTargetBudget(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit">Search Properties</Button>

        <Button type="button" variant="outline" onClick={handleClear}>
          Clear Filters
        </Button>
      </div>
    </form>
  );
}