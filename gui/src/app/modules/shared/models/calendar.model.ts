import { Appointment } from "./appointment.model"

export interface CalendarCell {
   id: number
   startDate: string
   endDate: string
   isFree: boolean
   appointment?: Appointment
   isExpanded: boolean
}

export interface CalendarDay {
   day: string
   cells: CalendarCell[]
}

export interface CalendarWeek {
   week: string
   days: CalendarDay[]
}

export interface Calendar {
   weeks: CalendarWeek[]
}