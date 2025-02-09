"use client";

import { useState } from "react";
import { CheckboxCard } from "@/components/ui/checkbox";

const categories = [
  "Fiction",
  "Non-fiction",
  "Science",
  "History",
  "Biography",
  "Technology",
];

export default function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      {categories.map((category) => (
        <CheckboxCard
          key={category}
          label={category}
          checked={selectedCategories.includes(category)}
          onCheckedChange={() => handleCategoryChange(category)}
        />
      ))}
    </div>
  );
}
