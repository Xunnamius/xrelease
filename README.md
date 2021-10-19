<!-- prettier-ignore-start -->

<!-- badges-start -->

[![Black Lives Matter!][badge-blm]][link-blm]
[![Maintenance status][badge-maintenance]][link-repo]
[![Last commit timestamp][badge-last-commit]][link-repo]
[![Open issues][badge-issues]][link-issues]
[![Pull requests][badge-pulls]][link-pulls]

<!-- badges-end -->

<!-- prettier-ignore-end -->

# semantic-release-atam

```
  A  nnotated
  T  ags
  A  nd
  M  onorepos
```

This [semantic-release](https://github.com/semantic-release/github) fork makes
some tiny tweaks to allow semantic-release to work with annotated tags and
monorepos.

This fork is meant to be temporary. These are the pending PRs implementing ATAM
functionality:

- [#1710 (annotated
  tags)](https://github.com/semantic-release/semantic-release/pull/1710)
- [#XXXX (monorepo
  support)](https://github.com/semantic-release/semantic-release/pull/XXXX)
- [#XXXX (better plugin loader
  resolution)](https://github.com/semantic-release/semantic-release/pull/XXXX)

## Highlights

- Outwardly, nothing changes from the original semantic-release. It's a drop-in
  replacement!
- **semantic-release-atam is NOT published as a new npm package**, so you can
  replace semantic-release without having to do `npm install --force`.
- `master` branch is automatically rebased onto the latest release from
  upstream.
  - This allows semantic-release-atam to keep feature parity with
    semantic-release.
  - [Releases](https://github.com/Xunnamius/semantic-release-atam/releases) are
    maintained too, meaning you can [install specific versions](#install).
- Works with repos using [annotated
  tags](https://github.com/semantic-release/semantic-release/pull/1710) out of
  the box.
  - This allows tags to be signed, for instance.
- Can be configured to work with [monorepo/workspaces
  setups](https://github.com/semantic-release/semantic-release/issues/193).
  - Borrows several configuration options from
    [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/git-raw-commits#gitoptspath).
- Better plugin loader resolution when using extended configuration.
  - Monorepo packages can now load shared configuration from a single location.
- [Maintenance
  branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches)
  can be easily configured to work with monorepos.
- Arguably [less](https://github.com/atlassian/lerna-semantic-release)
  [hacky](https://github.com/qiwi/multi-semantic-release)
  [than](https://github.com/dhoulb/multi-semantic-release)
  [prior](https://www.npmjs.com/package/semantic-release-monorepo)
  [art](https://www.npmjs.com/package/semantic-release-plugin-decorators).

## Install

> **NEVER install semantic-release and semantic-release-atam at the same time!**

```shell
npm install --save-dev https://xunn.at/semantic-release-atam
```

If you want to use a specific version of semantic-release-atam, you can specify
its [release tag](https://github.com/Xunnamius/semantic-release-atam/releases)
(without the prefix):

```shell
npm install --save-dev https://xunn.at/semantic-release-atam@19.0.5
```

> Any valid [commit-ish](https://gitpkg.vercel.app/guide/#simplest-api) can be
> specified after the "@", not just version tags.

If you don't want to rely on [xunn.at](https://xunn.at), you can also [install
the package from GitHub
directly](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#github-urls).

### Installing semantic-release-atam vs semantic-release

Being a temporary fork, semantic-release-atam is not published as a package, so
you cannot do `npm install semantic-release-atam`.

This is because, to be an actual drop in replacement for semantic-release,
semantic-release-atam needs to use the name "semantic-release" (e.g. to satisfy
peer dependencies). Of course, only the _real_ semantic-release can be installed
as "semantic-release", but we can get around that by using
`"https://xunn.at/semantic-release-atam"` in lieu of a version in
`package.json`:

```javascript
{
  ...
  "devDependencies": {
    ...
    "semantic-release": "https://xunn.at/semantic-release-atam"
    ...
  }
}
```

This is what the [above](#install) command does for you automatically.

## Using semantic-release-atam With a Monorepo

> These instructions **SHOULD NOT** be used with
> [Projector](https://github.com/Xunnamius/projector)'s pre-made configurations,
> since they handle all of this for you.

semantic-release-atam should be run once per package with each package's root as
the working directory.

For example:

```bash
REPO_ROOT=...
NPM_CONFIG_USERCONFIG="$REPO_ROOT/.npmrc" NPM_TOKEN=$(cd $REPO_ROOT && npx --yes dotenv-cli -p NPM_TOKEN) GH_TOKEN=$(cd $REPO_ROOT && npx --yes dotenv-cli -p GITHUB_TOKEN) HUSKY=0 UPDATE_CHANGELOG=true GIT_AUTHOR_NAME=$(git config --global --get user.name) GIT_COMMITTER_NAME=$(git config --global --get user.name) GIT_AUTHOR_EMAIL=$(git config --global --get user.email) GIT_COMMITTER_EMAIL=$(git config --global --get user.email) npx --no-install semantic-release --extends "$REPO_ROOT/release.config.js"
```

Where `semantic-release --extends "$REPO_ROOT/release.config.js"` loads a shared
`release.config.js` file located at the repository's root.

> When running semantic-release-atam on a normal (non-mono) repo,
> `release.config.js` would get picked up automatically. When running in a
> monorepo package's subfolder (e.g. `packages/my-package-1`) however, the same
> config file can be (re)used via the `--extends` CLI option.

This fork makes the `gitLogOptions` option available in your
`release.config.js`:

```typescript
// Suppose process.cwd() returns /path/to/repo/packages/my-package-1
const targetPkgId = getPkgNameFromCwd();
module.exports = {
  // semantic-release-atam will ignore tags that don't belong to my-package-1
  tagFormat: `${targetPkgId}@\${version}`,
  gitLogOptions: {
    path: [":(exclude)../my-package-2", ":(exclude)../my-package-3", ":(exclude)../my-package-4"],
  },
  // ...
};
```

At the moment, `gitLogOptions` has a single valid option: `path: string | string[]`. Like with
[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/git-raw-commits#gitoptspath),
`gitLogOptions.path` (which accepts one or more
[paths/pathspecs](https://git-scm.com/docs/git-log#Documentation/git-log.txt---ltpathgt82308203),
including
[exclusions](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-exclude))
can be used to make semantic-release-atam consider only those commits that
belong to the package, ignoring the others.

> Note: it's usually better to filter via [exclusion
> pathspecs](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-exclude)
> than simple paths, which ensures important changes that happen outside the
> `packages/` directory are considered by semantic-release-atam and
> conventional-changelog.

Combined with `tagFormat`, `gitLogOptions.path` makes semantic-release-atam
flexible enough to work with most monorepo/workspace setups. Additionally,
monorepo maintenance branch support can be enabled via the new
`branchRangePrefix` option.

Putting it all together:

```javascript
// ./release.config.js

// Suppose process.cwd() returns /path/to/repo/packages/my-package-1
// Suppose __dirname equals /path/to/repo (meaning this file is at repo root)
const cwd = process.cwd();
const pathParts = cwd.replace(`${__dirname}/`, "").split("/");
// pathParts = [ 'packages', 'my-package-1' ]

if (pathParts.length < 2 || pathParts[0] != "packages") {
  throw new Error(`assert failed: illegal cwd: ${cwd}`);
}

const targetPkgId = pathParts[1];
// targetPkgId = 'my-package-1'

// Returns an array of exclusion pathspecs, one for each package except the
// target package
const getExcludedDirs = (source, except) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name != except)
    .map((dirent) => `:(exclude)${source}/${dirent.name}`);

module.exports = {
  // Teach semantic-release-atam what our package-specific tags look like
  // e.g.: my-package-1@1.0.0
  tagFormat: `${targetPkgId}@\${version}`,
  // ... and what our package-specific maintenance branches start with
  // e.g.: my-package-1@1.x
  branchRangePrefix: `${targetPkgId}@`,
  gitLogOptions: {
    // Tell semantic-release-atam to exclude commits from the other packages
    path: getExcludedDirs("..", targetPkgId),
  },
  branches: [
    // Teach semantic-release-atam what our maintenance branches look like. Must
    // begin with `branchRangePrefix`
    // e.g.: my-package-1@1.x
    `${targetPkgId}@+([0-9])?(.{+([0-9]),x}).x`,
    "main",
    {
      name: "canary",
      channel: "canary",
      prerelease: true,
    },
  ],
  //...
};
```

And, for package-specific changelog generation, a [conventional-changelog
configuration
file](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-core#config)
at `conventional.config.js` that looks something like:

```javascript
// ...

module.exports = {
  options: {
    lernaPackage: targetPkgId,
  },
  gitRawCommitsOpts: {
    // ? Used to ignore changes in other packages
    // ? See: https://github.com/sindresorhus/dargs#usage
    "--": getExcludedDirs("..", targetPkgId),
  },
};
```

And voilà! 🎉

The above can be used to (re)generate a complete `CHANGELOG.md` file for any
monorepo package via CLI: `npx conventional-changelog --outfile CHANGELOG.md --config ../../conventional.config.js --release-count 0 --skip-unstable`. This
can also be invoked via
[@semantic-release/exec](https://github.com/semantic-release/exec) at build
time.

### Patched conventional-changelog

If going with conventional-changelog as your changelog generator, consider using
[the version patched to work properly with
monorepos](https://github.com/Xunnamius/conventional-changelog) ([PRs
pending](https://github.com/conventional-changelog/conventional-changelog/pull/865)):

```bash
npm install --save-dev https://xunn.at/conventional-changelog-cli
```

This patched version also accepts `workspace` as an alternative to the original
`lernaPackage` option. The two options are functionally identical, except
`workspace` accepts a path to a package directory where the `lernaPackage`
accepts only a [package-id](https://github.com/Xunnamius/projector#terminology)
(basename). Hence, `workspace` allows changelogs to be generated for monorepos
that use a non-Lerna workspace/package structure.

```javascript
// ...

module.exports = {
  options: {
    workspace: cwd,
  },
  gitRawCommitsOpts: {
    // ? Used to ignore changes in other packages
    // ? See: https://github.com/sindresorhus/dargs#usage
    "--": getExcludedDirs("..", targetPkgId),
  },
};
```

## Fork Structure and Maintenance

This fork is structured to be automatically rebased onto upstream releases when
they occur. To facilitate this, care must be taken when committing changes to
this repo. Specifically:

- The HEAD of the `master` branch MUST ALWAYS be the `release: bump version`
  commit. This allows the upstream synchronization script to do its job.
- All changes should happen on the `master` branch.
- Changes should be added to existing commits via `git commit --amend` and then
  force pushed via `git push --force`. If amending a pre-existing commit is not
  desirable for whatever reason, the new commit should be rebased _under_ the
  `release: bump version` commit.
- Never make custom releases or mess with the `atam@*` git tags. These are
  automatically managed by the upstream synchronization script.

For example, suppose we updated the `README.md` file and want to commit the
changes:

```shell
git add README.md
git commit -m mergeme
git rebase -S -i HEAD~5 --no-verify
# Either make the mergeme commit a "fixup" to a pre-existing commit or
# reposition it to occur below HEAD
git push --force
```

Any changes between `master` and the latest upstream release will be minted into
a new local release _only after upstream makes a new release_. Until then, any
changes will only be visible to those utilizing the `master` branch directly.

[badge-blm]: https://xunn.at/badge-blm "Join the movement!"
[link-blm]: https://xunn.at/donate-blm
[badge-maintenance]: https://img.shields.io/maintenance/active/2022 "Is this
    package maintained?"
[link-repo]: https://github.com/xunnamius/semantic-release-atam
[badge-last-commit]: https://img.shields.io/github/last-commit/xunnamius/semantic-release-atam "Latest commit timestamp"
[badge-issues]: https://img.shields.io/github/issues/Xunnamius/semantic-release-atam "Open
    issues"
[link-issues]: https://github.com/Xunnamius/semantic-release-atam/issues?q=
[badge-pulls]: https://img.shields.io/github/issues-pr/xunnamius/semantic-release-atam "Open pull requests"
[link-pulls]: https://github.com/xunnamius/semantic-release-atam/pulls
