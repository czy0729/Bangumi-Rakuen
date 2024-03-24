/*
 * @Author: czy0729
 * @Date: 2022-02-23 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-24 23:21:20
 */
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const utils = require('./utils/utils')

// navigator.userAgent
// document.cookie
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Cookie:
    '_ga=GA1.1.2037657089.1675671081; prg_list_mode=full; 2592000; chii_sec_id=zrBpW0j9%2FooIhKrPSOelBNSRRgVU9C0VfT0ssw4; chii_cookietime=2592000; chii_theme_choose=1; chii_theme=dark; _ga_1109JLGMHN=deleted; prg_display_mode=normal; __utmz=1.1706236694.5980.82.utmcsr=github.com|utmccn=(referral)|utmcmd=referral|utmcct=/czy0729/Bangumi/issues/136; __utma=1.825736922.1638495774.1707805909.1708659320.6144; _ga_1109JLGMHN=GS1.1.1708659320.3003.1.1708659748.0.0.0; chii_auth=1rkGdUk1DxDRMiWv9Bb1GW6znbr%2BiNPc7UvOF7RF1n78ly31UyAasEhhNFOOaIjW6WmDBhKiazWJMYM8hTwWeYdAL0zy36fg%2BPog; chii_sid=taB5cT',
}
const page = 129
const data = []

async function fetchGroup() {
  for (let i = 1; i <= page; i++) {
    const url = `https://bgm.tv/group/category/all?page=${i}`
    const { data: html } = await axios({
      url,
      headers,
    })
    console.log(url)

    const $ = utils.cheerio(html)
    $('#memberGroupList li').each((index, element) => {
      const $li = utils.cheerio(element)
      const title = $li.find('a').text().trim()
      const url = $li.find('a').attr('href').replace('/group/', '')
      const img = $li.find('img').attr('src').split('?')[0]
      const i =
        img.match(
          /\/\/lain.bgm.tv\/pic\/icon\/m\/000\/00\/.+?\/(\d+).jpg/
        )?.[1] || ''
      const feeds = Number(
        $li.find('.feed').text().trim().replace(' 位成员', '')
      )

      const item = {
        t: title,
        n: feeds,
      }
      if (i) {
        item.i = Number(i)
      } else {
        item.u = url
      }
      data.push(item)
    })
  }
  fs.writeFileSync(
    `./data/group/raw.json`,
    JSON.stringify(
      data.sort((a, b) => b.n - a.n),
      null,
      2
    )
  )
}
fetchGroup()
