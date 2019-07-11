"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_watcher_1 = require("jest-watcher");
const unpartial_1 = require("unpartial");
const RandomPrompt_1 = require("./RandomPrompt");
class RandomPlugin {
    constructor({ stdout, config }) {
        this.randomCount = 0;
        this.usageInfo = unpartial_1.required({ key: 'R', prompt: 'randomly pick some tests to run' }, config);
        this.prompt = new RandomPrompt_1.RandomPrompt(stdout, new jest_watcher_1.Prompt());
    }
    // Add hooks to Jest lifecycle events
    apply(jestHooks) {
        jestHooks.shouldRunTestSuite((...rest) => {
            return true;
        });
    }
    // Get the prompt information for interactive plugins
    getUsageInfo() {
        return this.usageInfo;
    }
    onKey(key) {
        this.prompt.onKey(key);
    }
    // Executed when the key from `getUsageInfo` is input
    run(_globalConfig, updateConfigAndRun) {
        this.updateConfigAndRun = updateConfigAndRun;
        return this.prompt.run().then(value => {
            this.randomCount = value;
            return true;
        });
    }
}
exports.RandomPlugin = RandomPlugin;
//# sourceMappingURL=RandomPlugin.js.map