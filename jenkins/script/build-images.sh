docker images

docker ps -a

containerId=`docker ps -a | grep -w $SERVICENAME  | awk '{print $1}'`

if [ "$containerId" !=  "" ] ; then
	docker stop $containerId
    docker rm $containerId
	echo "成功停止并删除容器 $containerId"
fi

imageId=`docker images | grep -w $SERVICENAME  | awk '{print $3}'`

if [ "$imageId" !=  "" ] ; then
	docker rmi $imageId
	echo "成功删除镜像 $imageId"
fi

docker build -t $SERVICENAME .

docker run -d -p 6060:6060 --name=$SERVICENAME --network=env-docker-compose-master_front-net $SERVICENAME

noneId=`docker images -f "dangling=true" -q`

if [ "$noneId" !=  "" ] ; then
	docker rmi --force `docker images -f "dangling=true" -q`
	echo "成功删除空镜像"
fi

docker images

docker ps -a

