IARL
===

[![Build Status](https://travis-ci.com/Guardians-DSC/iarl-nodejs.svg?branch=master)](https://travis-ci.com/Guardians-DSC/iarl-nodejs)
[![codebeat badge](https://codebeat.co/badges/976cc512-6101-4190-9dfe-2217bc8379f8)](https://codebeat.co/projects/github-com-guardians-dsc-iarl-nodejs-master)
[![GitHub issues](https://img.shields.io/github/issues/Guardians-DSC/iarl.svg)](https://github.com/Guardians-DSC/iarl/issues)
[![GitHub forks](https://img.shields.io/github/forks/Guardians-DSC/iarl.svg)](https://github.com/Guardians-DSC/iarl/network)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Guardians-DSC/iarl/master/LICENSE)

### Descrição
Tem-se como descrição o que se segue:

> A **I**nterface de **A**cesso **R**emoto a **L**aboratórios é uma aplicação web que fornece uma interface amigável, de uso fácil e simplificado, de acesso a arquivos e diretórios para os usuários dos LCC (Laboratório de Ciência da Computação).

### Technologies
* [NodeJS 8.11.2](https://nodejs.org/en/)

### Deploy

Para subir uma instância do IARL, basta possuir Docker e docker-compose instalados e executar o comando `docker-compose up -d`

### Usage
First install the dependencies:
> npm install  

and run:
> IARL_JWT_PRIVATE_KEY=yoursecretkey npm start  

Obs: The login can only be done on the **UFCG network**, to simulate the login, run the API as a developer: 
> npm run dev

Lints and fixes files
> npm run lint