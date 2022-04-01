#!/bin/bash

# set -x
#如果是回滚的操作，我们不用再把构建上传一次啦，服务器已经有啦
if [ ! -f $resetFlagFile ]
then
    # 将本次构建的压缩包上传到资源服务器的指定目录
    scp ${artifactsDir}/${GIT_COMMIT}_dist.tar.gz ${sshHostName}:/data/Foss-Sky/${BRANCH_NAME}/ || exit 1
fi
# 远程执行服务器上面的脚本解压缩发布
ssh ${sshHostName} /data/Foss-Sky/deploy.sh ${BRANCH_NAME}  ${GIT_COMMIT} || exit 1
# set +x
