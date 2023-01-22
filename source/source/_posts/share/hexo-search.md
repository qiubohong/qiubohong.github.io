---
title: hexo Yilia主题支持搜索功能
date: 2023-01-22 21:51:01
tags:
    - 技术分享
---

# 介绍

当hexo的文章越来越多，依靠标题和tag去搜索有点不够用，因此需要支持搜索功能，hexo查询主要依赖本地索引文件生成，具体步骤如下：

- 安装插件: `npm install --save hexo-generator-search`
- 根目录下的_config.yml中添加如下配置即可

<!-- more -->

```yaml
search:
  path: search.xml
  field: all
```
- 添加搜索框，在主题目录`themes/yilia/layout/layout.ejs`下的`<div id="wrapper" class="body-wrap">`后面添加如下代码：

```html
<% if(theme.search) { %>
  <div class="page-header" style="">
      <%# 《集成本地搜索 %>
      <script type="text/javascript" src="/js/search.js"></script>
      <div id="local-search" class="local-search local-search-plugin" style="">
        <input type="search" placeholder="站内搜索" id="local-search-input" class="local-search-input-cls" style="">
        <i id="local-search-icon-search" class="icon" aria-hidden="true" title="站内搜索">🔍</i>
        <div id="local-search-result" class="local-search-result-cls"></div>
      </div>
  
      <script type="text/javascript" src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
      <script>
          if ($('.local-search').size()) {
            $.getScript('/search/search.js', function() {
              searchFunc("/search.xml", 'local-search-input', 'local-search-result');
            });
          }
      </script>
      <%# 集成本地搜索》 %>
  </div>
  <% } %>
  <div id="wrapper" class="body-wrap">
```

- 新建`themes/yilia/source/search`目录，同时新增`search.js`和`search.css`文件

代码如下：

**search.js**
```javascript
// A local search script with the help of hexo-generator-search
// Copyright (C) 2015 
// Joseph Pan <http://github.com/wzpan>
// Shuhao Mao <http://github.com/maoshuhao>
// This library is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation; either version 2.1 of the
// License, or (at your option) any later version.
// 
// This library is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
// 02110-1301 USA
// 

var searchFunc = function (path, search_id, content_id) {
    'use strict';
    var BTN = "<i id='local-search-close'>x</i>";
    $.ajax({
        url: path,
        dataType: "xml",
        success: function (xmlResponse) {
            // get the contents from search data
            var datas = $("entry", xmlResponse).map(function () {
                return {
                    title: $("title", this).text(),
                    content: $("content", this).text(),
                    url: $("url", this).text()
                };
            }).get();

            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);

            $input.addEventListener('input', function () {
                var str = '<ul class=\"search-result-list\">';
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                $resultContent.innerHTML = "";
                if (this.value.trim().length <= 0) {
                    return;
                }
                // perform local searching
                datas.forEach(function (data) {
                    var isMatch = true;
                    var content_index = [];
                    if (!data.title || data.title.trim() === '') {
                        data.title = "Untitled";
                    }
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                    var data_url = data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty contents
                    if (data_content !== '') {
                        keywords.forEach(function (keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);

                            if (index_title < 0 && index_content < 0) {
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i == 0) {
                                    first_occur = index_content;
                                }
                                // content_index.push({index_content:index_content, keyword_len:keyword_len});
                            }
                        });
                    } else {
                        isMatch = false;
                    }
                    // show search results
                    if (isMatch) {
                        str += "<li><a href='" + data_url +
                            "' class='search-result-title'>" + data_title + "</a>";
                        var content = data.content.trim().replace(/<[^>]+>/g, "");
                        if (first_occur >= 0) {
                            // cut out 100 characters
                            var start = first_occur - 20;
                            var end = first_occur + 80;

                            if (start < 0) {
                                start = 0;
                            }

                            if (start == 0) {
                                end = 100;
                            }

                            if (end > content.length) {
                                end = content.length;
                            }

                            var match_content = content.substr(start, end);

                            // highlight all keywords
                            keywords.forEach(function (keyword) {
                                var regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS,
                                    "<em class=\"search-keyword\">" +
                                    keyword + "</em>");
                            });

                            str += "<p class=\"search-result\">" + match_content +
                                "...</p>"
                        }
                        str += "</li>";
                    }
                });
                str += "</ul>";
                if (str.indexOf('<li>') === -1) {
                    return $resultContent.innerHTML = BTN +
                        "<ul><span class='local-search-empty'>没有找到内容，更换下搜索词试试吧~<span></ul>";
                }
                $resultContent.innerHTML = BTN + str;
            });
        }
    });
    $(document).on('click', '#local-search-close', function () {
        $('#local-search-input').val('');
        $('#local-search-result').html('');
    });
    $(document).on('focus', '#local-search', function () {
        $('#local-search-icon-search').html('❌');
        $('#local-search-icon-search').attr('id', 'local-search-icon-close');
        //console.log("66666");
    });
    $(document).on('click', '#local-search-icon-close', function () {
        $('#local-search-input').val('');
        $('#local-search-result').html('');
        $('#local-search-icon-close').html('🔍');
        $('#local-search-icon-close').attr('id', 'local-search-icon-search');
        //console.log("1111");
    });
}
```

**search.css**
```css
.local-search {
    margin:16px 30px;
    position: relative;
}
.local-search-input-cls {
    width: 80%;
    /* margin: 10px 0; */
    padding: 8px 12px;
    border-radius: 4px;
    border: 2px solid #4d4d4d;
    color: #666;
    font-size: 14px
}
.local-search-input-cls::-webkit-input-placeholder {
    color: #2d2626;
}
.local-search-input-cls::-moz-input-placeholder {
    color: #2d2626;
}
.local-search-input-cls::-ms-input-placeholder {
    color: #2d2626;
}
#local-search-close {
    content:'x';
    position: absolute;
    right: 10px;
    top: 10px;
    background: #fff;
    color: #888;
    border-radius: 100%;
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-family: consolas;
    border: 1px solid #ccc;
    display: block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-style: normal;
    font-weight: 400;
    transform: rotateZ(0);
    transition: all .3s
}
#local-search-close:hover {
    border-color: #666;
    color: #222;
    transform: rotateZ(180deg);
    transition: all .3s
}
.local-search-result-cls {
    position: absolute;
    z-index: 99;
    width: 100%;
    /* top: 50px; */
    right: -16px;
}
.local-search-result-cls .local-search-empty {
    color: #888;
    line-height: 44px;
    text-align: center;
    display: block;
    font-size: 16px;
    font-weight: 400
}
.local-search-result-cls ul {
    width: 360px;
    max-height: 450px;
    min-height: 0;
    height: auto;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 3px 4px 10px #7dc3d8;
    margin-top: 20px;
}
.local-search-result-cls ul li {
    text-align: left;
    border-bottom: 1px solid #bdb7b7;
    padding-bottom: 20px;
    margin-bottom: 20px;
    line-height: 30px;
    font-weight: 400
}
.local-search-result-cls ul li:last-child {
    border-bottom: none;
    margin-bottom: 0
}
.local-search-result-cls ul li a {
    margin-top: 20px;
    font-size: 16px;
    text-decoration:none;
    transition: all .3s
}
.local-search-result-cls ul li a:hover {
    text-decoration:underline;
}
.local-search-result-cls ul li p {
    margin-top: 10px;
    font-size: 14px;
    max-height: 124px;
    overflow: hidden
}
.local-search-result-cls ul li em.search-keyword {
    color: #e58c7c;
    font-weight:bold;
}
.local-search-plugin .local-search-input-cls {
    opacity: .6;
    width: 80%;
    transition: all .3s
}
.local-search-plugin .local-search-input-cls:hover {
    opacity: 1;
    width: 80%;
    transition: all .3s
}
.local-search-plugin .icon {
    position: relative;
    left: -30px;
    color: #999;
    cursor: pointer
}
```
# 参考资料

[为Hexo博客Yilia主题添加本地站内搜索功能](https://gaomf.cn/2016/10/10/%E4%B8%BAHexo%E5%8D%9A%E5%AE%A2Yilia%E4%B8%BB%E9%A2%98%E6%B7%BB%E5%8A%A0%E6%9C%AC%E5%9C%B0%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2%E5%8A%9F%E8%83%BD/)