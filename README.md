# jest-watch-random

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][circleci-image]][circleci-url]
[![Codecov][codecov-image]][codecov-url]

[![Greenkeeper badge][green-keeper-image]][green-keeper-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

Randomly run some of the test suites (each test file is a test suite in jest).

Requires `jest@23+`.

## Rationale

What? How dare you only running part of the tests?

Well yeah, in normal circumstances, you should run all of your tests all the time.
But in practice, when you have a huge suite of tests, it is not practical to do that.

In one of my cases, I have 80k acceptance tests which takes 2 hours to run.
In most cases, I use a combination of filtering and `test.skip()/test.only()` to focus on the tests that matter.

But from time to time you want to run other tests to make sure you are not breaking anything.

This plugin allows you to do a random spot check to make sure things are working fine.

Of course, you should run a full test at the end of a cycle (end of day / end of sprint / end of release).

## Usage

To use `jest-watch-random`,
add it to the `watchPlugins` section of the Jest configuration:

```js
{
  "jest": {
    "watchPlugins": [
      "jest-watch-random", // or
      ["jest-watch-random", { "key": "R", "prompt": "randomly pick some test suites to run" }]
    ]
  }
}
```

In watch mode, press `R` to invoke a prompt and enter the percentage of tests you want to run:

```
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press R to randomly pick some test suites to run.
 › Press Enter to trigger a test run.
```

```
Random mode usage
 › Press Esc to exit random mode.
 › Press Enter to randomly run n% of the test suites
 random › 10 %
```

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
