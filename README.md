IARL
===

[![Build Status](https://travis-ci.com/Guardians-DSC/iarl-nodejs.svg?branch=master)](https://travis-ci.com/Guardians-DSC/iarl-nodejs)
[![codebeat badge](https://codebeat.co/badges/976cc512-6101-4190-9dfe-2217bc8379f8)](https://codebeat.co/projects/github-com-guardians-dsc-iarl-nodejs-master)
[![GitHub issues](https://img.shields.io/github/issues/Guardians-DSC/iarl.svg)](https://github.com/Guardians-DSC/iarl/issues)
[![GitHub forks](https://img.shields.io/github/forks/Guardians-DSC/iarl.svg)](https://github.com/Guardians-DSC/iarl/network)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Guardians-DSC/iarl/master/LICENSE)

## Descrição
Tem-se como descrição o que se segue:

> A **I**nterface de **A**cesso **R**emoto a **L**aboratórios é uma aplicação web que fornece uma interface amigável, de uso fácil e simplificado, de acesso a arquivos e diretórios para os usuários dos LCCs (Laboratórios de Ciência da Computação).

## Documentação
[Link para a documentação](https://guardians-dsc.github.io/iarl-nodejs/)

## Tecnologias
* [NodeJS 10.15.3](https://nodejs.org/en/)

## Deploy
Primeiro instale as dependências:
> npm install  

Em seguida rode o comando:
> PORT=3000 IARL_JWT_PRIVATE_KEY=yoursecretkey BASE_DIR=/home npm start

* PORT: A porta em que rodará a API (padrão: 3000)
* IARL_JWT_PRIVATE_KEY: Chave secreta do token
* BASE_DIR: Diretório que contém as pastas dos usuários

## Desenvolvimento

O login só pode ser realizado na **rede da UFCG**, para simular o login localmente, rode a API como desenvolvedor: 
> npm run dev

Caso não tenha o nodemon instalado, rode o seguinte comando:
> npm install -g nodemon

### Docker

Para subir uma instância do IARL, basta possuir Docker e docker-compose instalados e executar o comando `docker-compose up -d`