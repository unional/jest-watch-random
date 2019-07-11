import { Prompt } from 'jest-watcher';
import { required } from 'unpartial';
import { RandomPrompt } from './RandomPrompt';

export interface UsageInfo {
  key: string,
  prompt: string
}

export class RandomPlugin {
  usageInfo: UsageInfo
  prompt: RandomPrompt
  threshold = 1
  constructor({ stdout, config }: {
    config: Partial<UsageInfo>,
    stdout: any
  }) {
    this.usageInfo = required({ key: 'R', prompt: 'randomly pick some test suites to run' }, config)
    this.prompt = new RandomPrompt(stdout, new Prompt())
  }

  // Add hooks to Jest lifecycle events
  apply(jestHooks) {
    jestHooks.shouldRunTestSuite(() => {
      return Math.random() <= this.threshold
    })
  }

  // Get the prompt information for interactive plugins
  getUsageInfo() {
    return this.usageInfo
  }

  onKey(key: string) {
    this.prompt.onKey(key)
  }
  // Executed when the key from `getUsageInfo` is input
  run() {
    return this.prompt.run().then(value => {
      this.threshold = value / 100
      return true
    })
  }
}
