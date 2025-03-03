import { Country, WineType } from './enums'

export type Wine = {
  name: string
  wineType: WineType
  country: Country
  price: number
}
