# generator-polymer-init-d2l-polymer-2-element
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][dependencies-image]][dependencies-url]

Template for creating BrightspaceUI Polymer 2 class-based elements.

> Looking for our Polymer `1.x`/`2.x` hybrid element generator? [It's over here](https://github.com/Brightspace/generator-polymer-init-d2l-hybrid-element).

With the template, you get:
* Project boilerplate including: `.editorconfig`, `.gitignore`, `bower.json`, `package.json`, `polymer.json`, `CODEOWNERS` and `LICENSE` (Apache-2.0)
* A basic Polymer 2 class-based element scaffold
* Demo page for the element
* Test page for the element
* Travis CI ready-to-go
* Local tests that do linting using ESLint, `polymer lint` and unit tests using Chrome headless
* Cross-browser testing from Travis CI using Sauce Labs
* README

## Setup

Assuming you have Node.js already, install `polymer-cli`, [Bower](https://bower.io/) and the element generator globally:

```shell
npm install -g polymer-cli
npm install -g generator-polymer-init-d2l-polymer-2-element
```

In an empty project directory, run the CLI's `init` command:

```shell
mkdir my-element
cd my-element
polymer init
```

Choose `d2l-polymer-2-element` from the list and follow the prompts.

Alternately, you can jump right into the wizard:

```shell
polymer init d2l-polymer-2-element
```

That's it! Follow the instructions in the `README` to learn how to get a local development server running and run the tests.

### Sauce Labs

To do cross-browser testing using Sauce Labs, the API key needs to be encrypted into the `.travis.yml` file.

To learn more about how to set this up, see the [Testing](https://github.com/BrightspaceUI/guide/wiki/Testing) section of The Guide.

## Developing and Contributing

Pull requests welcome!

After cloning the repo, install dependencies: `npm install`.

To run unit tests: `npm test`

### Running the generator locally

To avoid having to publish to NPM just to test out your local changes, you can run a local copy.

First, from the root of the `generator-polymer-init-d2l-polymer-2-element`, run: `npm link`

That's pretty much it. Now create a new empty project to try it out and run `polymer init`. Choosing the generator from the list should run your local code.

### Publishing to NPM

Publishing happens automatically from Travis CI whenever there's a tagged commit. The easiest way to kick that off is through GitHub's "Releases" tab.

Just make sure you've incremented the `version` in `package.json`.

[npm-url]: https://npmjs.org/package/generator-polymer-init-d2l-polymer-2-element
[npm-image]: https://img.shields.io/npm/v/generator-polymer-init-d2l-polymer-2-element.svg
[ci-image]: https://travis-ci.org/Brightspace/generator-polymer-init-d2l-polymer-2-element.svg?branch=master
[ci-url]: https://travis-ci.org/Brightspace/generator-polymer-init-d2l-polymer-2-element
[dependencies-url]: https://david-dm.org/brightspace/generator-polymer-init-d2l-polymer-2-element
[dependencies-image]: https://img.shields.io/david/Brightspace/generator-polymer-init-d2l-polymer-2-element.svg
