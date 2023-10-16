/*
 * @Author: czy0729
 * @Date: 2022-02-24 17:56:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-17 06:25:13
 */
const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./data/group/raw.json'))
data = data.filter((item) => item.n >= 10)

fs.writeFileSync(`./data/group/group.min.json`, JSON.stringify(data))
