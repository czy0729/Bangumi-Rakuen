/*
 * @Author: czy0729
 * @Date: 2020-01-17 21:10:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-17 21:23:40
 */
// const axios = require('axios')
const fs = require('fs')
const path = require('path')
const cheerio = require('./utils/cheerio')
const utils = require('./utils/utils')

const filePath = './data/topic/3500/350003.json'
if (fs.existsSync(filePath)) {
  const { avatar } = JSON.parse(fs.readFileSync(filePath))
  const src = `https:${avatar}`
  
}
