import inquirer from 'inquirer';

import { injectable, inject } from 'inversify';
import { Logger } from './utils/logger';
import { CodeOfConduct } from './options/github/code-of-conduct';
import { License } from './options/github/license';
import { Choice, ChoiceValue, Answer, ProviderValue } from './models/choice';
import { Contributing } from './options/github/contributing';
import { BugReport } from './options/github/bug-report';
import { FeatureRequest } from './options/github/feature-request';
import { PullRequestTemplate } from './options/github/pull-request-template';
import { MergeRequestTemplate } from './options/gitlab/merge-request-template';

@injectable()
export class CGX {

    constructor(@inject('Logger') private logger: Logger,
                @inject('CodeOfConduct') private codeOfConduct: CodeOfConduct,
                @inject('License') private license: License,
                @inject('Contributing') private contributing: Contributing,
                @inject('BugReport') private bugReport: BugReport,
                @inject('FeatureRequest') private featureRequest: FeatureRequest,
                @inject('PullRequestTemplate') private pullRequestTemplate: PullRequestTemplate,
                @inject('MergeRequestTemplate') private mergeRequestTemplate: MergeRequestTemplate) {
        this.logger.showBanner();
        this.executeCGX();
    }

    public async executeCGX(): Promise<any> {
        let providerAnswer: Answer = await this.providerQuestion();

        if (providerAnswer.provider === ProviderValue.GITHUB) {
            let githubFileAnswer: Answer = await this.githubFileQuestion();

            switch(githubFileAnswer.files) {
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
        } else if (providerAnswer.provider === ProviderValue.GITLAB)  {
            let gitlabFileAnswer: Answer = await this.gitlabFileQuestion();

            switch(gitlabFileAnswer.files) {
                case ChoiceValue.MERGE_REQUEST_TEMPLATE: {
                    return this.mergeRequestTemplate.generateFile();
                }
            }
        }
    }

    private async providerQuestion(): Promise<Answer> {
        const listOfFiles: Choice[] = [
            {name: 'Github', value: ProviderValue.GITHUB},
            {name: 'Gitlab', value: ProviderValue.GITLAB},
        ];

        return inquirer.prompt([{ 
            name: 'provider',
            type: 'list',
            message: 'Select a Git hosting provider:',
            choices: listOfFiles
        }]);
    }

    private async githubFileQuestion(): Promise<Answer> {
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

    private async gitlabFileQuestion(): Promise<Answer> {
        const listOfFiles: Choice[] = [
            {name: 'Merge request template', value: ChoiceValue.MERGE_REQUEST_TEMPLATE},
        ];

        return inquirer.prompt([{ 
            name: 'files',
            type: 'list',
            message: 'Which files do you want to generate?',
            choices: listOfFiles
        }]);
    }
}