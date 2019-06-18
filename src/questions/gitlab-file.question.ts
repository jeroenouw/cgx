import inquirer from 'inquirer';

import { Answer, UniversalChoiceValue, GitlabChoiceValue, Choice } from '../models/choice';

export async function gitlabFileQuestion(): Promise<Answer> {
    const listOfFiles: Choice[] = [
        {name: 'All files (without license)', value: UniversalChoiceValue.ALL},
        {name: 'License', value: UniversalChoiceValue.LICENSE},
        {name: 'Contributing', value: UniversalChoiceValue.CONTRIBUTING},
        {name: 'Code of conduct', value: UniversalChoiceValue.CODE_OF_CONDUCT},
        {name: 'CI template', value: GitlabChoiceValue.CI},
        {name: 'Bug (issue)', value: GitlabChoiceValue.BUG},
        {name: 'Feature proposal (issue)', value: GitlabChoiceValue.FEATURE_PROPOSAL},
        {name: 'Merge request', value: GitlabChoiceValue.MERGE_REQUEST},
    ];

    return inquirer.prompt([{ 
        name: 'files',
        type: 'list',
        message: 'Which files do you want to generate?',
        choices: listOfFiles
    }]);
}