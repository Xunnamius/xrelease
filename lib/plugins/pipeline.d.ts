declare function _default(steps: Array<Function>, { settleAll, getNextInput, transform }?: {
    settleAll?: boolean | undefined;
    getNextInput?: Function | undefined;
    transform?: Function | undefined;
}): Pipeline;
export default _default;
/**
 * A Function that execute a list of function sequencially. If at least one Function ins the pipeline throws an Error or rejects, the pipeline function rejects as well.
 */
export type Pipeline = Function;
