# jest-watch-random

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][circleci-image]][circleci-url]
[![Codecov][codecov-image]][codecov-url]

[![Greenkeeper badge][green-keeper-image]][green-keeper-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

Loop tests n times.

Requires `jest@23+`.

## Usage

To use `jest-watch-random`,
add it to the `watchPlugins` section of the Jest configuration:

```js
{
  "jest": {
    "watchPlugins": [
      "jest-watch-random", // or
      ["jest-watch-random", { "key": "r", "prompt": "repeat test runs." }]
    ]
  }
}
```

In watch mode, press `r` to invoke a prompt and enter number of times you want the tests to be repeated:

```sh
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press r to repeat test runs.
 › Press Enter to trigger a test run.
```

```sh
Repeat Mode Usage
 › Press Esc to exit repeat mode.
 › Press Enter to repeat test run n times.
 repeat › 3
```

You can only enter numbers.

[npm-image]: https://img.shields.io/npm/v/jest-watch-random.svg?style=flat
[npm-url]: https://npmjs.org/package/jest-watch-random
[downloads-image]: https://img.shields.io/npm/dm/jest-watch-random.svg?style=flat
[downloads-url]: https://npmjs.org/package/jest-watch-random
[circleci-image]: https://circleci.com/gh/unional/jest-watch-random/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/jest-watch-random/tree/master
[codecov-image]: https://codecov.io/gh/unional/jest-watch-random/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/jest-watch-random
[green-keeper-image]:
https://badges.greenkeeper.io/unional/jest-watch-random.svg
[green-keeper-url]:https://greenkeeper.io/
[semantic-release-image]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
