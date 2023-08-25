#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 检查 Node 版本是否为 v20.4.0
current_version=$(node -v)
if [[ $current_version == v20.4.0 ]]; then
    echo "当前node版本为 v20.4.0 无需切换"
else
    echo "切换node版本为到 v20.4.0"
    nvm use 20.4.0
fi

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
git commit -m $1

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:gaolaoge/blogs.git master:gh-pages

cd -
