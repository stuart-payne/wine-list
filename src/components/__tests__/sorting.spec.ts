import { describe, it, expect } from 'vitest'
import { sortingStrategy } from '@/stores/wineStore'
import { Sorting, Country, WineType } from '@/enums'
import type { Wine } from '@/types'

const fakeWine: Omit<Wine, 'price'> = {
  name: 'fake',
  country: Country.UK,
  wineType: WineType.Red,
}

describe('sorting', () => {
  it('asc sorts correctly', () => {
    const arr = [4, 5, 3, 1, 2].map((n) => ({ ...fakeWine, price: n }))
    const strategy = sortingStrategy[Sorting.PriceAsc]
    expect(arr.sort(strategy).map((w) => w.price)).toStrictEqual([1, 2, 3, 4, 5])
  })
  it('desc sorts correctly', () => {
    const arr = [4, 5, 3, 1, 2].map((n) => ({ ...fakeWine, price: n }))
    const strategy = sortingStrategy[Sorting.PriceDesc]
    expect(arr.sort(strategy).map((w) => w.price)).toStrictEqual([5, 4, 3, 2, 1])
  })
})
