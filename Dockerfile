FROM node:8

WORKDIR /iarl-nodejs

COPY . /iarl-nodejs

EXPOSE 8080

RUN \
    sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \    
    apt-get update -y && \    
    apt-get upgrade -y && \
    apt-get install -y apt-transport-https apt-utils ca-certificates \
    software-properties-common curl htop man unzip vim nano wget \ 
    net-tools iputils-ping && \
    apt-get update    

ARG BASE_DIR
ARG IARL_JWT_PRIVATE_KEY

CMD ["sh","-c","npm install && BASE_DIR=${BASE_DIR} IARL_JWT_PRIVATE_KEY=${IARL_JWT_PRIVATE_KEY} npm start"]
