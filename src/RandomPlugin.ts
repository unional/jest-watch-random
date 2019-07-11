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
  percentage = 100
  constructor({ stdout, config }: {
    config: Partial<UsageInfo>,
    stdout: any
  }) {
    this.usageInfo = required({ key: 'R', prompt: 'randomly pick some tests to run' }, config)
    this.prompt = new RandomPrompt(stdout, new Prompt())
  }

  // Add hooks to Jest lifecycle events
  apply(jestHooks) {
    jestHooks.shouldRunTestSuite(() => {
      return Math.random() * 100 < this.percentage
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
      this.percentage = value
      return true
    })
  }
}
