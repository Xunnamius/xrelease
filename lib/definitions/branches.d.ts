export namespace maintenance {
    function filter({ name, range }: {
        name: any;
        range: any;
    }): boolean;
    function branchValidator({ range }: {
        range: any;
    }): boolean;
    function branchesValidator(branches: any): boolean;
}
export namespace prerelease {
    export function filter_1({ prerelease }: {
        prerelease: any;
    }): boolean;
    export { filter_1 as filter };
    export function branchValidator_1({ name, prerelease }: {
        name: any;
        prerelease: any;
    }): boolean;
    export { branchValidator_1 as branchValidator };
    export function branchesValidator_1(branches: any): boolean;
    export { branchesValidator_1 as branchesValidator };
}
export namespace release {
    export function filter_2(branch: any): boolean;
    export { filter_2 as filter };
    export function branchesValidator_2(branches: any): boolean;
    export { branchesValidator_2 as branchesValidator };
}
