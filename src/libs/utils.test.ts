import { getRandomNumber } from './utils'

describe('getRandomNumber()', () => {
  test('should return a random number', async () => {
    const min = 1
    const max = 20
    const results = [...Array(100)].map(() => getRandomNumber(min, max))

    results.forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(min)
      expect(value).toBeLessThanOrEqual(max)
    })
  })
})
