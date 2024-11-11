declare function _default({ branch, options: { tagFormat } }: Object, { before }?: {
    before: Object;
}): LastRelease;
export default _default;
/**
 * Last release.
 */
export type LastRelease = {
    /**
     * The version number of the last release.
     */
    version: string;
    /**
     * The Git reference used to make the last release.
     */
    gitHead: string;
    /**
     * The git tag associated with the last release.
     */
    gitTag: string;
    /**
     * The channel on which of the last release was published.
     */
    channel: string;
    /**
     * The name of the last release.
     */
    name: string;
};
