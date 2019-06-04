export interface Answer {
    files: Object;
    confirm: boolean;
    githubName: string;
}

export interface Choice {
    name: string;
    value: ChoiceValue;
}

export enum ChoiceValue {
    ALL = 'ALL',
    LICENSE = 'LICENSE',
    CODE_OF_CONDUCT = 'CODE_OF_CONDUCT',
    CONTRIBUTING = 'CONTRIBUTING',
    BUG_REPORT = 'BUG_REPORT',
    FEATURE_REQUEST = 'FEATURE_REQUEST',
    PULL_REQUEST_TEMPLATE = 'PULL_REQUEST_TEMPLATE',
}
