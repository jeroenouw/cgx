import inquirer from 'inquirer';

import { Answer, LicenseValue, Choice } from '../models/choice';

export async function licenseQuestion(): Promise<Answer> {
    const listOfLicenses: Choice[] = [
        {name: 'MIT License', value: LicenseValue.MIT},
        {name: 'ISC License', value: LicenseValue.ISC},
        {name: 'Apache 2.0 License', value: LicenseValue.APACHE},
        {name: 'BSD 2-Clause License', value: LicenseValue.BSD2},
        {name: 'GPLv3 License', value: LicenseValue.GPL3},
        {name: 'CC0 1.0 License', value: LicenseValue.CCO1},
    ];

    return inquirer.prompt([{ 
        name: 'licenses',
        type: 'list',
        message: 'Which type of license do you want to generate?',
        choices: listOfLicenses,
    }]);
}