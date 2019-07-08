import fs from 'fs-extra';

import { injectable, inject } from 'inversify';
import { Logger } from '../../utils/logger.util';
import { Checker } from '../../utils/checker.util';
import { overwriteFileQuestion } from '../../questions';
import { Answer } from '../../models/choice';

@injectable()
export class DefaultTemplate {

    constructor(@inject('Logger') private logger: Logger,
                @inject('Checker') private checker: Checker) {}

    public generateFile(nameOfFileWithExtension: string, fileContent: string, hasPath = false, pathOfFile = ''): void {
        this.logger.showGenerate(nameOfFileWithExtension);

        this.checkIfDirExistElseMakeDir(hasPath, pathOfFile);

        let fileExists = this.checker.checkExistence(`${pathOfFile}/${nameOfFileWithExtension}`)
        if (!fileExists) {
            this.createFile(pathOfFile, nameOfFileWithExtension, fileContent);
        } else {
            this.overwriteOrFileAlreadyExists(pathOfFile, nameOfFileWithExtension, fileContent);
        }
    };

    private checkIfDirExistElseMakeDir(hasPath: boolean, pathOfFile: string): void {
        if (hasPath) {
            this.checker.checkIfDirExistElseMakeDir(pathOfFile);
        }
    }

    private createFile(pathOfFile: string, fileName: string, fileContent: string, fileExists = false): void {
        let filepath: string = process.cwd() + `${pathOfFile}/${fileName}`;
        fs.writeFile(filepath, fileContent, (error: Error) => {
            if (!error && fileExists === false) {
                this.logger.showCreate(fileName, pathOfFile);
            } else if (!error && fileExists === true) {
                this.logger.showUpdate(fileName, pathOfFile);
            } else {
                this.logger.showError(error);
            }
        });
    }

    private async overwriteOrFileAlreadyExists(pathOfFile: string, nameOfFileWithExtension: string, fileContent: string) {
        let overwriteAnswer: Answer = await overwriteFileQuestion();

        if (overwriteAnswer.overwrite === true) {
            this.createFile(pathOfFile, nameOfFileWithExtension, fileContent, true);
        } else {
            this.fileAlreadyExist(nameOfFileWithExtension);
        }
    }

    private fileAlreadyExist(fileName: string): void {
        this.logger.showError(`${fileName} already exists!`);
        process.exit(1);
    }
}
