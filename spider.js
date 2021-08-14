/*
 * @Author: czy0729
 * @Date: 2020-01-14 18:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-14 15:32:07
 */
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const cheerio = require('./utils/cheerio')
const utils = require('./utils/utils')

const rewrite = true
const start = 363960
const end = 365000

function fetchSubject(id) {
  return new Promise(async (resolve, reject) => {
    const filePathTopic = `./data/topic/${Math.floor(id / 100)}/${id}.json`
    const filePathComment = `./data/comment/${Math.floor(id / 100)}/${id}.json`
    const filePathOmit = `./data/omit/${Math.floor(id / 100)}/${id}.json`
    if (
      !rewrite &&
      (fs.existsSync(filePathTopic) || fs.existsSync(filePathOmit))
    ) {
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
    fs.writeFileSync(
      filePathTopic,
      utils.safeStringify({
        id,
        ...data.topic,
      })
    )

    const dirPathComment = path.dirname(filePathComment)
    if (!fs.existsSync(dirPathComment)) {
      fs.mkdirSync(dirPathComment)
    }
    fs.writeFileSync(filePathComment, utils.safeStringify(data.comments))

    console.log(`- writing ${id}.json`, data.topic.time, data.topic.title)
    return resolve(true)
  })
}

const fetchs = []
for (let i = start; i <= end; i += 1) {
  fetchs.push(() => fetchSubject(i))
}
utils.queue(fetchs, 8)
