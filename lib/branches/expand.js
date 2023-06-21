import { isString, mapValues, omit, remove, template } from "lodash-es";
import micromatch from "micromatch";
import { getBranches } from "../git.js";

export default async (repositoryUrl, { cwd, options }, branches) => {
  const branchRangePrefix = options && options.branchRangePrefix;
  const gitBranches = await getBranches(repositoryUrl, { cwd });

  return branches.reduce(
    (branches, branch) => [
      ...branches,
      ...remove(gitBranches, (name) => micromatch(gitBranches, branch.name).includes(name)).map((name) => ({
        name,
        ...(branchRangePrefix && name.startsWith(branchRangePrefix)
          ? { range: name.replace(branchRangePrefix, "") }
          : {}),
        ...mapValues(omit(branch, "name"), (value) => (isString(value) ? template(value)({ name }) : value)),
      })),
    ],
    []
  );
};
