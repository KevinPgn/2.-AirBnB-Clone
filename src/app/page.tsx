import { CategoryItemsFilter } from "@/components/category/CategoryItemsFilter";
import { ListHomes } from "@/components/listHome/ListHomes";
import React from "react";
import { getHomes } from "@/server/Home";

interface HomeProps {
  searchParams: {
    category: string | undefined | null;
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const category = searchParams.category as string | undefined;
  const homes = await getHomes(category);
  
  return (
    <div className="px-10">
      <CategoryItemsFilter />
      <ListHomes homes={homes}/>
    </div>
  );
}
