#!/bin/bash

echo '0-build prepare'
isResetID=false                                      #回滚标志判断
cmpFlag=1                                            #package.json文件的对比标志
packageJsonChange=false                              #package.json文件变化标志

commitEmail='git config'
set -x
#先设置淘宝源加快安装速度，这里我们慢点要替换成我们自己搭建的源
#npm config set registry https://registry.npm.taobao.org
#npm config set strict-ssl false
# npm config set registry "http://npm.wild-fox.cn"
npm config set registry https://registry.npm.taobao.org
# npm config set registry http://124.223.39.149:4873/

# npm config list
#判断缓存目录存在与否
if [ ! -d $cacheDir ]
    then
        echo "no cache dir"
        mkdir $cacheDir
        cp package.json "$cacheDir/"
        touch $cacheCommitIDFile
        # echo  $GIT_COMMIT > $cacheCommitIDFile #先不用写入
        echo  "npm 安装"
        npm i || npm i || exit 1
#判断缓存文件存在与否
elif [ ! -f $cachePackage ] || [ ! -f $cacheCommitIDFile ]
    then
        if [ ! -f $cachePackage ]
        then
            echo "cache file package.json does no exist"
            echo "cp package.json to cache dir"
            cp package.json "$cacheDir/"
        fi

        if [ ! -f $cacheCommitIDFile ]
        then
            echo "cache file commitIdCache.txt does no exist"
            echo "create commitIdCache.txt to cache dir"
            echo "write the ID to commitIdCache.txt"
            touch $cacheCommitIDFile
        echo  $GIT_COMMIT > $cacheCommitIDFile
        fi

        rm -rf node_modules
        sleep 1
        echo  "npm 安装"
       npm i || npm i || exit 1

else
    echo "cache file exists"

    #这里我们判断一下新提交的commitID是不是有存在于缓存
    for commitId in `cat "$cacheCommitIDFile"`
    do
        if [ $commitId = $GIT_COMMIT ]
        then
            isResetID=true
        fi
    done

    #对比新旧的package.json，看是否有变化
    cmp -s package.json $cachePackage
    cmpFlag=$?
    #compare package.json
    if [ $cmpFlag != 0 ]
    then
        packageJsonChange=true
    fi

    #如果是重复的ID
    if [ $isResetID = true ]
    then
        echo "reset啦啦啦啦"
        #我们还是需要重置一下新的package
        cp -f package.json "$cacheDir/"
        #这里我们要一个创建代表回滚标志的文件,提供给pipeline判断以供跳过不必要的步骤执行，提高执行的速度
        touch ${resetFlagFile}
    # ID不是重复的,而且package.json有更新
    elif [ $packageJsonChange = true ]
    then
        echo "package 更新"
        cp -f package.json "$cacheDir/"
        rm -rf node_modules
        sleep 1
        npm i || npm i || exit 1
    else
        echo "啥都不用干哈哈"
    fi

fi
set +x
