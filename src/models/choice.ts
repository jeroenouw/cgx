export interface Answer {
    files: Object;
    confirm: boolean;
    githubName: string;
    licenses: LicenseValue;
    provider: ProviderValue;
}

export interface Choice {
    name: string;
    value: ChoiceValue | LicenseValue | ProviderValue;
}

export enum ChoiceValue {
    ALL = 'ALL',
    LICENSE = 'LICENSE',
    CODE_OF_CONDUCT = 'CODE_OF_CONDUCT',
    CONTRIBUTING = 'CONTRIBUTING',
    BUG_REPORT = 'BUG_REPORT',
    FEATURE_REQUEST = 'FEATURE_REQUEST',
    PULL_REQUEST_TEMPLATE = 'PULL_REQUEST_TEMPLATE',
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
