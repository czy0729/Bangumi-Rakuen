/*
 * @Author: czy0729
 * @Date: 2020-10-22 00:16:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-22 13:49:28
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
    if (stat.isFile() === true && !fPath.includes('.DS_Store')) {
      filePaths.push(fPath)
    }
  })
}

findJsonFile('./data/topic')

const users = {}
filePaths.forEach((item) => {
  const {
    id,
    userId,
    userName,
    avatar,
    group,
    groupHref,
    time,
    title,
  } = JSON.parse(fs.readFileSync(item))
  if (!users[userId]) {
    users[userId] = {}
  }

  users[userId][id] = {
    id,
    uid: userId,
    un: userName,

    // "avatar": "//lain.bgm.tv/pic/user/m/000/00/00/17.jpg"
    av: avatar.replace(/\/\/lain.bgm.tv\/pic\/user\/m\/|.jpg/g, ''),
    t: title,
    ti: time,
    g: group,

    // "groupHref": "/group/negima"
    gh: groupHref.replace('/group/', ''),
  }
})

Object.keys(users).forEach((key) => {
  const item = users[key]
  const filePath = `./data/user/${String(key).slice(0, 1)}/${key}.json`

  const dirPath = path.dirname(filePath)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }

  const data = Object.keys(item)
    .map((k) => item[k])
    .reverse()
  fs.writeFileSync(filePath, JSON.stringify(data))
})
