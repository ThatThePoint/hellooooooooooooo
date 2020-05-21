#!/bin/sh
# chmod 777 git.sh
# npm run commit "注释" 分支名
echo "Start to git"
# 执行git命令
git status
git add --all
echo '下面是分支名您要提交的注释说明'
echo $1
echo '下面是分支名您要提交的分支名称'
echo $2
echo '您正在commit'
git commit -m$1
echo '您正在pull............'
git pull origin $2
echo '您正在push..........'
git push origin $2
echo "end................";