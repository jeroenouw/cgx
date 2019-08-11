import inquirer from 'inquirer';

import { Answer, UniversalChoiceValue, Choice } from '../models/choice';

export async function bitbucketFileQuestion(): Promise<Answer> {
    const listOfFiles: Choice[] = [
        {name: 'All recommended files (other files can be generated separate)', value: UniversalChoiceValue.ALL},
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
        message: 'Which Bitbucket files do you want to generate?',
        choices: listOfFiles
    }]);
}