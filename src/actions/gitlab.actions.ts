import { injectable, inject } from 'inversify';
import { Logger } from '../utils/logger.util';
import { CodeOfConduct, Contributing, License, ToDo, Readme, Changelog } from '../templates/universal';
import { UniversalChoiceValue, GitlabChoiceValue, Answer } from '../models/choice';
import { Bug, CITemplate, FeatureProposal, MergeRequest } from '../templates/gitlab';
import { gitlabFileQuestion } from '../questions';
import { ConsoleMessage } from '../models/console-message';

@injectable()
export class GitlabActions {

    constructor(@inject('Logger') private logger: Logger,
                @inject('CodeOfConduct') private codeOfConduct: CodeOfConduct,
                @inject('License') private license: License,
                @inject('Contributing') private contributing: Contributing,
                @inject('MergeRequest') private mergeRequest: MergeRequest,
                @inject('Bug') private bug: Bug,
                @inject('FeatureProposal') private featureProposal: FeatureProposal,
                @inject('ToDo') private todo: ToDo,
                @inject('Readme') private readme: Readme,
                @inject('Changelog') private changelog: Changelog,
                @inject('CITemplate') private ciTemplate: CITemplate) {}

    async runActions(): Promise<any> {
        let gitlabFileAnswer: Answer = await gitlabFileQuestion();
        
        switch (gitlabFileAnswer.files) {
            case UniversalChoiceValue.ALL: {
                this.logger.showInfo(ConsoleMessage.START_GENERATING);

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
}