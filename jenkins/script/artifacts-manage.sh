#!/bin/bash

#set -x

#创建缓存目录
if [ ! -d $artifactsDir ]
then
    mkdir $artifactsDir
fi

#打包压缩 dist 文件
tar -zcvf $artifactsDir/${GIT_COMMIT}_dist.tar.gz dist

FileNum=$(ls -l $artifactsDir | grep ^-  | wc -l)



#更新缓存库的内容
while [ $FileNum -gt $cacheCommitIDMax ]
do
    OldFile=$(ls -rt $artifactsDir/* | head -1)
    echo  "Delete File:$OldFile" 
    rm -f $OldFile
    let "FileNum--"
done

#这里可以把commitID存到之前的缓存文件
CommitIDNum=`cat $cacheCommitIDFile | wc -l`

    if [ $CommitIDNum -ge $cacheCommitIDMax ]
    then
        sed -i '1d' $cacheCommitIDFile
    fi
    echo 
    sleep 1
    echo $GIT_COMMIT >> $cacheCommitIDFile
# set +x