import { getUserBookings } from "@/server/Reservation"

const MyReservationsPage = async () => {
  const bookings = await getUserBookings({})
  
  return (
    <div>MyReservationsPage</div>
  )
}

export default MyReservationsPage