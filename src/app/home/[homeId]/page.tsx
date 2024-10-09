import React from 'react'
import { getHome } from '@/server/Home'
import { Home } from '@/components/homeDetails/Home'

const HomeDetailsPage = async ({ params }: { params: { homeId: string } }) => {
    const home = await getHome(params.homeId)

  return (
    <section className='py-5 max-w-[1300px] mx-auto'>
        <Home home={home} />
    </section>
  )
}

export default HomeDetailsPage