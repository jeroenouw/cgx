import fs from 'fs-extra';

import { showGenerate, showCreate, showUpdate, showError } from '../../utils/logger.util';
import { checkIfDirExistElseMakeDir, checkExistence, fileAlreadyExist } from '../../utils/checker.util';
import { overwriteFileQuestion } from '../../questions';
import { Answer } from '../../models/choice';

export function defaultTemplate(fileNameWithExt: string, fileContent: string, hasPath = false, filePath = ''): void {
    showGenerate(fileNameWithExt);
    checkIfDirExistElseMakeDir(hasPath, filePath);

    let fileExists = checkExistence(`${filePath}/${fileNameWithExt}`)
    if (!fileExists) {
        createFile(filePath, fileNameWithExt, fileContent);
    } else {
        overwriteFileOrThrowError(filePath, fileNameWithExt, fileContent);
    }
}

function createFile(filePath: string, fileName: string, fileContent: string, fileAlreadyExists = false): void {
    let filepath: string = process.cwd() + `${filePath}/${fileName}`;
    fs.writeFile(filepath, fileContent, (error: Error) => {
        if (!error && fileAlreadyExists === false) {
            showCreate(fileName, filePath);
        } else if (!error && fileAlreadyExists === true) {
            showUpdate(fileName, filePath);
        } else {
            showError(error);
        }
    });
}

async function overwriteFileOrThrowError(filePath: string, fileNameWithExt: string, fileContent: string) {
    let overwriteAnswer: Answer = await overwriteFileQuestion();

    if (overwriteAnswer.overwrite === true) {
        createFile(filePath, fileNameWithExt, fileContent, true);
    } else {
        fileAlreadyExist(fileNameWithExt);
    }
}
