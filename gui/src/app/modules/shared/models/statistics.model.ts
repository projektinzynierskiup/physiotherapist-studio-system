export interface Statistics {
    id?: number
    numberOfAppointmentsAYear?: number
    numberOfAppointmentsAMonth?: number
    numberOfMassagesAYear?: NumberType[]
    numberOfMassagesAMonth?: NumberType[]
    yearIncome?: number
    averageMonthIncome?: number
    mostWantedMassageYear?: string
    mostWantedMassageMonth?: string
    yearNumber?: number
    monthNumber?: number
}

export interface NumberType {
    id?: number,
    numberOf?: number,
    typeOf?: string
}

export const ExampleStatistic : Statistics = {
    id: 0,
    numberOfAppointmentsAYear: 100,
    numberOfAppointmentsAMonth: 25,
    numberOfMassagesAMonth: [
        {
            id: 0,
            numberOf: 15,
            typeOf: "Relaksacyjny"
        },         {
            id: 0,
            numberOf: 20,
            typeOf: "Sportowy"
        },
    ],
    numberOfMassagesAYear: [
        {
            id: 0,
            numberOf: 150,
            typeOf: "Rehabilitacyjny"
        },         {
            id: 0,
            numberOf: 200,
            typeOf: "Terapeutyczny"
        },
    ],
    yearIncome: 200000,
    averageMonthIncome: 10000,
    mostWantedMassageYear: "Masaż Karku",
    mostWantedMassageMonth: "Masaż Relaksacyjny",
    yearNumber: 2024,
    monthNumber: 1
}