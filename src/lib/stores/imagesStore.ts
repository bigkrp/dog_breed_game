import imagesData from './imagesData.json'

export interface ImagesData {
    w: string
    h: string
    extension: string
}

export const imageDataProvider = async (): Promise<Record<string, ImagesData>> => {
    return new Promise((resolve) => {
        resolve(imagesData as Record<string, ImagesData>)
    })
}
