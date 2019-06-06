import inquirer from 'inquirer';

import { injectable, inject } from 'inversify';
import { Logger } from './utils/logger';
import { CodeOfConduct } from './options/code-of-conduct';
import { License } from './options/license';
import { Choice, ChoiceValue, Answer } from './models/choice';
import { Contributing } from './options/contributing';
import { BugReport } from './options/bug-report';
import { FeatureRequest } from './options/feature-request';
import { PullRequestTemplate } from './options/pull-request-template';
import { DefaultTemplate } from './options/default/default.template';

@injectable()
export class CGX {

    constructor(@inject('Logger') private logger: Logger,
                @inject('CodeOfConduct') private codeOfConduct: CodeOfConduct,
                @inject('License') private license: License,
                @inject('Contributing') private contributing: Contributing,
                @inject('BugReport') private bugReport: BugReport,
                @inject('FeatureRequest') private featureRequest: FeatureRequest,
                @inject('PullRequestTemplate') private pullRequestTemplate: PullRequestTemplate,
                @inject('DefaultTemplate') private defaultTemplate: DefaultTemplate) {
        this.logger.showBanner();
        this.executeCGX();
    }

    public async executeCGX(): Promise<any> {
        let askFileAnswer: Answer = await this.askFileQuestion();

        switch(askFileAnswer.files) {
            case ChoiceValue.ALL: {
                this.logger.showInfo('Start generating all recommended files...');

                this.codeOfConduct.generateFile();
                this.contributing.generateFile();
                this.bugReport.generateFile();
                this.featureRequest.generateFile();
                return this.pullRequestTemplate.generateFile();
            }
            case ChoiceValue.LICENSE: {
                return this.license.generateLicense();
            }
            case ChoiceValue.CODE_OF_CONDUCT: {
                return this.codeOfConduct.generateFile();
            }
            case ChoiceValue.CONTRIBUTING: {
                return this.contributing.generateFile();
            }
            case ChoiceValue.BUG_REPORT: {
                return this.bugReport.generateFile();
            }
            case ChoiceValue.FEATURE_REQUEST: {
                return this.featureRequest.generateFile();
            }
            case ChoiceValue.PULL_REQUEST_TEMPLATE: {
                return this.pullRequestTemplate.generateFile();
            }
        }
    }

    private async askFileQuestion(): Promise<any> {
        const listOfFiles: Choice[] = [
            {name: 'All files (without license)', value: ChoiceValue.ALL},
            {name: 'License', value: ChoiceValue.LICENSE},
            {name: 'Code of conduct', value: ChoiceValue.CODE_OF_CONDUCT},
            {name: 'Contributing', value: ChoiceValue.CONTRIBUTING},
            {name: 'Bug report (issue)', value: ChoiceValue.BUG_REPORT},
            {name: 'Feature request (issue)', value: ChoiceValue.FEATURE_REQUEST},
            {name: 'Pull request template', value: ChoiceValue.PULL_REQUEST_TEMPLATE},
        ];

        return inquirer.prompt([{ 
            name: 'files',
            type: 'list',
            message: 'Which files do you want to generate?',
            choices: listOfFiles
        }]);
    }
}