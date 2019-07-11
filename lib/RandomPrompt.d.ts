export declare class RandomPrompt {
    pipe: any;
    prompt: any;
    constructor(pipe: any, prompt: any);
    onKey(key: string): void;
    run(): Promise<number>;
}
