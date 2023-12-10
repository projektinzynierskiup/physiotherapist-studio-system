import { Appointment } from "./appointment.model"

export interface CalendarCell {
   startDate: string
   endDate: string
   isBooked: boolean
   appointment?: Appointment
   isExpanded: boolean
}

export interface CalendarDay {
   day: string
   today: boolean
   passed: boolean
   cells: CalendarCell[]
}

export interface CalendarWeek {
   week: string
   days: CalendarDay[]
}

export interface Calendar {
   weeks: CalendarWeek[]
}