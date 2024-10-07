import { describe, expect, it } from 'vitest'
import { generateRandNumbers } from '$lib/utils/generateRandNumbers'

describe('generateRandNumbers test', () => {
    it('should throw error if args not correct', () => {
        try {
            generateRandNumbers(3, 1)
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe('Numbers should be less than range')
            }
        }
    })
    it('should returns three different numbers from range 0-10', () => {
        const result = generateRandNumbers(3, 10)

        const isFirstAndSecondDifferent = result[0] !== result[1]
        const isSecondAndThirdDifferent = result[1] !== result[2]
        const isFirstAndThirdDifferent = result[0] !== result[2]

        expect(
            isFirstAndSecondDifferent && isSecondAndThirdDifferent && isFirstAndThirdDifferent,
        ).toBe(true)
    })
})
