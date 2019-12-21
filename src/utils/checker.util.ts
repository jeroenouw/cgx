import fs from 'fs';

import { injectable, inject } from 'inversify';
import { Logger } from './logger.util';

@injectable()
export class Checker {

    constructor(@inject('Logger') private logger: Logger) {}

    public checkExistence(path: string): boolean {
        return fs.existsSync(process.cwd() + path);
    };

    public checkIfDirExistElseMakeDir(path: string): void {
        let dir = this.checkExistence(path);
        if (!dir) {
            fs.mkdirSync(process.cwd() + path, { recursive: true });
        }
    }
}