
export interface Appointment {
   id: number
   startDate: string
   endDate: string
   user: number
   massage: number
   status: 'FREE' | 'BOOKED'
}