import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { Sorting, WineType, Country } from '../enums'
import { LOAD_MORE_INCREMENTS, INITIAL_WINE_COUNT } from '../constants'
import { fakeTimeout } from '../utils'
import type { Wine } from '../types'

export const useWineStore = defineStore('wine', () => {
  const loadedWines = ref<Wine[]>(wines.slice(0, INITIAL_WINE_COUNT))

  const hasMore = computed(() => loadedWines.value.length !== sortedWines.value.length)
  const isLoading = ref(false)
  const loadingMore = ref(false)

  const selectedSorting = ref(Sorting.None)
  const selectedCountry = ref<Country | ''>('')
  const selectedWineType = ref<WineType | ''>('')

  watch(selectedWineType, onFilterChange)
  watch(selectedCountry, onFilterChange)
  watch(selectedSorting, onFilterChange)

  function getFilteredWines(wines: Wine[]): Wine[] {
    return wines
      .filter((w) => selectedCountry.value === '' || w.country === selectedCountry.value)
      .filter((w) => selectedWineType.value === '' || w.wineType === selectedWineType.value)
  }

  const filteredWines = computed(() => getFilteredWines(wines))
  const sortedWines = computed(() => {
    if (selectedSorting.value === Sorting.None) {
      return filteredWines.value
    } else {
      return filteredWines.value.sort(sortingStrategy[selectedSorting.value])
    }
  })

  async function getMore() {
    loadingMore.value = true
    // to make it look like a request is actually happened :)
    await fakeTimeout()
    loadedWines.value = loadedWines.value.concat(
      sortedWines.value.slice(
        loadedWines.value.length,
        Math.min(loadedWines.value.length + LOAD_MORE_INCREMENTS, wines.length),
      ),
    )
    loadingMore.value = false
  }

  async function onFilterChange() {
    isLoading.value = true
    await fakeTimeout()
    loadedWines.value = sortedWines.value.slice(0, INITIAL_WINE_COUNT)
    isLoading.value = false
  }

  return {
    loadedWines,
    isLoading,
    loadingMore,
    hasMore,
    getMore,
    onFilterChange,
    filteredWines,
    sortedWines,
    getFilteredWines,
    selectedCountry,
    selectedWineType,
    selectedSorting,
  }
})

export const sortingStrategy = {
  [Sorting.PriceAsc]: (w1: Wine, w2: Wine) => {
    if (w1.price === w2.price) {
      return 0
    } else if (w1.price < w2.price) {
      return -1
    } else {
      return 1
    }
  },
  [Sorting.PriceDesc]: (w1: Wine, w2: Wine) => {
    if (w1.price === w2.price) {
      return 0
    } else if (w1.price < w2.price) {
      return 1
    } else {
      return -1
    }
  },
} as const

// my wine database

const wines: Wine[] = [
  { name: 'Bordeaux Rouge', wineType: WineType.Red, country: Country.France, price: 8.99 },
  {
    name: 'Chardonnay Champagne',
    wineType: WineType.Sparkling,
    country: Country.France,
    price: 12.99,
  },
  { name: 'Syrah from Barossa', wineType: WineType.Red, country: Country.Australia, price: 14.99 },
  { name: 'Margaux Rosé', wineType: WineType.Rose, country: Country.France, price: 6.99 },
  { name: 'Napa Valley Cabernet', wineType: WineType.Red, country: Country.UK, price: 9.99 },
  { name: 'Riesling from Mosel', wineType: WineType.White, country: Country.Germany, price: 14.99 },
  { name: 'Sauvignon Blanc', wineType: WineType.White, country: Country.NewZealand, price: 15.99 },
  { name: 'Tuscan Sangiovese', wineType: WineType.Red, country: Country.Italy, price: 8.99 },
  { name: 'Chianti Classico', wineType: WineType.Red, country: Country.Italy, price: 9.99 },
  { name: 'Prosecco DOCG', wineType: WineType.Sparkling, country: Country.Italy, price: 6.99 },
  {
    name: 'Shiraz from McLaren Vale',
    wineType: WineType.Red,
    country: Country.Australia,
    price: 14.99,
  },
  { name: 'Gavi di Gavi', wineType: WineType.White, country: Country.Italy, price: 4.99 },
  { name: 'White Zinfandel', wineType: WineType.Rose, country: Country.UK, price: 8.99 },
  { name: 'Côtes du Rhône', wineType: WineType.Red, country: Country.France, price: 16.99 },
  { name: 'Sancerre', wineType: WineType.White, country: Country.France, price: 17.99 },
  { name: "Moscato d'Asti", wineType: WineType.Sparkling, country: Country.Italy, price: 18.99 },
  { name: 'Châteauneuf-du-Pape', wineType: WineType.Red, country: Country.France, price: 5.99 },
  { name: 'Vouvrays', wineType: WineType.White, country: Country.France, price: 8.99 },
  { name: 'Pinot Grigio', wineType: WineType.White, country: Country.Italy, price: 11.99 },
  { name: 'Merlot from Napa', wineType: WineType.Red, country: Country.UK, price: 12.99 },
  { name: 'Viognier from Rhone', wineType: WineType.White, country: Country.France, price: 11.99 },
  { name: 'Zinfandel from Sonoma', wineType: WineType.Red, country: Country.UK, price: 10.99 },
  { name: 'Champagne Brut', wineType: WineType.Sparkling, country: Country.France, price: 12.99 },
  { name: 'White Burgundy', wineType: WineType.White, country: Country.France, price: 9.99 },
  {
    name: 'Cabernet Sauvignon from Margaret River',
    wineType: WineType.Red,
    country: Country.Australia,
    price: 7.99,
  },
  {
    name: 'Riesling from Clare Valley',
    wineType: WineType.White,
    country: Country.Australia,
    price: 18.99,
  },
  { name: 'Shiraz from Barossa', wineType: WineType.Red, country: Country.Australia, price: 12.99 },
  {
    name: 'Chardonnay from Waipara',
    wineType: WineType.White,
    country: Country.NewZealand,
    price: 14.99,
  },
  {
    name: 'Pinot Noir from Central Otago',
    wineType: WineType.Red,
    country: Country.NewZealand,
    price: 11.99,
  },
  {
    name: 'Sauvignon Blanc from Marlborough',
    wineType: WineType.White,
    country: Country.NewZealand,
    price: 7.99,
  },
  {
    name: 'Sparkling Shiraz',
    wineType: WineType.Sparkling,
    country: Country.Australia,
    price: 8.99,
  },
  { name: 'Grenache from Sérine', wineType: WineType.Rose, country: Country.France, price: 9.99 },
  { name: 'Carménère from Maipo', wineType: WineType.Red, country: Country.Chile, price: 11.99 },
  {
    name: 'Sauvignon Blanc from Casablanca',
    wineType: WineType.White,
    country: Country.Chile,
    price: 12.99,
  },
  {
    name: 'Chardonnay from Casablanca',
    wineType: WineType.White,
    country: Country.Chile,
    price: 14.99,
  },
  { name: 'Merlot from Cachapoal', wineType: WineType.Red, country: Country.Chile, price: 15.99 },
  { name: 'Syrah from Colchagua', wineType: WineType.Red, country: Country.Chile, price: 4.99 },
  { name: 'Sparkling Malbec', wineType: WineType.Sparkling, country: Country.Chile, price: 7.99 },
  { name: 'Torrontés Riojano', wineType: WineType.White, country: Country.Argentina, price: 4.99 },
  { name: 'Malbec from Mendoza', wineType: WineType.Red, country: Country.Argentina, price: 8.99 },
  {
    name: 'Bonarda from Luján de Cuyo',
    wineType: WineType.Red,
    country: Country.Argentina,
    price: 11.99,
  },
  { name: 'Syrah from Salta', wineType: WineType.Red, country: Country.Argentina, price: 15.99 },
  { name: 'Tannat from Uruguay', wineType: WineType.Red, country: Country.Portugal, price: 14.99 },
  { name: 'Port Wine', wineType: WineType.Red, country: Country.Portugal, price: 8.99 },
  { name: 'Vinho Verde', wineType: WineType.White, country: Country.Portugal, price: 9.99 },
  {
    name: 'Sparkling Vinho Verde',
    wineType: WineType.Sparkling,
    country: Country.Portugal,
    price: 7.99,
  },
  {
    name: 'Sangria from Country.Spain',
    wineType: WineType.Rose,
    country: Country.Spain,
    price: 16.99,
  },
  { name: 'Tempranillo from Rioja', wineType: WineType.Red, country: Country.Spain, price: 15.99 },
  { name: 'Sherry from Jerez', wineType: WineType.White, country: Country.Spain, price: 11.99 },
  { name: 'Cava', wineType: WineType.Sparkling, country: Country.Spain, price: 7.99 },
  {
    name: 'Clarete from Country.Portugal',
    wineType: WineType.Rose,
    country: Country.Portugal,
    price: 6.99,
  },
  {
    name: 'Cabernet Franc from St. Emilion',
    wineType: WineType.Red,
    country: Country.France,
    price: 8.99,
  },
  {
    name: 'Sémillon from Sauternes',
    wineType: WineType.White,
    country: Country.France,
    price: 11.99,
  },
  {
    name: 'Petit Verdot from Medoc',
    wineType: WineType.Red,
    country: Country.France,
    price: 10.99,
  },
  { name: 'Bordeaux Blanc', wineType: WineType.White, country: Country.France, price: 7.99 },
  { name: 'Bordeaux Rosé', wineType: WineType.Rose, country: Country.France, price: 5.99 },
  { name: 'Sancerre Rosé', wineType: WineType.Rose, country: Country.France, price: 8.99 },
  { name: 'Vouvray Moelleux', wineType: WineType.White, country: Country.France, price: 9.99 },
  { name: 'Anjou Rosé', wineType: WineType.Rose, country: Country.France, price: 15.99 },
  { name: 'Cahors', wineType: WineType.Red, country: Country.France, price: 14.99 },
  { name: 'Entre-Deux-Mers', wineType: WineType.White, country: Country.France, price: 12.99 },
  { name: 'Fronsac', wineType: WineType.Red, country: Country.France, price: 13.99 },
  { name: 'Graves', wineType: WineType.White, country: Country.France, price: 13.99 },
  { name: 'Madiran', wineType: WineType.Red, country: Country.France, price: 15.99 },
  { name: 'Bourgogne', wineType: WineType.White, country: Country.France, price: 6.99 },
  { name: 'Alsace Riesling', wineType: WineType.White, country: Country.France, price: 5.99 },
  { name: 'Crozes-Hermitage', wineType: WineType.Red, country: Country.France, price: 8.99 },
  { name: 'St. Joseph', wineType: WineType.Red, country: Country.France, price: 11.99 },
  { name: 'Cornas', wineType: WineType.Red, country: Country.France, price: 10.99 },
  {
    name: 'Viognier from Condrieu',
    wineType: WineType.White,
    country: Country.France,
    price: 6.99,
  },
  {
    name: 'Muscadet from Sevre et Maine',
    wineType: WineType.White,
    country: Country.France,
    price: 4.99,
  },
  { name: 'Rosé from Bandol', wineType: WineType.Rose, country: Country.France, price: 8.99 },
  { name: 'Roussillon', wineType: WineType.Red, country: Country.France, price: 14.99 },
  { name: 'Banyuls', wineType: WineType.Red, country: Country.France, price: 12.99 },
  { name: 'Rivesaltes', wineType: WineType.Red, country: Country.France, price: 13.99 },
  { name: 'Côtes du Jura', wineType: WineType.White, country: Country.France, price: 16.99 },
  { name: 'Vins de Savoie', wineType: WineType.White, country: Country.France, price: 14.99 },
  { name: 'Red from Languedoc', wineType: WineType.Red, country: Country.France, price: 11.99 },
  { name: 'White from Languedoc', wineType: WineType.White, country: Country.France, price: 8.99 },
  { name: 'Rosé from Languedoc', wineType: WineType.Rose, country: Country.France, price: 10.99 },
  { name: 'Sardana from Penedès', wineType: WineType.White, country: Country.Spain, price: 6.99 },
  { name: 'Graciano from Rioja', wineType: WineType.Red, country: Country.Spain, price: 11.99 },
  { name: 'Garnacha from Priorat', wineType: WineType.Red, country: Country.Spain, price: 10.99 },
  {
    name: 'Albariño from Rías Baixas',
    wineType: WineType.White,
    country: Country.Spain,
    price: 19.99,
  },
  {
    name: 'Txakoli from Basque Country',
    wineType: WineType.White,
    country: Country.Spain,
    price: 15.99,
  },
  { name: 'Bobal from Ubeda', wineType: WineType.Red, country: Country.Spain, price: 6.99 },
  { name: 'Verdejo from Rueda', wineType: WineType.White, country: Country.Spain, price: 7.99 },
  {
    name: 'Red from Ribera del Duero',
    wineType: WineType.Red,
    country: Country.Spain,
    price: 9.99,
  },
  { name: 'White from Rueda', wineType: WineType.White, country: Country.Spain, price: 5.99 },
  { name: 'Smirni ', wineType: WineType.White, country: Country.Georgia, price: 14.99 },
  { name: 'Chinuri', wineType: WineType.White, country: Country.Georgia, price: 13.99 },
  { name: 'Svanureli', wineType: WineType.Red, country: Country.Georgia, price: 14.99 },
  { name: 'Mtsvane', wineType: WineType.White, country: Country.Georgia, price: 12.99 },
  { name: 'Ojalesi', wineType: WineType.Red, country: Country.Georgia, price: 7.99 },
  { name: 'Kisi', wineType: WineType.Rose, country: Country.Georgia, price: 9.99 },
]
