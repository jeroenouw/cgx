import inquirer from 'inquirer';

import { Answer, LicenseValue, Choice } from '../models/choice';

export async function licenseQuestion(): Promise<Answer> {
    const listOfLicenses: Choice[] = [
        {name: 'Apache 2.0 License', value: LicenseValue.APACHE},
        {name: 'MIT License', value: LicenseValue.MIT},
        {name: 'ISC License', value: LicenseValue.ISC},
    ];

    return inquirer.prompt([{ 
        name: 'licenses',
        type: 'list',
        message: 'Which type of license do you want to generate?',
        choices: listOfLicenses
    }]);
}