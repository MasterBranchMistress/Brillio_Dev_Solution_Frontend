
import { ListingSearchResult } from "@/types/listing";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ListingCardProps {
  result: ListingSearchResult;
}

export default function ListingCard({ result }: ListingCardProps) {
  const { listing, relevanceScore } = result;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(listing.price);

  const formattedDate = new Date(
    `${listing.listedDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-xl">
              {formattedPrice}
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              {listing.address}
            </p>

            <p className="text-sm text-muted-foreground">
              {listing.city}, {listing.state} {listing.zip}
            </p>
          </div>

          <Badge variant="secondary">
            {listing.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Separator />

        <div className="flex flex-wrap gap-4 text-sm">
          <span>{listing.bedrooms} Beds</span>
          <span>{listing.bathrooms} Baths</span>
          <span>{listing.sqft.toLocaleString()} Sq Ft</span>
        </div>

        <p className="text-sm text-muted-foreground">
          {listing.description}
        </p>

        <Separator />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Listed {formattedDate}</span>
          <span>Score: {(relevanceScore * 100).toFixed(1)}%</span>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Source: {listing.source}</span>
          <span>ID: {listing.id}</span>
        </div>
      </CardContent>
    </Card>
  );
}
