export const Home = ({home}: any) => {
  return <>
    <h2 className='text-2xl font-bold mb-3'>{home.title}</h2>
    <img src={home.photo} alt={home.title} width={450} height={300} className='rounded-lg w-full h-[600px] object-cover' />
  </>
}