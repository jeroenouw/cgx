import { injectable, inject } from 'inversify';
import { Logger } from '../utils/logger.util';
import { CodeOfConduct, Contributing, License, ToDo, Readme, Changelog } from '../templates/universal';
import { Appspec, Buildspec } from '../templates/codecommit';
import { UniversalChoiceValue, CodecommitChoiceValue, Answer } from '../models/choice';
import { codecommitFileQuestion } from '../questions';
import { ConsoleMessage } from '../models/console-message';

@injectable()
export class CodecommitActions {

    constructor(@inject('Logger') private logger: Logger,
                @inject('CodeOfConduct') private codeOfConduct: CodeOfConduct,
                @inject('License') private license: License,
                @inject('Contributing') private contributing: Contributing,
                @inject('Appspec') private appspec: Appspec,
                @inject('Buildspec') private buildspec: Buildspec,
                @inject('ToDo') private todo: ToDo,
                @inject('Readme') private readme: Readme,
                @inject('Changelog') private changelog: Changelog) {}

    async runActions(): Promise<any> {
        let codecommitFileAnswer: Answer = await codecommitFileQuestion();
    
        switch (codecommitFileAnswer.files) {
            case UniversalChoiceValue.ALL: {
                this.logger.showInfo(ConsoleMessage.START_GENERATING);
    
                this.codeOfConduct.generateFile();
                this.contributing.generateFile();
                this.appspec.generateFile();
                return this.buildspec.generateFile();
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
            case CodecommitChoiceValue.APPSPEC: {
                return this.appspec.generateFile();
            }
            case CodecommitChoiceValue.BUILDSPEC: {
                return this.buildspec.generateFile();
            }
        }
    }
}