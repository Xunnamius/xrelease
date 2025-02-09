<!-- symbiote-template-region-start 1 -->

<p align="center" width="100%">
  <img width="300" src="https://raw.githubusercontent.com/Xunnamius/xrelease/refs/heads/main/logo.png">
</p>

<p align="center" width="100%">
<!-- symbiote-template-region-end -->
A <a href="https://github.com/semantic-release/github" target="_blank">semantic-release</a> fork that supports annotated tags and monorepos
<!-- symbiote-template-region-start 2 -->
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
[![Monthly Downloads][x-badge-downloads-image]][x-badge-downloads-link]

</div>

<br />

# xrelease (@-xun/release)

<!-- symbiote-template-region-end -->

This [semantic-release][1] fork slightly tweaks the original so that it can work
with both polyrepos and monorepos (see [below][31]).

> [!NOTE]
>
> The only reason to use xrelease over [semantic-release][1] is if you are using
> an [symbiote][2]-powered project, your repository uses annotated tags, you
> need the bug fixes, or your repository is a monorepo. Otherwise, just use
> [semantic-release][1].

<!-- symbiote-template-region-start 3 -->

---

<!-- remark-ignore-start -->
<!-- symbiote-template-region-end -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Additional Features](#additional-features)
  - [Lightweight and Annotated Tag Support](#lightweight-and-annotated-tag-support)
  - [Support for Monorepos](#support-for-monorepos)
- [Example](#example)
- [Appendix](#appendix)
  - [Published Package Details](#published-package-details)
  - [License](#license)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- symbiote-template-region-start 4 -->
<!-- remark-ignore-end -->

<br />

## Install

<!-- symbiote-template-region-end -->

To install xrelease:

```shell
npm install --save-dev semantic-release@npm:@-xun/release
```

If you want to use a specific version of xrelease, provide its semver:

```shell
npm install --save-dev semantic-release@npm:@-xun/release@1.2.3
```

> [!NOTE]
>
> xrelease installations reuse the "semantic-release" name so that plugins with
> semantic-release as a peer dependency are able to recognize xrelease's
> presence.

## Additional Features

xrelease offers a couple improvements over upstream:

### Lightweight and Annotated Tag Support

Both [lightweight and annotated tags][3] are supported.

> `man git-tag` says:
>
> Annotated tags are meant for release while lightweight tags are meant for
> private or temporary object labels.

### Support for Monorepos

Monorepo support is implemented via the existing [`tagFormat`][4] configuration
option and the introduction of two new options: [`branchRangePrefix`][5] and
[`gitLogOptions`][6].

> [!WARNING]
>
> These options have only been tested in [release configuration files][7] and
> might not be available via CLI.

Once properly configured, xrelease should be run once per package to be
released, with the current working directory set to the root of each respective
package.

For monorepos, if the current working directory does not contain the
repository's release configuration file, use `--extends` to refer to its
location explicitly (e.g. `--extends ../../release.config.js`); xrelease
supports using `--extends` to load plugins from `/node_modules/` directories
higher up in the repository tree. Further, a tool like [Turbo][8] can be used to
orchestrate package releases in dependency order.

> [!NOTE]
>
> See [babel-plugin-tester's `release.config.js`][9] (polyrepo), [symbiote's
> `release.config.js`][2] (hybridrepo) or [unified-utils's
> `release.config.js`][10] (monorepo) for complete functional examples of
> xrelease configurations in the wild.
>
> See the [symbiote wiki][11] or the [git diff between this repo and
> upstream][12] for technical details.

The extended configuration options are:

#### `tagFormat`

Type: `string`\
Default: `"v${version}"`

The [git tag][13] format used by xrelease to create and identify releases. When
cutting a new release, its corresponding tag name will be [generated][14] using
`tagFormat`.

`tagFormat` is key to proper monorepo support since it dictates which existing
tags belong to the current package to be released and which belong to other
packages that should be filtered out.

To support a simple monorepo that uses "@"-syntax for its release tags (e.g.
`my-package@1.2.3`), your [release configuration][7] might include:

```javascript
// Tell xrelease what package-specific tags look like
tagFormat: `${cwdPackageName}@\${version}`;
```

> [!CAUTION]
>
> `\${version}` (or `${version}` in a non-template string literal) is a [Lodash
> template variable][14] while `${cwdPackageName}` is a variable in a [template
> string literal][15]. That is: you are responsible for defining
> `cwdPackageName`, while `\${version}` is replaced by xrelease. Additionally,
> each `tagFormat` value must contain the `version` variable exactly once, and
> the whole `tagFormat` value must compile to a valid git reference or
> commit-ish.

To refactor a polyrepo (that uses the standard semantic-release "v"-syntax for
its tags) into a monorepo (that uses the "@"-syntax for its tags), optionally
with a root package, use [`@-xun/scripts`'s "renovate" command][16]:
`npx symbiote project renovate --regenerate-assets --preset ...`.

#### `gitLogOptions`

Type: `{ paths?: string | string[], flags?: string | string[] }`\
Default: `"v${version}"`

The [git log][17] [command line arguments][18] used by xrelease to select
commits for [further analysis][19]. Currently, `gitLogOptions` has two valid
options: `flags` and `paths`, which correspond to
[`git log <flags> -- <paths>`][20].

`gitLogOptions` is key to proper monorepo support since it dictates what commits
belong to the current package to be released and which belong to other packages
that should be filtered out.

To support a monorepo attempting to release a new version of `my-package-1`,
your [release configuration][7] might include:

```javascript
gitLogOptions: {
  // Tell xrelease to consider only commits that modify files under these paths
  paths: [
    ':(exclude)../my-package-2',
    ':(exclude)../my-package-3',
    ':(exclude)../my-package-4'
  ];
}
```

In this example, we used [exclusion pathspecs][21] to create a denylist of paths
we _didn't want_ instead of an allowlist of paths we do want. Either approach is
viable depending on project structure; however, using exclusions ensures
important changes that happen outside the package's root directory (such as
changes to a shared unpublished library) are considered by xrelease when
[analyzing commits][19].

Note how the given pathspecs are relative to e.g.
`/home/user/my-project/packages/my-package-1`. That's because xrelease should
always be run at the root of the package to be released.

The pathspec syntax we're using happens to work for releasing each of the other
packages as well, assuming they are all share the same parent directory, e.g.
`/home/user/my-project/packages`. If we wanted to release `my-package-2` next,
we would replace `':(exclude)../my-package-2'` with
`':(exclude)../my-package-1'` and run xrelease again.

To support a polyrepo instead, your [release configuration][7] might include:

```javascript
gitLogOptions: {
  // Tell xrelease not to filter commits at all and instead consider everything
  paths: [];
}
```

Or we could omit the `gitLogOptions` object from `release.config.js` entirely,
which would be equivalent.

Finally, you can use `flags` to ensure [`git log`][20] is invoked with certain
flags. For instance, we can tell xrelease to ignore all commits reachable by an
"initial" commit (including said commit itself). This could be useful if we
forked a large project with many thousands of commits (conventional or
otherwise) that should be ignored by the commit analyzer:

```javascript
gitLogOptions: {
  // Tell xrelease to filter commits created after the latest commit (including
  // itself) with "[INIT]" suffixing its subject, a reference we acquired by
  // running: `git log -1 --pretty=format:%H --fixed-strings --grep '\\[INIT]$'`
  flags: ref ? [`^${ref}`] : [];
}
```

You can pass any flag that [`git log`][20] understands.

#### `branchRangePrefix`

Type: `string`\
Default: `""`

The value that prefixes the [names][22] of relevant [maintenance branches][23].
This is used internally by xrelease to generate the proper [`branches`][24]
configurations for maintenance branches that refer to particular packages in a
monorepo, and can be left undefined in a polyrepo.

> [!CAUTION]
>
> The `branchRangePrefix` string must **only match maintenance branches**! If
> you also define a non-maintenance branch with a name starting with
> `branchRangePrefix`, xrelease's behavior is undefined.

To support a simple monorepo that uses "[package-name@x.y.z][25]"-syntax for its
maintenance branch names (e.g. `my-package@1.2.3`), your [release
configuration][7] might include:

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

To refactor a polyrepo (that uses the standard semantic-release "x.y.z"-syntax
for its maintenance branch names) into a monorepo (that uses the
"[package@x.y.z][26]"-syntax for its maintenance branch names), optionally with
a root package, use [`@-xun/scripts`'s "renovate" command][16]:
`npx symbiote project renovate --regenerate-assets --preset ...`.

## Example

Putting the new configuration options together, we could use what follows to
release packages from the `/home/user/my-project` hybridrepo (a monorepo with a
root package), which was formerly a polyrepo that we turned into a monorepo by
giving its root `package.json` file a [`workspaces`][27] key and [creating
scoped aliases of existing maintenance branches and tags][16].

The `my-project` repo contains the four packages `my-package-1` through
`my-package-4` under `/home/user/my-project/packages/*` along with a
`/home/user/my-project/package.json` file containing the name of the root
package (`my-root-package`) and a `/home/user/my-project/src` directory
containing the root package's source code.

We can push changes to `main`, which is our primary release branch that
publishes to one or more packages' respective [`@latest` release channel][28]
(the default for NPM projects). Or we can push changes to `canary`, which will
publish to one or more packages' respective [`@canary` release channel][29]. We
can also push changes to a `package-name@x.y.z` branch, where `package-name`
represents the name of the monorepo package and `x.y.z` represents the
[maintenance branch `range`][30].

```javascript
// ./release.config.js

function makeConfiguration() {
  const { cwdPackage } = getCurrentWorkingDirectoryPackageInformation();
  const isCwdPackageTheRootPackage = isRootPackage(cwdPackage);
  const gitLogPathspecs = getExcludedDirectoryPathspecs(cwdPackage);
  const cwdPackageName = cwdPackage.json.name;

  return {
    // Tell xrelease what package-specific tags look like
    tagFormat: `${cwdPackageName}@\${version}`,
    // Tell xrelease to remove this string from maintenance branch names when
    // resolving their respective ranges and channels
    branchRangePrefix: `${cwdPackageName}@`,
    gitLogOptions: {
      // Tell xrelease to exclude commits from the other packages
      paths: gitLogPathspecs
    },
    branches: [
      // Tell xrelease what package-specific maintenance branch names look like.
      // Specifically: they must begin with `branchRangePrefix`
      `${cwdPackageName}@+([0-9])?(.{+([0-9]),x}).x`,
      // If this is the root package, we could accept old-style branch names for
      // the sake of compatibility. But it's usually better to just create new
      // branch names aliases matching the `${cwdPackageName}@` pattern
      //...(isCwdPackageTheRootPackage ? ['+([0-9])?(.{+([0-9]),x}).x'] : []),
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

<!-- symbiote-template-region-start 5 -->

## Appendix

<!-- symbiote-template-region-end -->
<!-- symbiote-template-region-start 6 -->

### Published Package Details

This is an [ESM-only package][x-pkg-esm-wine] built by Babel for use in Node.js
versions that are not end-of-life. For TypeScript users, this package supports
both `"Node10"` and `"Node16"` module resolution strategies.

<!-- symbiote-template-region-end -->
<!-- symbiote-template-region-start 7 -->

<details><summary>Expand details</summary>

That means ESM source will load this package via `import { ... } from ...` or
`await import(...)` and CJS source will load this package via dynamic
`import()`. This has several benefits, the foremost being: less code
shipped/smaller package size, avoiding [dual package
hazard][x-pkg-dual-package-hazard] entirely, distributables are not
packed/bundled/uglified, and a drastically less complex build process.

The glaring downside, which may or may not be relevant, is that CJS consumers
cannot `require()` this package and can only use `import()` in an asynchronous
context. This means, in effect, CJS consumers may not be able to use this
package at all.

Each entry point (i.e. `ENTRY`) in [`package.json`'s
`exports[ENTRY]`][x-repo-package-json] object includes one or more [export
conditions][x-pkg-exports-conditions]. These entries may or may not include: an
[`exports[ENTRY].types`][x-pkg-exports-types-key] condition pointing to a type
declaration file for TypeScript and IDEs, a
[`exports[ENTRY].module`][x-pkg-exports-module-key] condition pointing to
(usually ESM) source for Webpack/Rollup, a `exports[ENTRY].node` and/or
`exports[ENTRY].default` condition pointing to (usually CJS2) source for Node.js
`require`/`import` and for browsers and other environments, and [other
conditions][x-pkg-exports-conditions] not enumerated here. Check the
[package.json][x-repo-package-json] file to see which export conditions are
supported.

Note that, regardless of the [`{ "type": "..." }`][x-pkg-type] specified in
[`package.json`][x-repo-package-json], any JavaScript files written in ESM
syntax (including distributables) will always have the `.mjs` extension. Note
also that [`package.json`][x-repo-package-json] may include the
[`sideEffects`][x-pkg-side-effects-key] key, which is almost always `false` for
optimal [tree shaking][x-pkg-tree-shaking] where appropriate.

<!-- symbiote-template-region-end -->
<!-- symbiote-template-region-start 8 -->

</details>

### License

<!-- symbiote-template-region-end -->

See [LICENSE][x-repo-license].

<!-- symbiote-template-region-start 9 -->

## Contributing and Support

Consider contributing to upstream
[semantic-release][x-badge-semanticrelease-image] instead.

<!-- symbiote-template-region-end -->
<!-- symbiote-template-region-start 10 -->

### Contributors

<!-- symbiote-template-region-end -->
<!-- symbiote-template-region-start root-package-only -->
<!-- remark-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- remark-ignore-end -->

Thanks goes to these wonderful people ([emoji
key][x-repo-all-contributors-emojis]):

<!-- remark-ignore-start -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://xunn.io/"><img src="https://avatars.githubusercontent.com/u/656017?v=4?s=100" width="100px;" alt="Bernard"/><br /><sub><b>Bernard</b></sub></a><br /><a href="#infra-Xunnamius" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Xunnamius/xrelease/commits?author=Xunnamius" title="Code">💻</a> <a href="https://github.com/Xunnamius/xrelease/commits?author=Xunnamius" title="Documentation">📖</a> <a href="#maintenance-Xunnamius" title="Maintenance">🚧</a> <a href="https://github.com/Xunnamius/xrelease/commits?author=Xunnamius" title="Tests">⚠️</a> <a href="https://github.com/Xunnamius/xrelease/pulls?q=is%3Apr+reviewed-by%3AXunnamius" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- remark-ignore-end -->

This project follows the [all-contributors][x-repo-all-contributors]
specification. Contributions of any kind welcome!

<!-- symbiote-template-region-end -->
<!-- symbiote-template-region-start workspace-package-only -->
<!-- (section elided by symbiote) -->
<!-- symbiote-template-region-end -->

[x-badge-blm-image]: https://xunn.at/badge-blm 'Join the movement!'
[x-badge-blm-link]: https://xunn.at/donate-blm
[x-badge-codecov-image]:
  https://img.shields.io/codecov/c/github/Xunnamius/xrelease/main?style=flat-square&token=HWRIOBAAPW&flag=package.main_root
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/xrelease
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/@-xun/release?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-downloads-link]: https://npmtrends.com/@-xun/release
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
[x-badge-npm-link]: https://npm.im/@-xun/release
[x-badge-repo-link]: https://github.com/Xunnamius/xrelease
[x-badge-semanticrelease-image]:
  https://xunn.at/badge-semantic-release
  'This repo practices continuous integration and deployment!'
[x-badge-semanticrelease-link]:
  https://github.com/semantic-release/semantic-release
[x-pkg-dual-package-hazard]:
  https://nodejs.org/api/packages.html#dual-package-hazard
[x-pkg-esm-wine]:
  https://dev.to/jakobjingleheimer/configuring-commonjs-es-modules-for-nodejs-12ed#esm-source-and-distribution
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
[x-repo-license]: ./LICENSE
[x-repo-package-json]: package.json
[1]: https://github.com/semantic-release/github
[2]: https://github.com/Xunnamius/symbiote
[3]:
  https://stackoverflow.com/questions/11514075/what-is-the-difference-between-an-annotated-and-unannotated-tag
[4]: #tagformat
[5]: #branchrangeprefix
[6]: #gitlogoptions
[7]: https://github.com/Xunnamius/xrelease/blob/main/docs/usage/configuration.md
[8]: https://github.com/vercel/turborepo
[9]: https://github.com/babel-utils/babel-plugin-tester
[10]: https://github.com/Xunnamius/unified-utils
[11]: https://github.com/Xunnamius/symbiote/wiki
[12]:
  https://github.com/semantic-release/semantic-release/compare/master...Xunnamius:xrelease:main
[13]: https://git-scm.com/book/en/v2/Git-Basics-Tagging
[14]: https://lodash.com/docs#template
[15]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[16]: https://github.com/Xunnamius/symbiote#renovate
[17]: https://git-scm.com/docs/git-log
[18]: https://git-scm.com/docs/git-log#_options
[19]: https://github.com/semantic-release/commit-analyzer
[20]:
  https://git-scm.com/docs/git-log#Documentation/git-log.txt---ltpathgt82308203
[21]: https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-exclude
[22]:
  https://github.com/Xunnamius/xrelease/blob/main/docs/usage/workflow-configuration.md#range
[23]:
  https://github.com/Xunnamius/xrelease/blob/main/docs/usage/workflow-configuration.md#maintenance-branches
[24]:
  https://github.com/Xunnamius/xrelease/blob/main/docs/usage/configuration.md#branches
[25]: mailto:package-name@x.y.z
[26]: mailto:package@x.y.z
[27]: https://docs.npmjs.com/cli/v9/configuring-npm/package-json#workspaces
[28]:
  https://github.com/semantic-release/semantic-release/blob/master/docs/usage/workflow-configuration.md#channel
[29]:
  https://github.com/semantic-release/semantic-release/blob/master/docs/usage/workflow-configuration.md#pre-release-branches
[30]:
  https://github.com/semantic-release/semantic-release/blob/master/docs/usage/workflow-configuration.md#maintenance-branches
[31]: #support-for-monorepos
