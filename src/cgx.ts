import { injectable, inject } from 'inversify';
import { Logger } from './utils/logger';
import { Contributing, License } from './options/universal';
import { CodeOfConduct, BugReport, FeatureRequest, PullRequestTemplate } from './options/github';
import { UniversalChoiceValue, GithubChoiceValue, GitlabChoiceValue, Answer, ProviderValue } from './models/choice';
import { Bug, CITemplate, FeatureProposal, MergeRequestTemplate } from './options/gitlab';
import { providerQuestion, githubFileQuestion, gitlabFileQuestion } from './questions';

@injectable()
export class CGX {

    constructor(@inject('Logger') private logger: Logger,
                @inject('CodeOfConduct') private codeOfConduct: CodeOfConduct,
                @inject('License') private license: License,
                @inject('Contributing') private contributing: Contributing,
                @inject('BugReport') private bugReport: BugReport,
                @inject('FeatureRequest') private featureRequest: FeatureRequest,
                @inject('PullRequestTemplate') private pullRequestTemplate: PullRequestTemplate,
                @inject('MergeRequestTemplate') private mergeRequestTemplate: MergeRequestTemplate,
                @inject('Bug') private bug: Bug,
                @inject('FeatureProposal') private featureProposal: FeatureProposal,
                @inject('CITemplate') private ciTemplate: CITemplate) {
        this.logger.showBanner();
        this.executeCGX();
    }

    public async executeCGX(): Promise<any> {
        let providerAnswer: Answer = await providerQuestion();

        if (providerAnswer.provider === ProviderValue.GITHUB) {
            let githubFileAnswer: Answer = await githubFileQuestion();

            switch(githubFileAnswer.files) {
                case UniversalChoiceValue.ALL: {
                    this.logger.showInfo('Start generating all recommended Github files...');
    
                    this.codeOfConduct.generateFile();
                    this.contributing.generateFile();
                    this.bugReport.generateFile();
                    this.featureRequest.generateFile();
                    return this.pullRequestTemplate.generateFile();
                }
                case UniversalChoiceValue.LICENSE: {
                    return this.license.generateLicense();
                }
                case UniversalChoiceValue.CONTRIBUTING: {
                    return this.contributing.generateFile();
                }
                case GithubChoiceValue.CODE_OF_CONDUCT: {
                    return this.codeOfConduct.generateFile();
                }
                case GithubChoiceValue.BUG_REPORT: {
                    return this.bugReport.generateFile();
                }
                case GithubChoiceValue.FEATURE_REQUEST: {
                    return this.featureRequest.generateFile();
                }
                case GithubChoiceValue.PULL_REQUEST_TEMPLATE: {
                    return this.pullRequestTemplate.generateFile();
                }
            }
        } else if (providerAnswer.provider === ProviderValue.GITLAB)  {
            let gitlabFileAnswer: Answer = await gitlabFileQuestion();

            switch(gitlabFileAnswer.files) {
                case UniversalChoiceValue.ALL: {
                    this.logger.showInfo('Start generating all recommended Gitlab files...');
    
                    this.contributing.generateFile();
                    this.ciTemplate.generateFile();
                    this.bug.generateFile();
                    this.featureProposal.generateFile();
                    return this.mergeRequestTemplate.generateFile();
                }
                case UniversalChoiceValue.LICENSE: {
                    return this.license.generateLicense();
                }
                case UniversalChoiceValue.CONTRIBUTING: {
                    return this.contributing.generateFile();
                }
                case GitlabChoiceValue.CI_TEMPLATE: {
                    return this.ciTemplate.generateFile();
                }
                case GitlabChoiceValue.BUG: {
                    return this.bug.generateFile();
                }
                case GitlabChoiceValue.FEATURE_PROPOSAL: {
                    return this.featureProposal.generateFile();
                }
                case GitlabChoiceValue.MERGE_REQUEST_TEMPLATE: {
                    return this.mergeRequestTemplate.generateFile();
                }
            }
        }
    }
}