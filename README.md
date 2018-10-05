# npm-package

Retrieves the dependencies of an NPM package

## Installation

``yarn install``

## Usage

- Basic usage

``node index.js react``

- Version at a specific date

``node index.js react --date 2016-01-01``

``node index.js react -d 2016-01-01``

- With a specific version

``node index.js react --version 15.4.1``

``node index.js react -v 15.4.1``

- With a JSON output

``node index.js react --output json``

``node index.js react -o json``