import fs from 'fs'

const grabBreeds = async () => {
    let data
    try {
        const response = await fetch('https://api.thedogapi.com/v1/breeds', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        data = await response.json()

        // return data
    } catch (error) {
        console.error('TheDogApi error')
        // return []
    }
    let stringified
    try {
        stringified = JSON.stringify(data)
    } catch (error) {
        console.error('Stringify error:', error)
    }

    try {
        console.debug('data', data)
        await fs.writeFile('theDogApiBreeds.json', stringified, 'utf-8', () => {})
        console.debug('File has written successfully')
    } catch (error) {
        console.error('WriteFile error:', error)
    }
}

grabBreeds()
