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
  const {homes, isFavorite} = await getHomes(category);
  
  return (
    <div className="px-10">
      <CategoryItemsFilter />
      <div className="flex flex-wrap gap-7 mt-5 mb-5 items-start justify-center">
        {homes.map((home: any) => (
          <ListHomes key={home.id} home={home} isFavorite={isFavorite}/>
        ))}
      </div>
    </div>
  );
}
