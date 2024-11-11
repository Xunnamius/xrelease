export function ENOGITREPO({ cwd }: {
    cwd: any;
}): {
    message: string;
    details: string;
};
export function ENOREPOURL(): {
    message: string;
    details: string;
};
export function EGITNOPERMISSION({ options: { repositoryUrl }, branch: { name } }: {
    options: {
        repositoryUrl: any;
    };
    branch: {
        name: any;
    };
}): {
    message: string;
    details: string;
};
export function EINVALIDTAGFORMAT({ options: { tagFormat } }: {
    options: {
        tagFormat: any;
    };
}): {
    message: string;
    details: string;
};
export function ETAGNOVERSION({ options: { tagFormat } }: {
    options: {
        tagFormat: any;
    };
}): {
    message: string;
    details: string;
};
export function EPLUGINCONF({ type, required, pluginConf }: {
    type: any;
    required: any;
    pluginConf: any;
}): {
    message: string;
    details: string;
};
export function EPLUGINSCONF({ plugin }: {
    plugin: any;
}): {
    message: string;
    details: string;
};
export function EPLUGIN({ pluginName, type }: {
    pluginName: any;
    type: any;
}): {
    message: string;
    details: string;
};
export function EANALYZECOMMITSOUTPUT({ result, pluginName }: {
    result: any;
    pluginName: any;
}): {
    message: string;
    details: string;
};
export function EGENERATENOTESOUTPUT({ result, pluginName }: {
    result: any;
    pluginName: any;
}): {
    message: string;
    details: string;
};
export function EPUBLISHOUTPUT({ result, pluginName }: {
    result: any;
    pluginName: any;
}): {
    message: string;
    details: string;
};
export function EADDCHANNELOUTPUT({ result, pluginName }: {
    result: any;
    pluginName: any;
}): {
    message: string;
    details: string;
};
export function EINVALIDBRANCH({ branch }: {
    branch: any;
}): {
    message: string;
    details: string;
};
export function EINVALIDBRANCHNAME({ branch }: {
    branch: any;
}): {
    message: string;
    details: string;
};
export function EDUPLICATEBRANCHES({ duplicates }: {
    duplicates: any;
}): {
    message: string;
    details: string;
};
export function EMAINTENANCEBRANCH({ branch }: {
    branch: any;
}): {
    message: string;
    details: string;
};
export function EMAINTENANCEBRANCHES({ branches }: {
    branches: any;
}): {
    message: string;
    details: string;
};
export function ERELEASEBRANCHES({ branches }: {
    branches: any;
}): {
    message: string;
    details: string;
};
export function EPRERELEASEBRANCH({ branch }: {
    branch: any;
}): {
    message: string;
    details: string;
};
export function EPRERELEASEBRANCHES({ branches }: {
    branches: any;
}): {
    message: string;
    details: string;
};
export function EINVALIDNEXTVERSION({ nextRelease: { version }, branch: { name, range }, commits, validBranches }: {
    nextRelease: {
        version: any;
    };
    branch: {
        name: any;
        range: any;
    };
    commits: any;
    validBranches: any;
}): {
    message: string;
    details: string;
};
export function EINVALIDMAINTENANCEMERGE({ nextRelease: { channel, gitTag, version }, branch: { mergeRange, name } }: {
    nextRelease: {
        channel: any;
        gitTag: any;
        version: any;
    };
    branch: {
        mergeRange: any;
        name: any;
    };
}): {
    message: string;
    details: string;
};
