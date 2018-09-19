FROM node:8.11.2
COPY package.json /var/apps/iarl/package.json
WORKDIR /var/apps/iarl/
RUN npm install