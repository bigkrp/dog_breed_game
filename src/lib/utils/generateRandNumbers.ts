export const generateRandNumbers = (numbers: number, max: number): number[] => {
    const result = new Set<number>()

    if (numbers > max) {
        throw new Error('Numbers should be less than range')
    }

    while (result.size < numbers) {
        result.add(Math.floor(Math.random() * max) + 1)
    }

    return [...result]
}
