
# Jammy Jellyfish
# GLIBC 2.32
# FROM ubuntu:22.04

# Focal Fossa
# GLIBC 2.31
# FROM ubuntu:20.04

# Bionic Beaver
# GLIBC 2.27
# FROM ubuntu:18.04

# Disco Dingo
# GLIBC 2.28
# FROM ubuntu:19.04

# Debian Buster
# GLIBC 2.28
# FROM node:20-buster
FROM node:20-slim

#ENTRYPOINT ["kill", "-s", "SIGKILL", "1"]

USER root

# ARG DEBIAN_FRONTEND=noninteractive
# ENV DEBIAN_FRONTEND=noninteractive

#lsb_release -a
RUN arch &&\
    uname &&\
    ldd --version &&\
    apt-get update -y &&\
    apt-get upgrade -y

RUN apt-get update -y &&\
    apt-get install libnotify4 libdrm2 libgbm1 libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 -yq --no-install-suggests --no-install-recommends &&\
    apt-get clean &&\
    rm -rf /var/lib/apt/lists/* /var/cache/apt/*

RUN node --version &&\
    npm --version

# groupadd -r notroot
# useradd -r -g notroot -G audio,video notroot
RUN groupadd -g 1100 notroot &&\
    useradd -g notroot -m -u 1100 notroot -s /bin/sh -d /ACE &&\
    usermod -a -G audio,video notroot

USER notroot

WORKDIR /ACE

RUN rm -rf /ACE/* &&\
    ls -alsR /ACE

USER root

COPY ./book.epub /ACE/
#ADD ./files /ACE/files

RUN chown -R notroot:notroot /ACE/ &&\
    ls -als /ACE

USER notroot

RUN cd /ACE/ &&\
    npm init -y &&\
    npm i @daisy/ace

RUN cd /ACE/ &&\
    ls -als . &&\
    ls -als ./node_modules/

RUN cd /ACE/ &&\
    ./node_modules/electron/dist/electron --no-sandbox --version &&\
    ./node_modules/electron/dist/electron --no-sandbox --abi &&\
    ./node_modules/.bin/ace-electron --no-sandbox --headless --help &&\
    ./node_modules/.bin/ace-puppeteer --help &&\
    ./node_modules/.bin/ace-puppeteer -V -f -o /ACE -t /ACE --subdir book.epub &&\
    ls -als . &&\
    ls -als /tmp &&\
    ls -als ".config/DAISY Ace" &&\
    ls -als ".local/state/DAISY Ace" &&\
    cat .local/state/DAISY\ Ace/*.log

USER root

RUN apt-get update -y &&\
    apt-get install xauth xvfb -yq --no-install-suggests --no-install-recommends &&\
    apt-get clean &&\
    rm -rf /var/lib/apt/lists/* /var/cache/apt/*

USER notroot

#ENV DISPLAY :99.0

RUN cd /ACE/ &&\
# export DBUS_SYSTEM_BUS_ADDRESS='unix:path=/var/run/dbus/system_bus_socket'
# export DBUS_SESSION_BUS_ADDRESS='unix:path=/var/run/dbus/system_bus_socket'
#    export DISPLAY=:99.0 &&\
#    echo $DISPLAY &&\
#    (Xvfb :99 -ac -screen 0 1024x768x16 &> /ACE/xvfb.log &) &&\
    xvfb-run ./node_modules/.bin/ace-electron --no-sandbox --disable-gpu -V -f -o /ACE -t /ACE --subdir book.epub &&\
# --disable-setuid-sandbox
    ls -als . &&\
    ls -als /tmp &&\
    ls -als ".config/DAISY Ace" &&\
    ls -als ".local/state/DAISY Ace" &&\
    cat .local/state/DAISY\ Ace/*.log
