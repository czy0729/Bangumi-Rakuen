/*
 * @Author: czy0729
 * @Date: 2022-02-24 17:56:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-24 18:01:05
 */
const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./data/group/raw.json'))
data = data.filter((item) => item.n >= 2)

fs.writeFileSync(`./data/group/group.min.json`, JSON.stringify(data))
