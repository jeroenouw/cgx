import { injectable, inject } from 'inversify';
import { Logger } from '../utils/logger.util';
import { CodeOfConduct, Contributing, License, ToDo, Readme, Changelog } from '../templates/universal';
import { BugReport, FeatureRequest, PullRequest, Security } from '../templates/github';
import { UniversalChoiceValue, GithubChoiceValue, Answer } from '../models/choice';
import { githubFileQuestion } from '../questions';
import { ConsoleMessage } from '../models/console-message';

@injectable()
export class GithubActions {

    constructor(@inject('Logger') private logger: Logger,
                @inject('CodeOfConduct') private codeOfConduct: CodeOfConduct,
                @inject('License') private license: License,
                @inject('Contributing') private contributing: Contributing,
                @inject('BugReport') private bugReport: BugReport,
                @inject('FeatureRequest') private featureRequest: FeatureRequest,
                @inject('PullRequest') private pullRequest: PullRequest,
                @inject('ToDo') private todo: ToDo,
                @inject('Security') private security: Security,
                @inject('Readme') private readme: Readme,
                @inject('Changelog') private changelog: Changelog) {}

    async runActions(): Promise<any> {
        let githubFileAnswer: Answer = await githubFileQuestion();
    
        switch (githubFileAnswer.files) {
            case UniversalChoiceValue.ALL: {
                this.logger.showInfo(ConsoleMessage.START_GENERATING);
    
                this.codeOfConduct.generateFile();
                this.contributing.generateFile();
                this.bugReport.generateFile();
                this.featureRequest.generateFile();
                return this.pullRequest.generateFile();
            }
            case UniversalChoiceValue.LICENSE: {
                return this.license.generateLicense();
            }
            case UniversalChoiceValue.CHANGELOG: {
                return this.changelog.generateFile();
            }
            case UniversalChoiceValue.CONTRIBUTING: {
                return this.contributing.generateFile();
            }
            case UniversalChoiceValue.CODE_OF_CONDUCT: {
                return this.codeOfConduct.generateFile();
            }
            case UniversalChoiceValue.TODO: {
                return this.todo.generateFile();
            }
            case UniversalChoiceValue.README: {
                return this.readme.generateFile();
            }
            case GithubChoiceValue.SECURITY: {
                return this.security.generateFile();
            }
            case GithubChoiceValue.BUG_REPORT: {
                return this.bugReport.generateFile();
            }
            case GithubChoiceValue.FEATURE_REQUEST: {
                return this.featureRequest.generateFile();
            }
            case GithubChoiceValue.PULL_REQUEST: {
                return this.pullRequest.generateFile();
            }
        }
    }
}