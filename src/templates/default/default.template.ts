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

        this.checkIfDirExist(hasPath, pathOfFile);

        const fileExists = this.checker.checkExistence(`${pathOfFile}/${nameOfFileWithExtension}`)
        if (!fileExists) {
            this.createFile(pathOfFile, nameOfFileWithExtension, fileContent);
        } else {
            this.overwriteOrFileAlreadyExists(pathOfFile, nameOfFileWithExtension, fileContent);
        }
    };

    private checkIfDirExist(hasPath: boolean, pathOfFile: string): void {
        if (hasPath) {
            this.checker.checkIfDirExist(pathOfFile);
        }
    }

    private createFile(pathOfFile: string, fileName: string, fileContent: string, fileExists = false): void {
        const filepath: string = process.cwd() + `${pathOfFile}/${fileName}`;
        fs.writeFile(filepath, fileContent, (error: Error) => {
            if (!error && fileExists === false) {
                this.logger.showCreate(fileName, filepath);
            } else if (fileExists === true) {
                this.logger.showUpdate(fileName, filepath);
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

export interface GenerateFile {
    generateFile(nameOfFileWithExtension: string, contentOfFile: string, hasPath: boolean, pathOfFile: string): void;
}