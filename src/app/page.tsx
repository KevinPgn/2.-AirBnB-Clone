import { CategoryItemsFilter } from "@/components/category/CategoryItemsFilter";
import React from "react";

interface HomeProps {
  searchParams: {
    category: string | undefined | null;
  }
}

export default function Home({ searchParams }: HomeProps) {
  const category = searchParams.category as string | undefined;
  
  return (
    <div className="px-10">
      <CategoryItemsFilter />
    </div>
  );
}
