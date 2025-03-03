import { MOCK_LOADING_TIME } from './constants'

export async function fakeTimeout() {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res()
    }, MOCK_LOADING_TIME)
  })
}
