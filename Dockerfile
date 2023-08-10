FROM node:16

# Copy code and set working directory
COPY ./ /usr/src/ace
WORKDIR /usr/src/ace

# Install Chromium
RUN apt-get update && apt-get install -y chromium && rm -rf /var/lib/apt/lists/*

# Install app dependencies
RUN yarn install --network-timeout 100000

# for the healthcheck use ACE_HOST if defined. Otherwise use localhost
HEALTHCHECK --interval=15s --timeout=10s --start-period=5s \
            CMD http_proxy="" https_proxy="" HTTP_PROXY="" HTTPS_PROXY="" \
            curl --fail http://${ACE_HOST:-localhost}:${ACE_PORT:-8000}/jobs \
            || exit 1

# output ace version and start ace
# ACE_VERBOSITY is meant to be set to either -s or -V
CMD yarn run ace-http -v && \
    yarn run ace-http -H ${ACE_HOST:-localhost} \
                      -p ${ACE_PORT:-8000} \
                      -l ${ACE_LANG:-en} \
                      ${ACE_VERBOSITY:-}
