import breeds from './theDogApiBreeds.json'

export interface Dimension {
    imperial: string
    metric: string
}

export interface TheDogApiBreed {
    weight: Dimension
    height: Dimension
    id: number
    name: string
    bred_for?: string
    breed_group?: string
    life_span: string
    temperament?: string
    // reference_image_id: string
}

// 'https://api.thedogapi.com/v1/breeds/264'
export const breedProvider = async (): Promise<TheDogApiBreed[]> => {
    return new Promise((resolve) => {
        resolve(breeds as TheDogApiBreed[])
    })
}
