'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import MobileFilterSidebar from "./course-mobil-sidebar";

interface SidebarProps {
  categories: { id: string; name: string }[];
  onFilterChange?: (filters: { categories: string[]; sortBy?: string }) => void;
}

export default function Sidebar({ categories, onFilterChange }: SidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleFilterChange = () => {
    onFilterChange?.({ categories: selectedCategories });
  };

  return (
    <>
      {/* Mobile */}
      <div className="block lg:hidden">
        <MobileFilterSidebar
          categories={categories}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* Desktop */}
      <aside className="hidden lg:block w-[300px] bg-background p-2 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <Separator className="mb-4" />
        
        <h3 className="text-lg font-medium mb-2">Categories</h3>
        <ScrollArea className="h-40">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-2 py-1">
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => 
                  setSelectedCategories(prev =>
                    prev.includes(category.id)
                      ? prev.filter(item => item !== category.id)
                      : [...prev, category.id]
                  )
                }
              />
              <label>{category.name}</label>
            </div>
          ))}
        </ScrollArea>

        <Separator className="my-4" />

        <Button 
          className="w-full"
          onClick={handleFilterChange}
        >
          Apply Filters
        </Button>
      </aside>
    </>
  );
}
