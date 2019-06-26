import inquirer from 'inquirer';

import { Answer, UniversalChoiceValue, GithubChoiceValue, Choice } from '../models/choice';

export async function githubFileQuestion(): Promise<Answer> {
    const listOfFiles: Choice[] = [
        {name: 'All files (without license)', value: UniversalChoiceValue.ALL},
        {name: 'License', value: UniversalChoiceValue.LICENSE},
        {name: 'Contributing', value: UniversalChoiceValue.CONTRIBUTING},
        {name: 'Code of conduct', value: UniversalChoiceValue.CODE_OF_CONDUCT},
        {name: 'Todo', value: UniversalChoiceValue.TODO},
        {name: 'Readme', value: UniversalChoiceValue.README},
        {name: 'Bug report (issue)', value: GithubChoiceValue.BUG_REPORT},
        {name: 'Feature request (issue)', value: GithubChoiceValue.FEATURE_REQUEST},
        {name: 'Pull request', value: GithubChoiceValue.PULL_REQUEST},
    ];

    return inquirer.prompt([{ 
        name: 'files',
        type: 'list',
        message: 'Which Github files do you want to generate?',
        choices: listOfFiles
    }]);
}