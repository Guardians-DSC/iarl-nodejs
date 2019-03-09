FROM node:10.15.3
COPY package.json /var/apps/iarl/package.json
WORKDIR /var/apps/iarl/
RUN npm install