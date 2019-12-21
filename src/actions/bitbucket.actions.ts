import { injectable, inject } from 'inversify';
import { Logger } from '../utils/logger.util';
import { CodeOfConduct, Contributing, License, ToDo, Readme, Changelog } from '../templates/universal';
import { UniversalChoiceValue,Answer } from '../models/choice';
import { bitbucketFileQuestion } from '../questions';
import { ConsoleMessage } from '../models/console-message';

@injectable()
export class BitbucketActions {

    constructor(@inject('Logger') private logger: Logger,
                @inject('CodeOfConduct') private codeOfConduct: CodeOfConduct,
                @inject('License') private license: License,
                @inject('Contributing') private contributing: Contributing,
                @inject('ToDo') private todo: ToDo,
                @inject('Readme') private readme: Readme,
                @inject('Changelog') private changelog: Changelog) {}

    async runActions(): Promise<any> {  
        let bitbucketFileAnswer: Answer = await bitbucketFileQuestion();

        switch (bitbucketFileAnswer.files) {
            case UniversalChoiceValue.ALL: {
                this.logger.showInfo(ConsoleMessage.START_GENERATING);

                this.contributing.generateFile();
                return this.codeOfConduct.generateFile();
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
        }
    }
}