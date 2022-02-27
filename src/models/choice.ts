export interface Answer {
    files: Object;
    provider: ProviderValue;
    userName: string;
    licenses?: LicenseValue;
    overwrite?: boolean;
}

export interface Choice {
    name: string;
    value: UniversalChoiceValue | 
           GithubChoiceValue | 
           GitlabChoiceValue | 
           CodecommitChoiceValue | 
           LicenseValue | 
           ProviderValue;
}

export enum UniversalChoiceValue {
    ALL = 'ALL',
    LICENSE = 'LICENSE',
    CONTRIBUTING = 'CONTRIBUTING',
    CODE_OF_CONDUCT = 'CODE_OF_CONDUCT',
    TODO = 'TODO',
    README = 'README',
    CHANGELOG = 'CHANGELOG',
    DOCKERFILE = 'DOCKERFILE',
}

export enum GithubChoiceValue {
    BUG_REPORT = 'BUG_REPORT',
    FEATURE_REQUEST = 'FEATURE_REQUEST',
    PULL_REQUEST = 'PULL_REQUEST',
    SECURITY = 'SECURITY',
    CODEQL_ANALYSIS = 'CODEQL_ANALYSIS',
    NODE_CI = 'NODE_CI',
}

export enum GitlabChoiceValue {
    BUG = 'BUG',
    CI = 'CI',
    FEATURE_PROPOSAL = 'FEATURE_PROPOSAL',
    MERGE_REQUEST = 'MERGE_REQUEST',
}

export enum CodecommitChoiceValue {
    APPSPEC = 'APPSPEC',
    BUILDSPEC = 'BUILDSPEC',
}

export enum LicenseValue {
    MIT = 'MIT',
    APACHE = 'APACHE',
    ISC = 'ISC',
    BSD2 = 'BSD2',
    GPL3 = 'GPL3',
    CCO1 = 'CCO1',
}

export enum ProviderValue {
    GITHUB = 'Github',
    GITLAB = 'Gitlab',
    CODECOMMIT = 'CodeCommit',
    BITBUCKET = 'Bitbucket',
}
