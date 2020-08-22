import inquirer from 'inquirer';

import { Answer, UniversalChoiceValue, CodecommitChoiceValue, Choice } from '../models/choice';

export async function codecommitFileQuestion(): Promise<Answer> {
    const listOfFiles: Choice[] = [
        {name: 'All recommended files (other files can be generated separate)', value: UniversalChoiceValue.ALL},
        {name: 'Buildspec (AWS CodeBuild)', value: CodecommitChoiceValue.BUILDSPEC},
        {name: 'Appspec (AWS CodeDeploy)', value: CodecommitChoiceValue.APPSPEC},
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
        message: 'Which CodeCommit files do you want to generate?',
        choices: listOfFiles,
    }]);
}