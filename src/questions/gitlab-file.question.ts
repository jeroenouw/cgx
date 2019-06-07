import inquirer from 'inquirer';

import { Answer, UniversalChoiceValue, GitlabChoiceValue, Choice } from '../models/choice';

export async function gitlabFileQuestion(): Promise<Answer> {
    const listOfFiles: Choice[] = [
        {name: 'All files (without license)', value: UniversalChoiceValue.ALL},
        {name: 'License', value: UniversalChoiceValue.LICENSE},
        {name: 'Contributing', value: UniversalChoiceValue.CONTRIBUTING},
        {name: 'CI template', value: GitlabChoiceValue.CI_TEMPLATE},
        {name: 'Bug (issue)', value: GitlabChoiceValue.BUG},
        {name: 'Feature proposal (issue)', value: GitlabChoiceValue.FEATURE_PROPOSAL},
        {name: 'Merge request template', value: GitlabChoiceValue.MERGE_REQUEST_TEMPLATE},
    ];

    return inquirer.prompt([{ 
        name: 'files',
        type: 'list',
        message: 'Which files do you want to generate?',
        choices: listOfFiles
    }]);
}