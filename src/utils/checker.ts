import fs from 'fs';

import { injectable, inject } from 'inversify';
import { Logger } from './logger';

@injectable()
export class Checker {

    constructor(@inject('Logger') private logger: Logger) {}

    public checkName(name: string | boolean): void {
        if (name === true) {
            this.logger.showError('Invalid command: No name found after the command');
            process.exit(1);
        }
    };

    public checkExistence(path: string): boolean {
        const check = fs.existsSync(process.cwd() + path)
        return check;
    };

    public checkIfDirExist(path: string): void {
        const folder = this.checkExistence(path)
        if (!folder) {
            fs.mkdirSync(process.cwd() + path, { recursive: true });
        }
    }
}