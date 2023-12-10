import { OfferItem } from "./offeritem.model"
import { User } from "./user.model"

export interface Appointment {
   id?: number
   startDate?: string
   endDate?: string
   userId?: number
   massageId?: number
   status?: 'FREE' | 'BOOKED'
   userEmail?: string
   userPhone?: string
   usersDTO?: any
   massageDTO?: any
}

// export interface AppointmentGuest {
//    id: number
//    startDate?: string
//    endDate?: string
//    userId: string
//    massageId: number
//    status: 'FREE' | 'BOOKED'

// }