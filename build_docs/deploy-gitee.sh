#!/usr/bin/env sh

set -e

npm run build

cd ../docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://gitee.com/chend0316/chend0316.git master

cd -