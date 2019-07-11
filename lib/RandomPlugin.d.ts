import { RandomPrompt } from './RandomPrompt';
export interface UsageInfo {
    key: string;
    prompt: string;
}
export declare class RandomPlugin {
    usageInfo: UsageInfo;
    prompt: RandomPrompt;
    randomCount: number;
    updateConfigAndRun: any;
    constructor({ stdout, config }: {
        config: Partial<UsageInfo>;
        stdout: any;
    });
    apply(jestHooks: any): void;
    getUsageInfo(): UsageInfo;
    onKey(key: string): void;
    run(_globalConfig: any, updateConfigAndRun: any): Promise<boolean>;
}
