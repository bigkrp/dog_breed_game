import fs from 'fs'
import path from 'path'

const imgPath = path.resolve('static', 'images', 'breeds')

const fileList = fs.readdirSync(imgPath)

const imagesData = {}

for (const file of fileList) {
    const id = file.match(/(.+)_/)[1]
    const extension = file.match(/\..+$/)[0]
    const wh = file.match(/^.+_(.*)\./)[1]
    const [w, h] = wh.split('x')

    // fs.renameSync(path.resolve(imgPath, file), path.resolve(imgPath, `${id}${extention}`), () => {})
    imagesData[id] = {
        w,
        h,
        extension,
    }
}

await fs.writeFile('imagesData.json', JSON.stringify(imagesData), 'utf-8', () => {})

console.debug('imagesData.json')
