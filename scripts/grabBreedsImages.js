import fs from 'fs'
import path from 'path'
import stream from 'stream'

const dogApiBreedsPath = path.resolve('downloads', 'theDogApiBreeds.json')
const dogApiBreedsImageErrorPath = path.resolve('downloads', 'dogApiBreedsImageError.json')

const grabBreeds = async () => {
    if (fs.existsSync(dogApiBreedsPath)) {
        try {
            const rawData = fs.readFileSync(dogApiBreedsPath)
            return JSON.parse(rawData)
        } catch (error) {
            console.error(`Error whe trying read ${dogApiBreedsPath}`)
        }
    }

    try {
        const response = await fetch('https://api.thedogapi.com/v1/breeds', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return await response.json()
    } catch (error) {
        console.error('TheDogApi error')
        return []
    }
}

const downloadFile = async (url, folder = '.') => {
    const res = await fetch(url, { headers: {} })
    if (!fs.existsSync('downloads')) await fs.mkdir('downloads', {}, () => {}) //Optional if you already have downloads directory
    const destination = path.resolve('./downloads', folder)
    const fileStream = fs.createWriteStream(destination, { flags: 'wx' })
    await stream.finished(stream.Readable.fromWeb(res.body).pipe(fileStream), {}, () => {})
}

const grabImagesJsonByBreed = async (breeds) => {
    const result = []
    const errResult = []
    const ids = JSON.parse(fs.readFileSync(dogApiBreedsImageErrorPath))

    for (const id of ids) {
        try {
            const response = await fetch(
                `https://api.thedogapi.com/v1/images/search?breed_id=${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key':
                            'live_MxcVJdY4lXaLgxuZlnkRRWPYhSgG7BYvQtmBBgqZDWm2YDlY9phVjhZtRbxj0GDg',
                    },
                },
            )

            console.debug('response', response)

            const responseJson = await response.json()

            console.debug('responseJson', responseJson)

            const first = responseJson.at(0)
            result.push({
                breedId: id,
                imgUrl: first.url,
                width: first.width,
                height: first.height,
            })
        } catch (error) {
        }
    }
    return result
}

const downloadImagesByImagesJson = async (imagesJson) => {
    imagesJson = await imagesJson

    // console.debug('imagesJson', imagesJson)

    for (const imagesJsonElement of imagesJson) {
        const imgExtention = imagesJsonElement.imgUrl.match(/.*\.(\w*)/)[1]
        const imgName = `${imagesJsonElement.breedId}_${imagesJsonElement.width}x${imagesJsonElement.height}.${imgExtention}`

        await downloadFile(imagesJsonElement.imgUrl, imgName)
        console.debug('Image was downloaded', imgName)
    }
}
const downloadMissedImagesByImagesJson = async (imagesJson) => {
    imagesJson = await imagesJson

    for (const imagesJsonElement of imagesJson) {
        const imgExtention = imagesJsonElement.imgUrl.match(/.*\.(\w*)/)[1]
        const imgName = `${imagesJsonElement.breedId}_${imagesJsonElement.width}x${imagesJsonElement.height}.${imgExtention}`

        if (!fs.existsSync(path.resolve('downloads', imgName))) {
            await downloadFile(imagesJsonElement.imgUrl, imgName)
            console.debug('Image was downloaded', imgName)
        }
    }

}

const imgJSON = grabImagesJsonByBreed(/*breeds*/)

downloadImagesByImagesJson(imgJSON)

