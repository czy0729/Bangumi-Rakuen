/*
 * @Author: czy0729
 * @Date: 2020-01-14 18:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-08-11 15:18:47
 */
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const cheerio = require('./utils/cheerio')
const utils = require('./utils/utils')

const rewrite = true

function fetchSubject(id) {
  return new Promise(async (resolve, reject) => {
    const filePathTopic = `./data/topic/${Math.floor(id / 100)}/${id}.json`
    const filePathComment = `./data/comment/${Math.floor(id / 100)}/${id}.json`
    const filePathOmit = `./data/omit/${Math.floor(id / 100)}/${id}.json`
    if (
      !rewrite &&
      (fs.existsSync(filePathTopic) || fs.existsSync(filePathOmit))
    ) {
      // console.log(`- skip ${id}.json [${index}]`)
      return resolve(true)
    }

    const { data: html } = await axios({
      url: `https://bgm.tv/group/topic/${id}`,
    })
    const data = cheerio.cheerioMono(html)
    if (!data.topic.floor) {
      console.log(`- skip ${id}.json`)

      const dirPathOmit = path.dirname(filePathOmit)
      if (!fs.existsSync(dirPathOmit)) {
        fs.mkdirSync(dirPathOmit)
      }
      fs.writeFileSync(`./data/omit/${Math.floor(id / 100)}/${id}.json`, '')
      return resolve(true)
    }
    data._loaded = utils.getTimestamp()

    const dirPathTopic = path.dirname(filePathTopic)
    if (!fs.existsSync(dirPathTopic)) {
      fs.mkdirSync(dirPathTopic)
    }
    fs.writeFileSync(filePathTopic, utils.safeStringify(data.topic))

    const dirPathComment = path.dirname(filePathComment)
    if (!fs.existsSync(dirPathComment)) {
      fs.mkdirSync(dirPathComment)
    }
    fs.writeFileSync(filePathComment, utils.safeStringify(data.comments))

    console.log(`- writing ${id}.json`, data.topic.title)
    return resolve(true)
  })
}

const start = 358100
const end = 358500

// const start = 325000
// const end = 330000

const fetchs = []
for (let i = start; i <= end; i++) {
  fetchs.push(() => fetchSubject(i))
}
utils.queue(fetchs, 8)
