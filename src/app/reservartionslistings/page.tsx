import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getOwnerBookings } from "@/server/Reservation"
import { format, differenceInDays } from "date-fns"

const ReservationsListingsPage = async () => {
  const bookings = await getOwnerBookings({})
  const nightPrice = (booking: any) => {
    const startDate = booking.startDate
    const endDate = booking.endDate
    const totalNights = differenceInDays(endDate, startDate)
    return totalNights * booking.home.price
  }

  return (
    <section className="py-10 max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-bold mb-10">My reservations</h1>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Home title</TableHead>
                    <TableHead>Check in date</TableHead>
                    <TableHead>Check out date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings?.data?.map((booking) => (
                    <TableRow key={booking.home.id}>
                        <TableCell>{booking.home.title}</TableCell>
                        <TableCell>{format(booking.startDate, "MMM dd, yyyy")}</TableCell>
                        <TableCell>{format(booking.endDate, "MMM dd, yyyy")}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>{nightPrice(booking)}</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="destructive">Refuse</Button>
                            <Button className="bg-green-500 hover:bg-green-600">Accept</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </section>
  )
}

export default ReservationsListingsPage