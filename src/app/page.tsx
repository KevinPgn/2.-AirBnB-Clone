import { CategoryItemsFilter } from "@/components/category/CategoryItemsFilter";
import { ListHomes } from "@/components/listHome/ListHomes";
import React from "react";
import { getHomes } from "@/server/Home";
import { NoHomesFind } from "@/features/NoHomesFind";

interface HomeProps {
  searchParams: {
    category: string | undefined | null;
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const category = searchParams.category as string | undefined;
  const homes = await getHomes(category);
  
  if(homes.length === 0) {
    return (
      <div className="px-10">
      <CategoryItemsFilter />
      <NoHomesFind />
    </div>
    )
  }

  return (
    <div className="px-10">
      <CategoryItemsFilter />
      <div className="flex flex-wrap gap-7 mt-5 mb-5 items-start justify-center">
        {homes.map((home: any) => (
          <ListHomes key={home.id} home={home}/>
        ))}
      </div>
    </div>
  );
}
