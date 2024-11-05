<p align="center" width="100%">
  <img width="300" src="./xrelease.png">
</p>

<p align="center" width="100%">
A <a href="https://github.com/semantic-release/github" target="_blank">semantic-release</a> fork that supports annotated tags and monorepos.
</p>

<hr />

<!-- badges-start -->

<div align="center">

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-npm-link]

</div>

<!-- badges-end -->

<br />

# xrelease (@-xun/release)

This [semantic-release](https://github.com/semantic-release/github) fork
slightly tweaks the original so that it can work with both polyrepos and
monorepos, including monorepos that were formerly polyrepos and repos using
annotated tags.

For similarly monorepo-aware automatic changelog generation, see
[xchangelog](https://github.com/Xunnamius/xchangelog), which xrelease uses
internally as a replacement for
[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
and therefore requires as a [peer dependency](./package.json).

> \[!NOTE]
>
> The only reason to use xrelease over
> [semantic-release](https://github.com/semantic-release/github) is if you are
> using an [xscripts](https://github.com/Xunnamius/xscripts)-powered project,
> your repository uses annotated tags, or your repository is a monorepo.
> Otherwise, just use
> [semantic-release](https://github.com/semantic-release/github).

## Install

To install xrelease:

```shell
npm install --save-dev semantic-release@npm:@-xun/release
```

If you want to use a specific version of xrelease, provide its semver:

```shell
npm install --save-dev semantic-release@npm:@-xun/release@1.2.3
```

> \[!NOTE]
>
> xrelease installations reuse the "semantic-release" name so that plugins with
> semantic-release as a peer dependency are able to recognize xrelease's
> presence.

## Additional Features

xrelease offers a couple improvements over upstream:

### Lightweight and annotated tag support

Both
[lightweight and annotated tags](https://stackoverflow.com/questions/11514075/what-is-the-difference-between-an-annotated-and-unannotated-tag)
are supported.

> `man git-tag` says:
>
> > Annotated tags are meant for release while lightweight tags are meant for
> > private or temporary object labels.

### Support for monorepos

Monorepo support is implemented via the extension of the
[`tagFormat`](#tagformat-and-secondarytagformat) configuration option and the
introduction of two new options: [`branchRangePrefix`](#branchrangeprefix) and
[`gitLogOptions`](#gitlogoptions).

> \[!WARNING]
>
> These options have only been tested in
> [release configuration files](https://github.com/Xunnamius/xrelease/blob/main/docs/usage/configuration.md)
> and might not be available via CLI.

Once properly configured, xrelease should be run once per package to be
released, with the current working directory set to the root of each respective
package.

For monorepos, if the current working directory does not contain the
repository's release configuration file, use `--extends` to refer to its
location explicitly (e.g. `--extends ../../release.config.js`); xrelease
supports using `--extends` to load plugins from `/node_modules/` directories
higher up in the repository tree. Further, a tool like
[Turbo](https://github.com/vercel/turborepo) can be used to orchestrate package
releases in dependency order.

> \[!NOTE]
>
> See
> [babel-plugin-tester's `release.config.js`](https://github.com/babel-utils/babel-plugin-tester)
> (polyrepo),
> [xscripts's `release.config.js`](https://github.com/Xunnamius/xscripts)
> (hybridrepo) or
> [unified-utils's `release.config.js`](https://github.com/Xunnamius/unified-utils)
> (monorepo) for complete functional examples of xrelease configurations in the
> wild.
>
> See the [xscripts wiki](https://github.com/Xunnamius/xscripts/wiki) or the
> [git diff between this repo and upstream](https://github.com/semantic-release/semantic-release/compare/master...Xunnamius:xrelease:main)
> for technical details.

The extended configuration options are:

#### `tagFormat` (and `secondaryTagFormat`)

Type: `string`\
Default: `"v${version}"`

The primary [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) format
used by xrelease to create and identify releases. When cutting a new release,
its corresponding tag name will be [generated](https://lodash.com/docs#template)
using `tagFormat`.

There is also `secondaryTagFormat`, an optional secondary [git
tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) format that, if given,
will be used in addition to `tagFormat` when filtering commits.

`tagFormat` and `secondaryTagFormat` are key to proper monorepo support, since
they dictate what previous tags are recognized as belonging to the current
package to be released and which belong to other packages that should be
filtered out.

To support a simple monorepo that uses "@"-syntax for its release tags (e.g.
`my-package@1.2.3`), your
[release configuration](https://github.com/Xunnamius/xrelease/blob/main/docs/usage/configuration.md)
might include:

```javascript
// Tell xrelease what package-specific tags look like
tagFormat: `${cwdPackageName}@\${version}`;
```

To support a monorepo (that uses the "@"-syntax for its tags) with a root
package that was previously a polyrepo (that used the standard semantic-release
"v"-syntax for its tags), your
[release configuration](https://github.com/Xunnamius/xrelease/blob/main/docs/usage/configuration.md)
might include:

```javascript
  // Tell xrelease what package-specific tags look like
tagFormat: `${cwdPackageName}@\${version}`,
  // If this is the root package, also accept old-style tags for compat
secondaryTagFormat: isCwdPackageTheRootPackage ? `v\${version}` : undefined
```

> \[!CAUTION]
>
> `\${version}` is a
> [Lodash template variable](https://lodash.com/docs#template) while
> `${cwdPackageName}` is a variable in a
> [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
> That is: you are responsible for defining `cwdPackageName` and
> `isCwdPackageTheRootPackage`, while `\${version}` is defined by xrelease.
> Additionally, each `tagFormat` value must contain the `version` variable
> exactly once, and the whole value must compile to a valid git reference.

#### `gitLogOptions`

Type: `{ path: string | string[] }`\
Default: `"v${version}"`

The [git log](https://git-scm.com/docs/git-log)
[command line arguments](https://git-scm.com/docs/git-log#_options) used by
xrelease to select commits for
[further analysis](https://github.com/semantic-release/commit-analyzer).
Currently, `gitLogOptions` has a single valid option: `path`, which corresponds
to
[`git log -- <path>`](https://git-scm.com/docs/git-log#Documentation/git-log.txt---ltpathgt82308203).

This configuration option is key to proper monorepo support, since it dictates
what commits are recognized as belonging to the current package to be released
and which belong to other packages that should be filtered out.

To support a monorepo attempting to release a new version of `my-package-1`,
your
[release configuration](https://github.com/Xunnamius/xrelease/blob/main/docs/usage/configuration.md)
might include:

```javascript
gitLogOptions: {
  // Tell xrelease to consider only commits that modify files under these paths
  path: [
    ':(exclude)../my-package-2',
    ':(exclude)../my-package-3',
    ':(exclude)../my-package-4'
  ];
}
```

In this example, we used
[exclusion pathspecs](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-exclude)
to create a blacklist of paths we _didn't want_ instead of a whitelist of paths
we do want. Either approach is viable depending on project structure; however,
using exclusions ensures important changes that happen outside the package's
root directory (such as changes to a shared unpublished library) are considered
by xrelease when
[analyzing commits](https://github.com/semantic-release/commit-analyzer).

Note how the given pathspecs are relative to e.g.
`/home/user/my-project/packages/my-package-1`. That's because xrelease should
always be run at the root of the package to be released.

The given pathspecs also happen to work for releasing each of the other packages
as well, assuming they are all share the same parent directory, e.g.
`/home/user/my-project/packages`.

To support a polyrepo instead, your
[release configuration](https://github.com/Xunnamius/xrelease/blob/main/docs/usage/configuration.md)
might include:

```javascript
gitLogOptions: {
  // Tell xrelease not to filter commits at all and instead consider everything
  path: [];
}
```

Or we could omit the `gitLogOptions` object from `release.config.js` entirely.

#### `branchRangePrefix`

Type: `string`\
Default: `""`

The value that prefixes the
[names](https://github.com/Xunnamius/xrelease/blob/main/docs/usage/workflow-configuration.md#range)
of relevant
[maintenance branches](https://github.com/Xunnamius/xrelease/blob/main/docs/usage/workflow-configuration.md#maintenance-branches).
This is used internally by xrelease to generate the proper
[`branches`](https://github.com/Xunnamius/xrelease/blob/main/docs/usage/configuration.md#branches)
configurations for maintenance branches that refer to particular packages in a
monorepo, and can be left undefined in a polyrepo.

> \[!CAUTION]
>
> The `branchRangePrefix` string must **only match maintenance branches**! If
> you also define a non-maintenance branch with a name starting with
> `branchRangePrefix`, xrelease's behavior is undefined.

To support a simple monorepo that uses "package-name@x.y.z"-syntax for its
maintenance branch names (e.g. `my-package@1.2.3`), your
[release configuration](https://github.com/Xunnamius/xrelease/blob/main/docs/usage/configuration.md)
might include:

```javascript
// Tell xrelease to remove this string from maintenance branch names when
// resolving their respective ranges and channels
branchRangePrefix: `${cwdPackageName}@`,
branches: [
  // Tell xrelease what package-specific maintenance branch names look like.
  // Specifically: they must begin with `branchRangePrefix`
  `${cwdPackageName}@+([0-9])?(.{+([0-9]),x}).x`,
  'main'
]
```

To support a monorepo (that uses the "package@x.y.z"-syntax for its maintenance
branch names) with a root package that was previously a polyrepo (that used the
standard semantic-release "x.y.z"-syntax for its maintenance branch names), your
[release configuration](https://github.com/Xunnamius/xrelease/blob/main/docs/usage/configuration.md)
might include:

```javascript
// Tell xrelease to remove this string from maintenance branch names when
// resolving their respective ranges and channels
branchRangePrefix: `${cwdPackageName}@`,
branches: [
  // Tell xrelease what package-specific maintenance branch names look like.
  // Specifically: they must begin with `branchRangePrefix`
  `${cwdPackageName}@+([0-9])?(.{+([0-9]),x}).x`,
  // If this is the root package, also accept old-style branch names for compat
  ...(isCwdPackageTheRootPackage ? ['+([0-9])?(.{+([0-9]),x}).x'] : []),
  'main'
]
```

## Example

Putting the new configuration options together, we could use what follows to
release packages from the `/home/user/my-project` hybridrepo (a monorepo with a
root package), which was formerly a polyrepo that we turned into a monorepo by
giving its root `package.json` file a
[`workspaces`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#workspaces)
key.

The `my-project` repo contains the four packages `my-package-1` through
`my-package-4` under `/home/user/my-project/packages/*` along with a
`/home/user/my-project/package.json` file containing the name of the root
package (`my-root-package`) and a `/home/user/my-project/src` directory
containing the root package's source code.

We can push changes to `main`, which is our primary release branch that
publishes to one or more packages' respective
[`@latest` release channel](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/workflow-configuration.md#channel)
(the default for NPM projects). Or we can push changes to `canary`, which will
publish to one or more packages' respective
[`@canary` release channel](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/workflow-configuration.md#pre-release-branches).
We can also push changes to a `package-name@x.y.z` branch, where `package-name`
represents the name of the monorepo package and `x.y.z` represents a typical
[maintenance branch `name`](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/workflow-configuration.md#maintenance-branches).

```javascript
// ./release.config.js

function makeConfiguration() {
  const { cwdPackage } = getCurrentWorkingDirectoryPackageInformation();
  const isCwdPackageTheRootPackage = isRootPackage(cwdPackage);
  const gitLogPathspecs = getExcludedDirectoryPathspecs(cwdPackage);
  const cwdPackageName = cwdPackage.json.name;

  return {
    tagFormat: [
      // Tell xrelease what package-specific tags look like
      `${cwdPackageName}@\${version}`,
      // If this is the root package, accept old-style tags for compat
      ...(isCwdPackageTheRootPackage ? [`v\${version}`] : [])
    ],
    // Tell xrelease to remove this string from maintenance branch names when
    // resolving their respective ranges and channels
    branchRangePrefix: `${cwdPackageName}@`,
    gitLogOptions: {
      // Tell xrelease to exclude commits from the other packages
      path: gitLogPathspecs
    },
    branches: [
      // Tell xrelease what package-specific maintenance branch names look like.
      // Specifically: they must begin with `branchRangePrefix`
      `${cwdPackageName}@+([0-9])?(.{+([0-9]),x}).x`,
      // If this is the root package, accept old-style branch names for compat
      ...(isCwdPackageTheRootPackage ? ['+([0-9])?(.{+([0-9]),x}).x'] : []),
      'main',
      {
        name: 'canary',
        channel: 'canary',
        prerelease: true
      }
    ],
    plugins: [
      // ...
    ]
  };
}

module.exports = makeConfiguration();
```

## Contributing

Consider contributing to upstream
[semantic-release](https://github.com/semantic-release/semantic-release)
instead.

[x-badge-blm-image]: https://xunn.at/badge-blm 'Join the movement!'
[x-badge-blm-link]: https://xunn.at/donate-blm
[x-badge-codecov-image]:
  https://img.shields.io/codecov/c/github/Xunnamius/xrelease/main?style=flat-square&token=HWRIOBAAPW
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/xrelease
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/@-xun/release?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/Xunnamius/xrelease?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/@-xun/release?style=flat-square
  "This package's source license"
[x-badge-license-link]: https://github.com/Xunnamius/xrelease/blob/main/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/@-xun/release
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://www.npmjs.com/package/@-xun/release
[x-badge-repo-link]: https://github.com/Xunnamius/xrelease
[x-badge-semanticrelease-image]:
  https://xunn.at/badge-semantic-release
  'This repo practices continuous integration and deployment!'
[x-badge-semanticrelease-link]:
  https://github.com/semantic-release/semantic-release
[x-pkg-cjs-mojito]:
  https://dev.to/jakobjingleheimer/configuring-commonjs-es-modules-for-nodejs-12ed#publish-only-a-cjs-distribution-with-property-exports
[x-pkg-dual-package-hazard]:
  https://nodejs.org/api/packages.html#dual-package-hazard
[x-pkg-exports-conditions]:
  https://webpack.js.org/guides/package-exports#reference-syntax
[x-pkg-exports-module-key]:
  https://webpack.js.org/guides/package-exports#providing-commonjs-and-esm-version-stateless
[x-pkg-exports-types-key]:
  https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta#packagejson-exports-imports-and-self-referencing
[x-pkg-side-effects-key]:
  https://webpack.js.org/guides/tree-shaking#mark-the-file-as-side-effect-free
[x-pkg-tree-shaking]: https://webpack.js.org/guides/tree-shaking
[x-pkg-type]:
  https://github.com/nodejs/node/blob/8d8e06a345043bec787e904edc9a2f5c5e9c275f/doc/api/packages.md#type
[x-repo-all-contributors]: https://github.com/all-contributors/all-contributors
[x-repo-all-contributors-emojis]: https://allcontributors.org/docs/en/emoji-key
[x-repo-choose-new-issue]:
  https://github.com/Xunnamius/xrelease/issues/new/choose
[x-repo-contributing]: /CONTRIBUTING.md
[x-repo-docs]: docs
[x-repo-license]: ./LICENSE
[x-repo-package-json]: package.json
[x-repo-pr-compare]: https://github.com/Xunnamius/xrelease/compare
[x-repo-sponsor]: https://github.com/sponsors/Xunnamius
[x-repo-support]: /.github/SUPPORT.md
