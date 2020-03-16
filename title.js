/*
 * @Author: czy0729
 * @Date: 2020-03-11 14:24:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-11 14:45:25
 */
const fs = require('fs')
const path = require('path')
const join = require('path').join

const filePaths = []
function findJsonFile(path) {
  fs.readdirSync(path).forEach((item, index) => {
    const fPath = join(path, item)
    const stat = fs.statSync(fPath)
    if (stat.isDirectory() === true) {
      findJsonFile(fPath)
    }
    if (stat.isFile() === true && fPath !== 'data/topic/.DS_Store') {
      filePaths.push(fPath)
    }
  })
}
findJsonFile('./data/topic')

const titles = filePaths
  .map(item => {
    const { title } = JSON.parse(fs.readFileSync(item))
    const splits = item.split('/')
    const id = splits[splits.length - 1].replace('.json', '')
    return `${id}#${title}`
  })
  .sort((a, b) => b.localeCompare(a))

const filePath = './data/title/title.json'
fs.writeFileSync(filePath, JSON.stringify(titles))
