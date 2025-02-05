#!/bin/sh

docker version

docker info

docker build --progress=plain -f ./Dockerfile -t ace-docker-image .

#docker image ls

#docker ps -a

(docker stop ace-docker-container || echo ok_stop) && echo _ok_stop

#(docker kill ace-docker-container || echo ok_kill) && echo _ok_kill

(docker rm --force ace-docker-container || echo ok_rm) && echo _ok_rm

docker run --init --name ace-docker-container ace-docker-image

(docker stop ace-docker-container || echo ok_stop) && echo _ok_stop
docker logs -f ace-docker-container
docker logs ace-docker-container

# docker exec -it ace-docker-container /bin/sh

#(docker stop ace-docker-container || echo ok_stop2) && echo _ok_stop2

#(docker kill ace-docker-container || echo ok_kill2) && echo _ok_kill2

#(docker rm --force ace-docker-container || echo ok_rm2) && echo _ok_rm2
