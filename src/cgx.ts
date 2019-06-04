import inquirer from 'inquirer';

import { injectable, inject } from 'inversify';
import { Logger } from './utils/logger';
import { CodeOfConduct } from './options/code-of-conduct';
import { License } from './options/license';
import { Choice, ChoiceValue, Answer } from './models/choice';

@injectable()
export class CGX {

    constructor(@inject('Logger') private logger: Logger,
                @inject('CodeOfConduct') private codeOfConduct: CodeOfConduct,
                @inject('License') private license: License) {
        this.logger.showBanner();
        this.executeCGX();
    }

    public async executeCGX(): Promise<void> {
        let askFileAnswer: Answer = await this.askFileQuestion();
        let confirmAnswer: Answer = await this.confirmQuestion();

        if (confirmAnswer.confirm === true) {
            if (askFileAnswer.files === ChoiceValue.ALL) {
                this.logger.showInfo('Start generating all recommended files...');

                this.codeOfConduct.generateCodeOfConduct();
                this.license.generateLicense();
            }

            if (askFileAnswer.files === ChoiceValue.CODE_OF_CONDUCT) {
                this.codeOfConduct.generateCodeOfConduct();
            }
        
            if (askFileAnswer.files === ChoiceValue.LICENSE) {
                this.license.generateLicense();
            }
        } else {
            this.logger.showInfo('Not confirmed...');
        }
    }

    private async askFileQuestion(): Promise<any> {
        const listOfFiles: Choice[] = [
            {name: 'License', value: ChoiceValue.LICENSE},
            {name: 'Code of conduct', value: ChoiceValue.CODE_OF_CONDUCT},
            {name: 'Coming soon - All files', value: ChoiceValue.ALL},
            {name: 'Coming soon - Contributing', value: ChoiceValue.CONTRIBUTING},
            {name: 'Coming soon - Bug report (issue)', value: ChoiceValue.BUG_REPORT},
            {name: 'Coming soon - Feature request (issue)', value: ChoiceValue.FEATURE_REQUEST},
            {name: 'Coming soon - Pull request template', value: ChoiceValue.PULL_REQUEST_TEMPLATE},
        ];

        return inquirer.prompt([{ 
            name: 'files',
            type: 'list',
            message: 'Select which files do you want to generate?',
            choices: listOfFiles
        }]);
    }

    private confirmQuestion(): Promise<any> {
        return inquirer.prompt([{
            name: 'confirm',
            type: 'confirm',
            message: 'Please confirm?',
            default: false
        }]);
    }
}