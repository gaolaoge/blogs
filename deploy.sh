#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add .
git commit -m $1
git push

# 生成静态文件
npm run build:example

# 进入生成的文件夹
cd example/dist

# 如果是发布到自定义域名
echo 'gaolaogui.cc' >CNAME

git init
git add .
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:gaolaoge/blogs.git master:gh-pages

cd -
