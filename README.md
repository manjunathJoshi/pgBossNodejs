# PGBoss example

[[![Node JS](https://img.shields.io/badge/Node.js-16.5.0-green.svg?logo=Node.Js)](https://nodejs.org/)]

### Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Docker Support](#docker-support)
- [Project Structure](#project-structure)

### Description

This **Node JS Typescript ** backend service is an example to implement pgBoss

- **PGBoss** - is a job queue library for Node.js applications that uses PostgreSQL as its storage engine for persistence. It is very simple and straightforward to use, and it has a lot of features that make it a great choice when you need to add background jobs and specifically jobs that you want to run on a schedule or at a specific time.

### Installation

Clone the repository and install the dependencies:

```bash
$ git clone https://github.com/manjunathJoshi/pgBossNodejs.git
$ cd pgBossNodejs
$ npm install
```

### Running the App
    ```bash
    $ npm run start
    ```


### Docker

This project uses docker compose to spinup the docker container to use locally.

```bash
$ docker compose up -d

```

### Project Structure

```
├──src/
├    ├── app.ts                       # start file
├    ├── pgBossConsumer.ts            # file to start consumer
├    ├── pgBossService.ts             # file to initialize pgBoss
├    └── router.ts                    # router file for all the routes.
├    └── userService.ts               # router functions.
├──docker-compose.yml

```

### Contributing

1. Create a feature branch from the main branch
2. Submit a PR for review
