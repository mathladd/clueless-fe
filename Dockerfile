##  SET MODE "standalone"
##  More infor: "https://nextjs.org/docs/advanced-features/output-file-tracing"

# Base
FROM node:18.12.0-alpine AS BASE
RUN apk update && apk add --no-cache libc6-compat && apk add git openssh

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

USER node

RUN ls -lRa /home/node
RUN mkdir -p /home/node/.ssh/
RUN ssh-keygen -b 2048 -t rsa -q -N "" -f /home/node/.ssh/id_rsa

COPY --chown=node:node package.json yarn.lock ./
RUN yarn --frozen-lockfile

# Build
FROM node:18.12.0-alpine AS BUILD

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node --from=BASE /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN yarn build


# Production
FROM node:18.12.0-alpine AS PRODUCTION

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node --from=BUILD /usr/src/app/public ./public

# Set mode "standalone" in file "next.config.js"
COPY --chown=node:node --from=BUILD /usr/src/app/.next/standalone ./
COPY --chown=node:node --from=BUILD /usr/src/app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
