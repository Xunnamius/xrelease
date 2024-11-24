# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## @-xun/release[@24.2.0][3] (2024-11-12)

### ✨ Features

- **lib:** add `branchRangePrefix` option to enable package-specific maintenance branches (for monorepos) ([79efa6d][4])
- **lib:** add `gitLogOptions.paths` and `gitLogOptions.flags` options to filter commits (for monorepos) ([0438653][5])

### 🪄 Fixes

- **lib:** more robust plugin loading (for monorepos) ([dfd29fc][6])

<br />

### 🏗️ Patch @-xun/release[@24.2.1][7] (2024-11-24)

#### ⚙️ Build System

- Fix build script, narrow scope of format script ([9b974c7][8])
- **package:** skip self-test task and codecov coverage upload until tests are demystified ([6a2afa3][9])
- **package:** use correct repository url in metadata ([4d65d90][10])
- **package:** use module over commonjs for package type ([58c71a2][11])
- **package:** use proper release command flags ([a3e0830][12])
- Run build process (generate types) properly ([98da679][13])
- Use semantic-release's hand-crafted index.d.ts file ([dac909c][14])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/xrelease/compare/0438653577485881bf84b604657b234f64e6eda1...@-xun/release@24.2.0
[4]: https://github.com/Xunnamius/xrelease/commit/79efa6dc3ad658e1bfa412867b17b0820623efb2
[5]: https://github.com/Xunnamius/xrelease/commit/0438653577485881bf84b604657b234f64e6eda1
[6]: https://github.com/Xunnamius/xrelease/commit/dfd29fc75499bebf54532d3d359f2a8d6a45d3ae
[7]: https://github.com/Xunnamius/xrelease/compare/@-xun/release@24.2.0...@-xun/release@24.2.1
[8]: https://github.com/Xunnamius/xrelease/commit/9b974c7ab5bddaf0078292203d669137550eeda1
[9]: https://github.com/Xunnamius/xrelease/commit/6a2afa32a4501f20d9c496adde4ee2bddc7f4a90
[10]: https://github.com/Xunnamius/xrelease/commit/4d65d907cea572f3f9315c4a5d95091219c7226c
[11]: https://github.com/Xunnamius/xrelease/commit/58c71a21ca58bf89ae5b0de45e09db46de57030f
[12]: https://github.com/Xunnamius/xrelease/commit/a3e08308469c77cd46dd27d243570025ef191b21
[13]: https://github.com/Xunnamius/xrelease/commit/98da679d439a98c56d547331957f62d906e6e76a
[14]: https://github.com/Xunnamius/xrelease/commit/dac909ca7af99ba82653db290d715b482f51a7b9
