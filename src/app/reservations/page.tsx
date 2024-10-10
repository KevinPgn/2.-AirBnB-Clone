import { getUserBookings } from "@/server/Reservation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { format, differenceInDays } from "date-fns"
import { Badge } from "@/components/ui/badge"

const MyReservationsPage = async () => {
  const bookings = await getUserBookings({})
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
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings?.data?.map((booking) => (
                    <TableRow key={booking.home.id}>
                        <TableCell>{booking.home.title}</TableCell>
                        <TableCell>{format(booking.startDate, "MMM dd, yyyy")}</TableCell>
                        <TableCell>{format(booking.endDate, "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                            {booking.status === "pending" ? <Badge className="bg-yellow-500">Pending</Badge> : booking.status === "confirmed" ? <Badge className="bg-green-500">Confirmed</Badge> : <Badge className="bg-red-500">Cancelled</Badge>}
                        </TableCell>
                        <TableCell>{nightPrice(booking)}</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="destructive">Cancel</Button>
                            <Button>Review</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </section>
  )
}

export default MyReservationsPage