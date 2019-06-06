import fs from 'fs-extra';

import { injectable, inject } from 'inversify';
import { Logger } from '../../utils/logger';
import { Checker } from '../../utils/checker';

@injectable()
export class DefaultTemplate {

    constructor(@inject('Logger') private logger: Logger,
                @inject('Checker') private checker: Checker) {}

    public generateFile(nameOfFileWithExtension: string, fileContent: string, hasPath = false, pathOfFile = ''): void {
        let fileName = nameOfFileWithExtension;
        this.logger.showStartGenerating(fileName);

        this.checkIfDirExist(hasPath, pathOfFile);

        const check = this.checker.checkExistence(`${pathOfFile}/${fileName}`)
        if (!check) {
            this.createFile(pathOfFile, fileName, fileContent);
        }
        else {
            this.fileAlreadyExist(fileName);
        }
    };

    private checkIfDirExist(hasPath: boolean, pathOfFile: string) {
        if (hasPath) {
            this.checker.checkIfDirExist(pathOfFile);
        }
    }

    private createFile(pathOfFile: string, fileName: string, fileContent: string) {
        const filepath: string = process.cwd() + `${pathOfFile}/${fileName}`;
        fs.writeFile(filepath, fileContent, (err) => {
            this.logger.showCreated(fileName, filepath);
            if (err)
                throw err;
        });
    }

    private fileAlreadyExist(fileName: string) {
        this.logger.showError(`${fileName} already exists!`);
        process.exit(1);
    }
}

export interface GenerateFile {
    generateFile(nameOfFileWithExtension: string, contentOfFile: string, hasPath: boolean, pathOfFile: string): void;
}