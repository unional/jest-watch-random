module.exports = {
  "preset": "ts-jest",
  "globals": {
    "ts-jest": {
      "diagnostics": false
    }
  },
  "reporters": [
    "default",
    ["jest-audio-reporter", { volume: 0.5 }]
  ],
  "roots": [
    "<rootDir>/src"
  ],
  "testEnvironment": "node",
  "watchPlugins": [
    [
      "<rootDir>/lib/index.js"
    ],
    "jest-watch-suspend",
    [
      "jest-watch-toggle-config",
      {
        "setting": "verbose"
      }
    ],
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
    [
      "jest-watch-toggle-config",
      {
        "setting": "collectCoverage"
      }
    ]
  ]
}
