#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run issue
echo "build success"

# 追加dns预解析
node dns-prefetch.js
echo "dns-prefetch success"

# 进入生成的文件夹
cd example/dist

# 如果是发布到自定义域名
echo 'gaolaogui.cc' >CNAME
echo "cname success"

git init
git add .
git commit -m "Building new service branch"

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:gaolaoge/blogs.git master:gh-pages
echo "gh-pages push success"