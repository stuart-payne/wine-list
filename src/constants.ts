import { WineType } from './enums'

export const LOAD_MORE_INCREMENTS = 12
export const INITIAL_WINE_COUNT = 24
export const MOCK_LOADING_TIME = 1000

export const wineTypeStrings = {
  [WineType.Red]: 'Red',
  [WineType.Sparkling]: 'Sparkling',
  [WineType.Rose]: 'Rosé',
  [WineType.White]: 'White',
} as const

export const wineImages = {
  [WineType.Red]:
    'https://d1sixo6y2intz2.cloudfront.net/images/merchandising/content/wines/marcelo-bocardo-reserve-malbec-2023/mediumCutout.png',
  [WineType.Sparkling]:
    'https://d1sixo6y2intz2.cloudfront.net/images/merchandising/content/wines/villebois-methode-traditionnel-brut-2023/mediumCutout.png',
  [WineType.Rose]:
    'https://d1sixo6y2intz2.cloudfront.net/images/merchandising/content/wines/julian-faulkner-cotes-de-provence-ros--2023/mediumCutout.png',
  [WineType.White]:
    'https://d1sixo6y2intz2.cloudfront.net/images/merchandising/content/wines/benjamin-darnault-picpoul-de-pinet-2023/mediumCutout.png',
} as const
