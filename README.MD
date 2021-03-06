## Bangumi 超展开静态数据快照

[![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Rakuen/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Rakuen)

服务于 [Bangumi-App](https://github.com/czy0729/Bangumi).

因服务器在国外, App 里请求官方 API 和分析网页整合数据渲染特别慢, 所以对超展开 (帖子) 进行了爬虫快照, 以达到网页服务器慢也不影响 App 内卡住的目的. 暂只爬了小组的主楼部分, 留言变化大爬取意义不大.

页面数据 fallback: 网页解释 > CDN.

通过 jsdelivr 达到白嫖效果.

### 使用方法

```
https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Rakuen@master/data/topic/${parseInt(parseInt(topicId) / 100)}/${topicId}.json
```

例如 https://bgm.tv/group/topic/350677

```
https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Rakuen@master/data/topic/3506/350677.json
```

### 自动更新 js 脚本

[待补充]

### 结构描述

```
{
  "avatar": "//lain.bgm.tv/pic/user/m/000/45/62/456208.jpg",
  "floor": "#1",
  "group": "番组开发",
  "groupHref": "/group/dev",
  "groupThumb": "//lain.bgm.tv/pic/icon/m/000/00/41/4180.jpg?r=1519373244",
  "message": "v2.4.0 - 2020/01/07<br>—— 新功能 ——<br>- [x] [发现] 目录 (自己收藏和创建的目录待下版本)<br>- [x] [条目] 章节右侧增加 [搜索] 功能 (暂支持一个动漫和三次元都非常齐全的源头, 未来会增加更多源头)<br><br>—— 优化 ——<br>- [x] [条目] 人工修正了最近新番的在线源头<br>- [x] [条目] 设置里可选择隐藏他人bgm评分<br>- [x] [小圣杯助手] 稍微再优化了部分业务流程<br>- [x] [小圣杯助手] 拖动条右方加入 [最大] 按钮<br><br>下个版本<br>——小圣杯助手 ——<br>- [ ] 角色关注<br>- [ ] 全网卖一推荐<br>- [ ] 持仓买一推荐<br>- [ ] 竞拍推荐<br><br>iOS的超官方APP风格, 突出收藏功能, <span style=\"text-decoration: line-through;\"> 所以是现在这样的布局, </span> 期间感谢 <a href=\"https://bangumi.tv/user/419012\" target=\"_blank\" rel=\"nofollow external noopener\" class=\"l\">@ekibun</a> 的大量支持, 包括账号登陆逻辑, 爬虫直接用<img src=\"/img/smiles/tv/62.gif\" smileid=\"101\" alt=\"(bgm85)\"><br><br>一眼看完本应用<br><img src=\"https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/1.png\" class=\"code\" alt><br><img src=\"https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/d-2.png\" class=\"code\" alt><br><img src=\"https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/t-1.png\" class=\"code\" alt><br><br>详细看 <a href=\"https://github.com/czy0729/Bangumi/blob/master/web/LIGHT-MODE.MD\" target=\"_blank\" rel=\"nofollow external noopener\" class=\"l\">日间模式</a> | <a href=\"https://github.com/czy0729/Bangumi/blob/master/web/DARK-MODE.MD\" target=\"_blank\" rel=\"nofollow external noopener\" class=\"l\">夜间模式</a><br><br>下载 <a href=\"https://www.coolapk.com/apk/235642\" target=\"_blank\" rel=\"nofollow external noopener\" class=\"l\">酷安APK</a> | <a href=\"https://github.com/czy0729/Bangumi/releases\" target=\"_blank\" rel=\"nofollow external noopener\" class=\"l\">Github下载</a> | <a href=\"https://github.com/czy0729/Bangumi/blob/master/IOS-TEST.MD\" target=\"_blank\" rel=\"nofollow external noopener\" class=\"l\">iOS审核失败中, 提前试用</a> | Testflight<br><a href=\"https://github.com/czy0729/Bangumi\" target=\"_blank\" rel=\"nofollow external noopener\" class=\"l\">项目地址</a> 欢迎star | <a href=\"https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD\" target=\"_blank\" rel=\"nofollow external noopener\" class=\"l\">所有更新</a> ",
  "time": "2019-5-13 23:24",
  "title": "[20/01/07更新] 安卓/iOS bgm客户端",
  "userId": "sukaretto",
  "userName": "czy0729",
  "userSign": "(安卓/iOS Bgm App http://bgm.tv/group/topic/350677 ...)"
}
```
