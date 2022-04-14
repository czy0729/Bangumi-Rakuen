/*
 * @Author: czy0729
 * @Date: 2022-02-23 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-23 18:35:13
 */
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const utils = require('./utils/utils')

// navigator.userAgent
// document.cookie
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
  Cookie:
    'chii_sec_id=pG5Jgrb5v3PhSnN%2B9S%2Bj0sTJQGDkbMC5jU2SCGE; chii_cookietime=2592000; chii_theme_choose=1; chii_theme=dark; prg_display_mode=normal; __utmz=1.1644620219.525.11.utmcsr=github.com|utmccn=(referral)|utmcmd=referral|utmcct=/czy0729/Bangumi/issues/44; chii_auth=GExWOvrUsXJzNDnFu0XLieYk3OUAXsZgk7c5AFhIs42YOXdVOgQxGJzFAODFEChN83SPOw%2Fmvt7OisRb93jy55qq1sHG8%2BCrE%2BET; chii_sid=2Y29L9; __utma=1.1636245540.1617210056.1645583134.1645609472.536; __utmc=1; __utmt=1; __utmb=1.45.10.1645609472',
}
const page = 107
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
