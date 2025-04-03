import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface SortProps {
  onFilterChange?: (filters: { sortBy?: string }) => void;
}

export function CourseSort({ onFilterChange }: SortProps) {
  const [sortBy, setSortBy] = useState<string | null>(null);
  
  const sortOptions = [
    { label: "A-Z", value: "nameAsc" },
    { label: "Z-A", value: "nameDesc" },
    { label: "Price: Low to High", value: "priceAsc" },
    { label: "Price: High to Low", value: "priceDesc" }
  ];

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onFilterChange?.({ sortBy: value });
  };

  // Display "Sort by" initially, or the selected option after selection
  const buttonText = sortBy 
    ? sortOptions.find(option => option.value === sortBy)?.label 
    : "Sort by";

  return (
    <div className="flex justify-end mb-2 mr-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            {buttonText}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={sortBy === option.value ? "bg-accent" : ""}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}