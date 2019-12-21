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

    public generateFile(fileNameWithExt: string, fileContent: string, hasPath = false, filePath = ''): void {
        this.logger.showGenerate(fileNameWithExt);

        this.checkIfDirExistElseMakeDir(hasPath, filePath);

        let fileExists = this.checker.checkExistence(`${filePath}/${fileNameWithExt}`)
        if (!fileExists) {
            this.createFile(filePath, fileNameWithExt, fileContent);
        } else {
            this.overwriteFileOrThrowError(filePath, fileNameWithExt, fileContent);
        }
    };

    private checkIfDirExistElseMakeDir(hasPath: boolean, pathOfFile: string): void {
        if (hasPath) {
            this.checker.checkIfDirExistElseMakeDir(pathOfFile);
        }
    }

    private createFile(filePath: string, fileName: string, fileContent: string, fileAlreadyExists = false): void {
        let filepath: string = process.cwd() + `${filePath}/${fileName}`;
        fs.writeFile(filepath, fileContent, (error: Error) => {
            if (!error && fileAlreadyExists === false) {
                this.logger.showCreate(fileName, filePath);
            } else if (!error && fileAlreadyExists === true) {
                this.logger.showUpdate(fileName, filePath);
            } else {
                this.logger.showError(error);
            }
        });
    }

    private async overwriteFileOrThrowError(filePath: string, fileNameWithExt: string, fileContent: string) {
        let overwriteAnswer: Answer = await overwriteFileQuestion();

        if (overwriteAnswer.overwrite === true) {
            this.createFile(filePath, fileNameWithExt, fileContent, true);
        } else {
            this.fileAlreadyExist(fileNameWithExt);
        }
    }

    private fileAlreadyExist(fileName: string): void {
        this.logger.showError(`${fileName} already exists!`);
        process.exit(1);
    }
}
