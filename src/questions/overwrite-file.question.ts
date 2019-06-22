import inquirer from 'inquirer';

import { Answer } from '../models/choice';

export async function overwriteFileQuestion(): Promise<Answer> {
    return inquirer.prompt([{ 
        name: 'overwrite',
        type: 'confirm',
        message: 'This file already exists. Do you want to overwrite it?',
        default: false
    }]);
}