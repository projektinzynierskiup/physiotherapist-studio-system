import { Appointment } from "./appointment.model"

export interface CalendarCell {
   startDate: string
   endDate: string
   isBooked: boolean
   isFinished: boolean
   appointment?: Appointment
   isExpanded: boolean
   id?: number
   isSelected?: boolean
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