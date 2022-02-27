import fs from 'fs';
import { showError } from './logger.util';

export const checkExistence = (path: string): boolean => {
    return fs.existsSync(process.cwd() + path);
};

export const checkIfDirExistElseMakeDir = (path: string): void => {
    if (path) {
        const dir = checkExistence(path);
        if (!dir) {
            fs.mkdirSync(process.cwd() + path, { recursive: true });
        }
    }
}

export const fileAlreadyExist = (fileName: string): void => {
    showError(`${fileName} already exists!`);
    process.exit(1);
}