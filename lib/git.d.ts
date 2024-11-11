/**
 * Get the commit sha for a given tag.
 *
 * @param {String} tagName Tag name for which to retrieve the commit sha.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {String} The commit sha of the tag in parameter or `null`.
 */
export function getTagHead(tagName: string, execaOptions: any): string;
/**
 * Get all the tags for a given branch.
 *
 * @param {String} branch The branch for which to retrieve the tags.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {Array<String>} List of git tags.
 * @throws {Error} If the `git` command fails.
 */
export function getTags(branch: string, execaOptions: any): Array<string>;
/**
 * Retrieve a range of commits.
 *
 * @param {String} from to includes all commits made after this sha (does not include this sha).
 * @param {String} to to includes all commits made before this sha (also include this sha).
 * @param {Object} [execaOpts] Options to pass to `execa`.
 * @param {Object} [gitLogOptions] Options to customize execution of `git log`.
 * @return {Promise<Array<Object>>} The list of commits between `from` and `to`.
 */
export function getCommits(from: string, to: string, execaOptions: any, gitLogOptions?: Object | undefined): Promise<Array<Object>>;
/**
 * Get all the repository branches.
 *
 * @param {String} repositoryUrl The remote repository URL.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {Array<String>} List of git branches.
 * @throws {Error} If the `git` command fails.
 */
export function getBranches(repositoryUrl: string, execaOptions: any): Array<string>;
/**
 * Verify if the `ref` exits
 *
 * @param {String} ref The reference to verify.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {Boolean} `true` if the reference exists, falsy otherwise.
 */
export function isRefExists(ref: string, execaOptions: any): boolean;
/**
 * Fetch all the tags from a branch. Unshallow if necessary.
 * This will update the local branch from the latest on the remote if:
 * - The branch is not the one that triggered the CI
 * - The CI created a detached head
 *
 * Otherwise it just calls `git fetch` without specifying the `refspec` option to avoid overwritting the head commit set by the CI.
 *
 * The goal is to retrieve the informations on all the release branches without "disturbing" the CI, leaving the trigger branch or the detached head intact.
 *
 * @param {String} repositoryUrl The remote repository URL.
 * @param {String} branch The repository branch to fetch.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 */
export function fetch(repositoryUrl: string, branch: string, ciBranch: any, execaOptions: any): Promise<void>;
/**
 * Unshallow the git repository if necessary and fetch all the notes.
 *
 * @param {String} repositoryUrl The remote repository URL.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 */
export function fetchNotes(repositoryUrl: string, execaOptions: any): Promise<void>;
/**
 * Get the HEAD sha.
 *
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {String} the sha of the HEAD commit.
 */
export function getGitHead(execaOptions: any): string;
/**
 * Get the repository remote URL.
 *
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {string} The value of the remote git URL.
 */
export function repoUrl(execaOptions: any): string;
/**
 * Test if the current working directory is a Git repository.
 *
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {Boolean} `true` if the current working directory is in a git repository, falsy otherwise.
 */
export function isGitRepo(execaOptions: any): boolean;
/**
 * Verify the write access authorization to remote repository with push dry-run.
 *
 * @param {String} repositoryUrl The remote repository URL.
 * @param {String} branch The repository branch for which to verify write access.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @throws {Error} if not authorized to push.
 */
export function verifyAuth(repositoryUrl: string, branch: string, execaOptions: any): Promise<void>;
/**
 * Tag the commit head on the local repository.
 *
 * @param {String} tagName The name of the tag.
 * @param {String} ref The Git reference to tag.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @throws {Error} if the tag creation failed.
 */
export function tag(tagName: string, ref: string, execaOptions: any): Promise<void>;
/**
 * Push to the remote repository.
 *
 * @param {String} repositoryUrl The remote repository URL.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @throws {Error} if the push failed.
 */
export function push(repositoryUrl: string, execaOptions: any): Promise<void>;
/**
 * Push notes to the remote repository.
 *
 * @param {String} repositoryUrl The remote repository URL.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @throws {Error} if the push failed.
 */
export function pushNotes(repositoryUrl: string, ref: any, execaOptions: any): Promise<void>;
/**
 * Verify a tag name is a valid Git reference.
 *
 * @param {String} tagName the tag name to verify.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {Boolean} `true` if valid, falsy otherwise.
 */
export function verifyTagName(tagName: string, execaOptions: any): boolean;
/**
 * Verify a branch name is a valid Git reference.
 *
 * @param {String} branch the branch name to verify.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {Boolean} `true` if valid, falsy otherwise.
 */
export function verifyBranchName(branch: string, execaOptions: any): boolean;
/**
 * Verify the local branch is up to date with the remote one.
 *
 * @param {String} repositoryUrl The remote repository URL.
 * @param {String} branch The repository branch for which to verify status.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {Boolean} `true` is the HEAD of the current local branch is the same as the HEAD of the remote branch, falsy otherwise.
 */
export function isBranchUpToDate(repositoryUrl: string, branch: string, execaOptions: any): boolean;
/**
 * Get and parse the JSON note of a given reference.
 *
 * @param {String} ref The Git reference for which to retrieve the note.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {Object} the parsed JSON note if there is one, an empty object otherwise.
 */
export function getNote(ref: string, execaOptions: any): Object;
/**
 * Add JSON note to a given reference.
 *
 * @param {Object} note The object to save in the reference note.
 * @param {String} ref The Git reference to add the note to.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 */
export function addNote(note: Object, ref: string, execaOptions: any): Promise<void>;
/**
 * Get the reference of a tag
 *
 * @param {String} tag The tag name to get the reference of.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 **/
export function getTagRef(tag: string, execaOptions: any): Promise<undefined>;
