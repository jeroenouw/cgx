import { injectable, inject } from 'inversify';
import { Logger } from './utils/logger.util';
import { CodeOfConduct, Contributing, License } from './templates/universal';
import { BugReport, FeatureRequest, PullRequest } from './templates/github';
import { UniversalChoiceValue, GithubChoiceValue, GitlabChoiceValue, Answer, ProviderValue } from './models/choice';
import { Bug, CITemplate, FeatureProposal, MergeRequest } from './templates/gitlab';
import { providerQuestion, githubFileQuestion, gitlabFileQuestion, bitbucketFileQuestion } from './questions';

@injectable()
export class CGX {

    constructor(@inject('Logger') private logger: Logger,
                @inject('CodeOfConduct') private codeOfConduct: CodeOfConduct,
                @inject('License') private license: License,
                @inject('Contributing') private contributing: Contributing,
                @inject('BugReport') private bugReport: BugReport,
                @inject('FeatureRequest') private featureRequest: FeatureRequest,
                @inject('PullRequest') private pullRequest: PullRequest,
                @inject('MergeRequest') private mergeRequest: MergeRequest,
                @inject('Bug') private bug: Bug,
                @inject('FeatureProposal') private featureProposal: FeatureProposal,
                @inject('CITemplate') private ciTemplate: CITemplate) {
        this.logger.showTitleAndBanner();
        this.executeCGX();
    }

    public async executeCGX(): Promise<any> {
        let providerAnswer: Answer = await providerQuestion();

        if (providerAnswer.provider === ProviderValue.GITHUB) {
            return this.githubActions();
        } else if (providerAnswer.provider === ProviderValue.GITLAB)  {
            return this.gitlabActions();
        } else if (providerAnswer.provider === ProviderValue.BITBUCKET)  {
            return this.bitbucketActions();
        }
    }

    private async githubActions() {
        let githubFileAnswer: Answer = await githubFileQuestion();

        switch (githubFileAnswer.files) {
            case UniversalChoiceValue.ALL: {
                this.logger.showInfo('Start generating all the recommended Github files...');

                this.codeOfConduct.generateFile();
                this.contributing.generateFile();
                this.bugReport.generateFile();
                this.featureRequest.generateFile();
                return this.pullRequest.generateFile();
            }
            case UniversalChoiceValue.LICENSE: {
                return this.license.generateLicense();
            }
            case UniversalChoiceValue.CONTRIBUTING: {
                return this.contributing.generateFile();
            }
            case UniversalChoiceValue.CODE_OF_CONDUCT: {
                return this.codeOfConduct.generateFile();
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

    private async gitlabActions() {
        let gitlabFileAnswer: Answer = await gitlabFileQuestion();
        
        switch (gitlabFileAnswer.files) {
            case UniversalChoiceValue.ALL: {
                this.logger.showInfo('Start generating all the recommended Gitlab files...');

                this.contributing.generateFile();
                this.codeOfConduct.generateFile();
                this.ciTemplate.generateFile();
                this.bug.generateFile();
                this.featureProposal.generateFile();
                return this.mergeRequest.generateFile();
            }
            case UniversalChoiceValue.LICENSE: {
                return this.license.generateLicense();
            }
            case UniversalChoiceValue.CONTRIBUTING: {
                return this.contributing.generateFile();
            }
            case UniversalChoiceValue.CODE_OF_CONDUCT: {
                return this.codeOfConduct.generateFile();
            }
            case GitlabChoiceValue.CI: {
                return this.ciTemplate.generateFile();
            }
            case GitlabChoiceValue.BUG: {
                return this.bug.generateFile();
            }
            case GitlabChoiceValue.FEATURE_PROPOSAL: {
                return this.featureProposal.generateFile();
            }
            case GitlabChoiceValue.MERGE_REQUEST: {
                return this.mergeRequest.generateFile();
            }
        }
    }

    private async bitbucketActions() {
        let bitbucketFileAnswer: Answer = await bitbucketFileQuestion();

        switch (bitbucketFileAnswer.files) {
            case UniversalChoiceValue.ALL: {
                this.logger.showInfo('Start generating all the recommended Bitbucket files...');

                this.contributing.generateFile();
                return this.codeOfConduct.generateFile();
            }
            case UniversalChoiceValue.LICENSE: {
                return this.license.generateLicense();
            }
            case UniversalChoiceValue.CONTRIBUTING: {
                return this.contributing.generateFile();
            }
            case UniversalChoiceValue.CODE_OF_CONDUCT: {
                return this.codeOfConduct.generateFile();
            }
        }
    }
}