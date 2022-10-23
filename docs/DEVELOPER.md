# Building and Testing Angular

This document describes how to set up your development environment to build and test this project.
It also explains the basic mechanics of using `git` and `node``.

* [Prerequisite Software](#prerequisite-software)
* [Getting the Sources](#getting-the-sources)
* [Installing NPM Modules](#installing-npm-modules)
* [Serving](#serving)
* [Building](#building)
* [Running Tests Locally](#running-tests-locally)
* [Formatting your Source Code](#formatting-your-source-code)
* [Linting/verifying your Source Code](#lintingverifying-your-source-code)


See the [contribution guidelines](https://github.com/geromegrignon/issue-forms-creator/blob/main/CONTRIBUTING.md)
if you'd like to contribute to this project.

## Prerequisite Software

Before you can build and test this project, you must install and configure the
following products on your development machine:

* [Git](https://git-scm.com/) and/or the [**GitHub app**](https://desktop.github.com/) (for Mac and Windows);
  [GitHub's Guide to Installing Git](https://help.github.com/articles/set-up-git) is a good source of information.

* [Node.js](https://nodejs.org), (version specified in the engines field of [`package.json`](../package.json)) which is used to run a development web server,
  run tests, and generate distributable files.
  
## Getting the Sources

Fork and clone the repository:

1. Login to your GitHub account or create one by following the instructions given
   [here](https://github.com/signup/free).
2. [Fork](https://help.github.com/forking) the [repository](https://github.com/geromegrignon/issue-forms-creator).
3. Clone your fork of the repository and define an `upstream` remote pointing back to
   the Angular repository that you forked in the first place.

```shell
# Clone your GitHub repository:
git clone git@github.com:<github username>/issue-forms-creator.git

# Go to the directory:
cd issue-forms-creator

# Add the main repository as an upstream remote to your repository:
git remote add upstream https://github.com/geromegrignon/issue-forms-creator.git
```

## Installing NPM Modules

Next, install the JavaScript modules needed to build and test the project:

```shell
# Install project dependencies (package.json)
npm install
```

## Serving

To run Issue Forms Creator locally:

```shell
ng serve
```

## Building

To build Issue Forms Creator run:

```shell
ng build
```

## Running Tests Locally

To run unit testing with Jest:

```shell
ng test
```

To run component testing with Cypress:

```shell
# headless version
npm run ct:riun

# GUI version
npm run ct:open
```


## Formatting your source code

Angular uses [prettier](https://prettier.io/) to format the source code.
If the source code is not properly formatted, the CI will fail and the PR cannot be merged.

The project uses lint-staged to automatically format the source code.

## Linting/verifying your Source Code

You can check that your code is properly formatted and adheres to coding style by running:

``` shell
ng lint
```
