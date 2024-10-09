"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { createBooking } from "@/server/Reservation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
  homeId,
  price,
  bookings,
}: {
  className?: string
  homeId: string
  price: number
  bookings: {
    startDate: Date
    endDate: Date
  }[]
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const disabledDates = React.useMemo(() => {
    const dates: Date[] = [];
    bookings.forEach(booking => {
      let currentDate = new Date(booking.startDate);
      while (currentDate <= new Date(booking.endDate)) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return dates;
  }, [bookings]);

  const totalPrice = date?.from && date?.to
  ? price * Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
  : 0;  

  const handleBook = async () => {
      try {
          if (date?.from && date?.to) {
              const startDate = format(date.from, "yyyy-MM-dd");
              const endDate = format(date.to, "yyyy-MM-dd");
              const booking = await createBooking({
                  startDate,
                  endDate,
                  homeId,
                })
                console.log(booking)
                // Ici, vous pouvez utiliser ces dates formatées pour créer la réservation
                // await createBooking(homeId, formattedFromDate, formattedToDate);
            } else {
        console.log("Please select both start and end dates");
    }
} catch (error) {
    console.log(error)
}
}

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={disabledDates}
          />
        </PopoverContent>
      </Popover>
      <p className="text-red-500 text-lg">Total price: {totalPrice}€</p>
      <Button className="w-full bg-red-500 text-white hover:bg-red-600 mt-3" onClick={handleBook}>Make a reservation</Button>
    </div>
  )
}
