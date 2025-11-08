"use client"

import { useState, useEffect, ChangeEvent } from 'react';
import { OffersGrid } from './offers-grid';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowDownUp } from 'lucide-react';
import { 
  ExtendedServiceItem, 
  isServiceAvailableAtLocation, 
  sortOffers 
} from './utils';

interface LocationSelectorProps {
  initialOffers: ExtendedServiceItem[];
}

export function LocationSelector({ initialOffers }: LocationSelectorProps) {
  const [location, setLocation] = useState<string>("All Locations");
  const [sortOption, setSortOption] = useState<string>("discount");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredOffers, setFilteredOffers] = useState<ExtendedServiceItem[]>(initialOffers);
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);
  const [filterKey, setFilterKey] = useState<number>(0); // Key to force re-render and animation
  
  // Extract unique locations from offers
  const availableLocations = ["All Locations", ...new Set(
    initialOffers.flatMap(offer => offer.availableLocations || [offer.location || ""])
  )].filter(Boolean);

  // Filter and sort offers when criteria change
  useEffect(() => {
    let result = [...initialOffers];
    
    // Filter by location
    if (location !== "All Locations") {
      result = result.filter(offer => isServiceAvailableAtLocation(offer, location));
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(offer => 
        offer.name.toLowerCase().includes(query) || 
        (offer.category && offer.category.toLowerCase().includes(query))
      );
    }
    
    // Sort offers
    result = sortOffers(result, sortOption);
    
    setFilteredOffers(result);
    // Increment key to force re-render with animations
    setFilterKey(prevKey => prevKey + 1);
  }, [initialOffers, location, sortOption, searchQuery]);
  
  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  
  return (
    <div className="space-y-8">
      <div className="p-4 bg-background rounded-xl border">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search input */}
          <div className="relative w-full md:w-64 flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search offers..."
              className="pl-9 transition-all focus:ring-2 ring-primary/20"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Location filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter size={16} className="text-muted-foreground hidden sm:block" />
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {availableLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Sort options */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <ArrowDownUp size={16} className="text-muted-foreground hidden sm:block" />
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Highest Discount</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <div key={filterKey}>
          {filteredOffers.length > 0 ? (
            <OffersGrid offers={filteredOffers} />
          ) : (
            <div className="text-center py-12 px-4 border border-dashed rounded-xl">
              <h3 className="text-xl font-medium mb-2">No matching offers found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria to find what you&apos;re looking for.
              </p>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => {
                  setLocation("All Locations");
                  setSearchQuery("");
                  setSortOption("discount");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
    </div>
  );
}