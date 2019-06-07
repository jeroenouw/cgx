export interface Answer {
    files: Object;
    confirm: boolean;
    githubName: string;
    licenses: LicenseValue;
    provider: ProviderValue;
}

export interface Choice {
    name: string;
    value: UniversalChoiceValue | 
           GithubChoiceValue | 
           GitlabChoiceValue | 
           LicenseValue | 
           ProviderValue;
}

export enum UniversalChoiceValue {
    ALL = 'ALL',
    LICENSE = 'LICENSE',
    CONTRIBUTING = 'CONTRIBUTING',
}

export enum GithubChoiceValue {
    CODE_OF_CONDUCT = 'CODE_OF_CONDUCT',
    BUG_REPORT = 'BUG_REPORT',
    FEATURE_REQUEST = 'FEATURE_REQUEST',
    PULL_REQUEST_TEMPLATE = 'PULL_REQUEST_TEMPLATE',
}

export enum GitlabChoiceValue {
    BUG = 'BUG',
    CI_TEMPLATE = 'CI_TEMPLATE',
    FEATURE_PROPOSAL = 'FEATURE_PROPOSAL',
    MERGE_REQUEST_TEMPLATE = 'MERGE_REQUEST_TEMPLATE',
}

export enum LicenseValue {
    MIT = 'MIT',
    APACHE = 'APACHE',
    ISC = 'ISC',
}

export enum ProviderValue {
    GITHUB = 'Github',
    GITLAB = 'Gitlab'
}
