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

# Apple Container / Docker:
#set -xv ; container --version ; container system stop ; container system start ; container system status ; container stop test-container ; container rm --force test-container ; container prune ; container list --all ; container run --cpus 4 --memory 2g --platform linux/arm64 --name test-container --volume ${PWD}:/MOUNT -w /MOUNT node:24-slim sh -c 'set -xv ; export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true ; export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium ; arch ; uname ; ldd --version ; apt-get update -y ; apt-get upgrade -y ; apt-get update -y ; apt-get install libnotify4 libdrm2 libgbm1 libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 -yq --no-install-suggests --no-install-recommends ; apt-get update -y ; apt-get install -y chromium --no-install-recommends ; apt-get clean ; rm -rf /var/lib/apt/lists/* /var/cache/apt/* ; ls -als /usr/bin/chrom* ; apt-get update -y ; apt-get install xauth dbus xvfb -yq --no-install-suggests --no-install-recommends ; apt-get clean ; rm -rf /var/lib/apt/lists/* /var/cache/apt/* ; dbus-uuidgen > /var/lib/dbus/machine-id ; mkdir -p /var/run/dbus ; chmod 777 /var/run/dbus ; npm --version ; node --version ; yarn --version ; cd /MOUNT ; . ./scripts/yarn-install.sh ; xvfb-run --auto-servernum yarn run test-cli ; xvfb-run --auto-servernum yarn run test ; dbus-run-session -- bash -c "export DBUS_SYSTEM_BUS_ADDRESS=\$DBUS_SESSION_BUS_ADDRESS; xvfb-run --auto-servernum yarn run test-electron-cli" ; dbus-run-session -- bash -c "export DBUS_SYSTEM_BUS_ADDRESS=\$DBUS_SESSION_BUS_ADDRESS; xvfb-run --auto-servernum yarn run test-electron"' ; container list --all ; container stop test-container ; container rm --force test-container ; container prune ; container system status ; container system stop ; set +xv

#set -xv ; container --version ; container system stop ; container system start ; container system status ; container stop test-container ; container rm --force test-container ; container prune ; container list --all ; container run --cpus 4 --memory 2g --platform linux/arm64 --name test-container --volume ${PWD}:/MOUNT -w /MOUNT node:24-slim sh -c 'set -xv ; export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true ; export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium ; arch ; uname ; ldd --version ; apt-get update -y ; apt-get upgrade -y ; apt-get update -y ; apt-get install libnotify4 libdrm2 libgbm1 libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 -yq --no-install-suggests --no-install-recommends ; apt-get update -y ; apt-get install -y chromium --no-install-recommends ; apt-get clean ; rm -rf /var/lib/apt/lists/* /var/cache/apt/* ; ls -als /usr/bin/chrom* ; apt-get update -y ; apt-get install xauth dbus xvfb -yq --no-install-suggests --no-install-recommends ; apt-get clean ; rm -rf /var/lib/apt/lists/* /var/cache/apt/* ; dbus-uuidgen > /var/lib/dbus/machine-id ; mkdir -p /var/run/dbus ; chmod 777 /var/run/dbus ; npm --version ; node --version ; yarn --version ; cd /MOUNT ; . ./scripts/yarn-install.sh ; dbus-run-session -- bash -c "export DBUS_SYSTEM_BUS_ADDRESS=\$DBUS_SESSION_BUS_ADDRESS; export ELECTRON_ARGS=\"--disable-gpu --no-sandbox\" ; xvfb-run --auto-servernum ./scripts/compareAxeRunners_VERBOSE.sh book.epub"' ; container list --all ; container stop test-container ; container rm --force test-container ; container prune ; container system status ; container system stop ; set +xv

#set -xv ; container --version ; container system stop ; container system start ; container system status ; container stop test-container ; container rm --force test-container ; container prune ; container list --all ; container run --cpus 4 --memory 2g --platform linux/arm64 --name test-container --volume ${PWD}:/MOUNT -w /MOUNT node:24-slim sh -c 'set -xv ; arch ; uname ; ldd --version ; npm --version ; node --version ; yarn --version ; cd /MOUNT ; . ./scripts/yarn-install.sh ; ELECTRON_ARGS="--disable-gpu --no-sandbox" ./scripts/compareAxeRunners_VERBOSE.sh book.epub' ; container list --all ; container stop test-container ; container rm --force test-container ; container prune ; container system status ; container system stop ; set +xv
