#! /bin/bash

WWWPath='/root/www/'
ProjectName=$1
ProjectGit=$2
ProjectPath=$WWWPath$ProjectName

# 判断项目目录是否存在
# 项目不存在，先拉取项目
if [! -d $ProjectPath]
then
    echo "首次部署，先clone项目"
    cd WWWPath
    git clone $ProjectGit
fi

# 进入目录
cd $ProjectPath

# 取消修改
git checkout deploy
git clean -f

# 拉取最新代码
git pull

# 如果项目里有部署脚本，执行
deployFile=$ProjectPath/deploy.sh
if [-f "$deployFile"]
then
    echo "执行deploy.sh"
    $deployFile
fi

echo "complete!"



# cd $SITE_PATH
# git reset --hard origin/master
# git clean -f
# git pull
# git checkout master
# chown -R $USER:$USERGROUP $SITE_PATH