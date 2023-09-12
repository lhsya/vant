export declare class VanGenerator {
    outputDir: string;
    inputs: {
        name: string;
        cssLang: string;
        vueVersion: string;
        preprocessor: string;
    };
    constructor(name: string);
    run(): Promise<void>;
    prompting(): Promise<void>;
    writing(): void;
    copyTpl(from: string, to: string, args: Record<string, any>): void;
    end(): void;
}
