<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <h3 align="center">Manasub</h3>
  <p align="center">
    Internet services subscription manager
    <br />
    <a href="https://github.com/rfdez/manasub"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/rfdez/manasub">View Demo</a>
    ·
    <a href="https://github.com/rfdez/manasub/issues">Report Bug</a>
    ·
    <a href="https://github.com/rfdez/manasub/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project

Manage your internet services subscriptions with Manasub. Manasub is a web application that allows you to manage your internet services subscriptions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![TypeScript][typescript]][typescript-url]
[![Next.js][nextjs]][nextjs-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* docker
* docker compose
* node.js
* pnpm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/rfdez/manasub.git
   ```
2. Install NPM packages
   ```sh
   pnpm install
   ```
3. Start the database
   ```sh
   make start_database
   ```
4. Create `.env.local` file inside `apps/issm/` with the following content:
   ```sh
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USERNAME=manasub
    POSTGRES_PASSWORD=manasub
    POSTGRES_DATABASE=issm

    BASIC_AUTH_USERNAME=yourstrongusername
    BASIC_AUTH_PASSWORD=yourstrongpassword
   ```
5. Start the application
   ```sh
    pnpm dev
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

You can start and stop the database with the following commands:
```sh
make start_database

make stop_database
```

You can lint or fix the code with the following commands:
```sh
pnpm lint

pnpm lint:fix
```

To run the tests you have to ensure that the database is running and then run the following command:
```sh
pnpm test
```

You also can build and run the application with the following commands:
```sh
pnpm build

pnpm start
```

The application will be available at [http://localhost:3000](http://localhost:3000). At the moment, there are only three Next.js API routes available:

* An API status endpoint
* An endpoint to create a new subscription
* An endpoint to get all the subscriptions

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/rfdez/manasub.svg?style=for-the-badge
[contributors-url]: https://github.com/rfdez/manasub/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/rfdez/manasub.svg?style=for-the-badge
[forks-url]: https://github.com/rfdez/manasub/network/members
[stars-shield]: https://img.shields.io/github/stars/rfdez/manasub.svg?style=for-the-badge
[stars-url]: https://github.com/rfdez/manasub/stargazers
[issues-shield]: https://img.shields.io/github/issues/rfdez/manasub.svg?style=for-the-badge
[issues-url]: https://github.com/rfdez/manasub/issues
[license-shield]: https://img.shields.io/github/license/rfdez/manasub.svg?style=for-the-badge
[license-url]: https://github.com/rfdez/manasub/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/raul-fernandez-fernandez
[typescript]: https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white
[nextjs]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[nextjs-url]: https://nextjs.org/
