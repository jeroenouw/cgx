import inquirer from 'inquirer';

import { Answer, UniversalChoiceValue, GitlabChoiceValue, Choice } from '../models/choice';

export async function gitlabFileQuestion(): Promise<Answer> {
    const listOfFiles: Choice[] = [
        {name: 'All recommended files (other files can be generated separate)', value: UniversalChoiceValue.ALL},
        {name: 'CI template', value: GitlabChoiceValue.CI},
        {name: 'Bug (issue)', value: GitlabChoiceValue.BUG},
        {name: 'Feature proposal (issue)', value: GitlabChoiceValue.FEATURE_PROPOSAL},
        {name: 'Merge request', value: GitlabChoiceValue.MERGE_REQUEST},
        {name: 'License', value: UniversalChoiceValue.LICENSE},
        {name: 'Changelog', value: UniversalChoiceValue.CHANGELOG},
        {name: 'Contributing', value: UniversalChoiceValue.CONTRIBUTING},
        {name: 'Code of conduct', value: UniversalChoiceValue.CODE_OF_CONDUCT},
        {name: 'Todo', value: UniversalChoiceValue.TODO},
        {name: 'Readme', value: UniversalChoiceValue.README},
        {name: 'Dockerfile', value: UniversalChoiceValue.DOCKERFILE},
    ];

    return inquirer.prompt([{ 
        name: 'files',
        type: 'list',
        message: 'Which Gitlab files do you want to generate?',
        choices: listOfFiles,
    }]);
}