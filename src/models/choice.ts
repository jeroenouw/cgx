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
}

export enum GithubChoiceValue {
    BUG_REPORT = 'BUG_REPORT',
    FEATURE_REQUEST = 'FEATURE_REQUEST',
    PULL_REQUEST = 'PULL_REQUEST',
    SECURITY = 'SECURITY',
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
}

export enum ProviderValue {
    GITHUB = 'Github',
    GITLAB = 'Gitlab',
    CODECOMMIT = 'CodeCommit',
    BITBUCKET = 'Bitbucket',
}
