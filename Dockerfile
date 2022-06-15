FROM node:14 as build

COPY ./ /src

WORKDIR /src

ARG NPM_USER
ARG NPM_PASS
ARG ARTIFACTORY_NPM
ARG NPM_REGISTRY_NAME

RUN curl -s -u${NPM_USER}:${NPM_PASS} ${ARTIFACTORY_NPM}/auth -o ~/.npmrc

RUN npm install --registry ${ARTIFACTORY_NPM}/${NPM_REGISTRY_NAME}

COPY npm-unit-test.sh /src

RUN chmod +x /src/npm-unit-test.sh

RUN ./npm-unit-test.sh ${NPM_USER} ${NPM_PASS} ${ARTIFACT_REGISTRY} ${IMAGE} ${IMAGE_BRANCH_NAME}

RUN npm run build

FROM node:14 as package

ARG NPM_USER
ARG NPM_PASS
ARG ARTIFACTORY_NPM
ARG NPM_REGISTRY_NAME



COPY --from=build /src/package.json /app/package.json
COPY --from=build /src/package-lock.json /app/package-lock.json
COPY --from=build /src/dist /app/dist

WORKDIR /app

RUN curl -s -u${NPM_USER}:${NPM_PASS} ${ARTIFACTORY_NPM}/auth -o ~/.npmrc
RUN npm install --production --registry ${ARTIFACTORY_NPM}/${NPM_REGISTRY_NAME} && rm ~/.npmrc

RUN npm install -g pkg@4.5.1
RUN pkg --config package.json -t node14-alpine-x64 -o /build/app dist/src/server.js

FROM alpine:3.12

#Add required packages to run pkg app + curl for potential debugging
RUN apk update && \
  apk add --no-cache libstdc++ libgcc openssl ca-certificates curl && \
  rm -rf /var/cache/apk/*

COPY --from=package /build /app
COPY ./config.prod.json /config/config.json

WORKDIR /app
ENV CONFIG_PATH "/config/config.json"

CMD ./app
