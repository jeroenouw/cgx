import fs from 'fs-extra';

import { showGenerate, showCreate, showUpdate, showError } from '../../utils/logger.util';
import { checkIfDirExistElseMakeDir, checkExistence, fileAlreadyExist } from '../../utils/checker.util';
import { overwriteFileQuestion } from '../../questions';
import { Answer } from '../../models/choice';

export function defaultTemplate(fileNameWithExt: string, fileContent: string, filePath = ''): void | Promise<void> {
    showGenerate(fileNameWithExt);
    checkIfDirExistElseMakeDir(filePath);

    const fileExists = checkExistence(`${filePath}/${fileNameWithExt}`)

    if (!fileExists) return createFile(filePath, fileNameWithExt, fileContent);
    return overwriteFileOrThrowError(filePath, fileNameWithExt, fileContent);
}

function createFile(filePath: string, fileName: string, fileContent: string, fileAlreadyExists = false): void {
    const filepath: string = process.cwd() + `${filePath}/${fileName}`;
    fs.writeFile(filepath, fileContent, (error: Error) => {
        if (!error && !fileAlreadyExists) return showCreate(fileName, filePath);
        if (!error && fileAlreadyExists) return showUpdate(fileName, filePath);
        return showError(error);
    });
}

async function overwriteFileOrThrowError(filePath: string, fileNameWithExt: string, fileContent: string): Promise<void> {
    const overwriteAnswer: Answer = await overwriteFileQuestion();
    if (overwriteAnswer.overwrite === true) return createFile(filePath, fileNameWithExt, fileContent, true);
    return fileAlreadyExist(fileNameWithExt);
}
