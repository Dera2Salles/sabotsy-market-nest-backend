# Sabotsy Market - NestJS Backend

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)

A robust backend for the Sabotsy Market e-commerce platform, built with NestJS, following the principles of hexagonal architecture.

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the app](#running-the-app)
  - [Test](#test)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About The Project

This project serves as the backend for Sabotsy Market, an e-commerce application. It handles user authentication, product management, order processing, and more. The project is structured following the hexagonal architecture (also known as ports and adapters), which helps in creating a loosely coupled application that is easy to test and maintain.

## Built With

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Prisma](https://www.prisma.io/) - A next-generation ORM for Node.js and TypeScript.
- [Argon2](https://www.npmjs.com/package/argon2) - A password-hashing function.
- [Jest](https://jestjs.io/) - A delightful JavaScript Testing Framework with a focus on simplicity.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or later)
- [Yarn](https://yarnpkg.com/) (or npm)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Dera2Salles/sabotsy-market-nest-backend.git
   ```
2. Install packages
   ```sh
   yarn install
   ```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## API Endpoints

still in development

## Project Structure

The project follows a hexagonal architecture, which is reflected in the directory structure:

- `src/domain`: Contains the core business logic of the application, including entities, value objects, and repository interfaces.
- `src/application`: Contains the application-specific logic, such as use cases and DTOs. It orchestrates the flow of data between the domain and the infrastructure.
- `src/infrastructure`: Contains the implementation details of the application, such as database repositories, external API clients, and other framework-specific code.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/Dera2Salles/sabotsy-market-nest-backend](https://github.com/Dera2Salles/sabotsy-market-nest-backend)
