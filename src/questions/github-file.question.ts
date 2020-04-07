import inquirer from 'inquirer';

import { Answer, UniversalChoiceValue, GithubChoiceValue, Choice } from '../models/choice';

export async function githubFileQuestion(): Promise<Answer> {
    const listOfFiles: Choice[] = [
        {name: 'All recommended files (other files can be generated separate)', value: UniversalChoiceValue.ALL},
        {name: 'Bug report (issue)', value: GithubChoiceValue.BUG_REPORT},
        {name: 'Security vulnerability report', value: GithubChoiceValue.SECURITY},
        {name: 'Feature request (issue)', value: GithubChoiceValue.FEATURE_REQUEST},
        {name: 'Pull request', value: GithubChoiceValue.PULL_REQUEST},
        {name: 'License', value: UniversalChoiceValue.LICENSE},
        {name: 'Changelog', value: UniversalChoiceValue.CHANGELOG},
        {name: 'Contributing', value: UniversalChoiceValue.CONTRIBUTING},
        {name: 'Code of conduct', value: UniversalChoiceValue.CODE_OF_CONDUCT},
        {name: 'Todo', value: UniversalChoiceValue.TODO},
        {name: 'Readme', value: UniversalChoiceValue.README},
    ];

    return inquirer.prompt([{ 
        name: 'files',
        type: 'list',
        message: 'Which Github files do you want to generate?',
        choices: listOfFiles,
    }]);
}