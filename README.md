# Fairbundled - Project for sustainable procurement in municipalities

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/lschlesinger/fairbundled">
    <img src="frontend/src/logo.jpg" alt="Logo" width="420">
  </a>



  <p align="center">
    This is a Web Application Engineering Project at TUM University, Munich
    <br />
    <a href="...">View Demo</a>
  </p>

</p>


<!-- TABLE OF CONTENTS -->

## Table of Contents

* [About the Project](#about-the-project)

  * [Description](#description)
  * [Built With](#built-with)

* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)

* [License](#license)

  

<!-- ABOUT THE PROJECT -->

## About the Project

### Description

**Fairbundled** is an online marketplace to enable municipalities to acquire sustainable and certified supplies by gathering offered sustainable products and bundling the demands of multiple buyers to achieve more affordable prices.

We are motivated to promote *sustainable* procurement in German municipalities!

Reported pains occurring during procurement processes in city administration are (i) high costs for sustainable products that do not match the budget and/or are difficult to justify, (ii) analogue, decentralized and bureaucratic overhead of product comparison, selection and ordering, and (iii) ambiguity with respect to certification integrity and relevance.

These are addressed by the following main features of **Fairbundled**:

- **Order Bundling**: Enabling customers to collectively submit an order, leads to larger order volumes which provide plannability and scaling effect on the supplier side, resulting in lower product prices.
- **Online Marketplace**: Fairbundled serves the one shop stop for online sustainable procurement irrespective of certain supplier products brands or product groups. Products are filterable and can be compared in a convenient, easy-to-access user interface.
- **Certification Transparency**: Fairbundled verifies integrity of relevant certifications with respect to sustainability aspects and displays is transparently in the user interface.

So don't hesitate:

Check out the [fairbundled.de]()


### Built With

* [NodeJs](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [MongoDB](https://www.mongodb.com/de)
* [Heroku](https://www.heroku.com/)
* [Docker](https://www.docker.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm

```sh
npm install npm@latest -g
```

* [docker](https://docs.docker.com/docker-for-mac/install/)


### Installation

1. Clone the repo

```sh
git clone git@github.com:lschlesinger/fairbundled.git
```

2. Install NPM packages

```sh
cd frontend
npm install
```

### Run

1. Start database, e.g. with docker

```sh
docker-compose -f docker-compose.dev.yml up
```

2. Start backend (can also be done from IDE), will run on port `5000`

```sh
npm start
```

3. Start frontend (with proxy to backend), will run on port `4200`

```sh
cd frontend
npm start
```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.