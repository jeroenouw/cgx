import fs from 'fs';

import { injectable } from 'inversify';

@injectable()
export class Checker {
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