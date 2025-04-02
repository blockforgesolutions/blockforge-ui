import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Drawer } from "@/components/ui/drawer";
import { X } from "lucide-react";

interface MobileFilterSidebarProps {
  categories: { id: string; name: string }[];
  onFilterChange?: (filters: { categories: string[] }) => void;
}

export default function MobileFilterSidebar({
  categories,
  onFilterChange,
}: MobileFilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelection = (value: string) => {
    setSelectedCategories(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full text-white bg-black dark:text-black dark:bg-white"
      >
        Filters
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <X 
              className="cursor-pointer" 
              onClick={() => setIsOpen(false)} 
              role="button" // Erişilebilirlik için
            />
          </div>

          <h3 className="text-lg font-medium">Categories</h3>
          <ScrollArea className="h-40">
            {categories.map(category => (
              <div key={category.id} className="flex items-center space-x-2 py-1">
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleSelection(category.id)}
                />
                <label>{category.name}</label>
              </div>
            ))}
          </ScrollArea>

          <Separator className="my-4" />

          <Button
            className="w-full mt-4"
            onClick={() => {
              onFilterChange?.({ categories: selectedCategories });
              setIsOpen(false);
            }}
          >
            Save
          </Button>
        </div>
      </Drawer>
    </>
  );
}