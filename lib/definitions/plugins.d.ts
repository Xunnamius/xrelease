declare namespace _default {
    namespace verifyConditions {
        let required: boolean;
        let dryRun: boolean;
        function pipelineConfig(): {
            settleAll: boolean;
        };
    }
    namespace analyzeCommits {
        let _default: string[];
        export { _default as default };
        let required_1: boolean;
        export { required_1 as required };
        let dryRun_1: boolean;
        export { dryRun_1 as dryRun };
        export function outputValidator(output: any): boolean;
        export function preprocess({ commits, ...inputs }: {
            [x: string]: any;
            commits: any;
        }): {
            commits: any;
        };
        export function postprocess(results: any): string;
    }
    namespace verifyRelease {
        let required_2: boolean;
        export { required_2 as required };
        let dryRun_2: boolean;
        export { dryRun_2 as dryRun };
        export function pipelineConfig_1(): {
            settleAll: boolean;
        };
        export { pipelineConfig_1 as pipelineConfig };
    }
    namespace generateNotes {
        let required_3: boolean;
        export { required_3 as required };
        let dryRun_3: boolean;
        export { dryRun_3 as dryRun };
        export function outputValidator_1(output: any): any;
        export { outputValidator_1 as outputValidator };
        export function pipelineConfig_2(): {
            getNextInput: ({ nextRelease, ...context }: {
                [x: string]: any;
                nextRelease: any;
            }, notes: any) => {
                nextRelease: any;
            };
        };
        export { pipelineConfig_2 as pipelineConfig };
        export function postprocess_1(results: any, { env }: {
            env: any;
        }): any;
        export { postprocess_1 as postprocess };
    }
    namespace prepare {
        let required_4: boolean;
        export { required_4 as required };
        let dryRun_4: boolean;
        export { dryRun_4 as dryRun };
        export function pipelineConfig_3({ generateNotes }: {
            generateNotes: any;
        }): {
            getNextInput: (context: any) => Promise<any>;
        };
        export { pipelineConfig_3 as pipelineConfig };
    }
    namespace publish {
        let required_5: boolean;
        export { required_5 as required };
        let dryRun_5: boolean;
        export { dryRun_5 as dryRun };
        export function outputValidator_2(output: any): any;
        export { outputValidator_2 as outputValidator };
        export function pipelineConfig_4(): {
            transform: (release: any, step: any, { nextRelease }: {
                nextRelease: any;
            }) => any;
        };
        export { pipelineConfig_4 as pipelineConfig };
    }
    namespace addChannel {
        let required_6: boolean;
        export { required_6 as required };
        let dryRun_6: boolean;
        export { dryRun_6 as dryRun };
        export function outputValidator_3(output: any): any;
        export { outputValidator_3 as outputValidator };
        export function pipelineConfig_5(): {
            transform: (release: any, step: any, { nextRelease }: {
                nextRelease: any;
            }) => any;
        };
        export { pipelineConfig_5 as pipelineConfig };
    }
    namespace success {
        let required_7: boolean;
        export { required_7 as required };
        let dryRun_7: boolean;
        export { dryRun_7 as dryRun };
        export function pipelineConfig_6(): {
            settleAll: boolean;
        };
        export { pipelineConfig_6 as pipelineConfig };
        export function preprocess_1({ releases, env, ...inputs }: {
            [x: string]: any;
            releases: any;
            env: any;
        }): {
            env: any;
            releases: any;
        };
        export { preprocess_1 as preprocess };
    }
    namespace fail {
        let required_8: boolean;
        export { required_8 as required };
        let dryRun_8: boolean;
        export { dryRun_8 as dryRun };
        export function pipelineConfig_7(): {
            settleAll: boolean;
        };
        export { pipelineConfig_7 as pipelineConfig };
        export function preprocess_2({ errors, env, ...inputs }: {
            [x: string]: any;
            errors: any;
            env: any;
        }): {
            env: any;
            errors: any;
        };
        export { preprocess_2 as preprocess };
    }
}
export default _default;
