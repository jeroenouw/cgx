import fs from 'fs-extra';
import inquirer from 'inquirer';

import { injectable, inject } from 'inversify';
import { Logger } from '../utils/logger';
import { Checker } from '../utils/checker';
import { Answer } from '../models/choice';

@injectable()
export class License {
    constructor(@inject('Logger') private logger: Logger,
                @inject('Checker') private checker: Checker) {}

    public async generateLicense(): Promise<void> {
        this.logger.showInfo('Start generating LICENSE...');
        let check = this.checker.checkExistence(`/LICENSE`)

        if (!check) {
            const filepath: string = process.cwd() + `/LICENSE`;
            let githubNameAnswer: Answer = await this.githubNameQuestion();
            let fileContent: string = this.fileContent(githubNameAnswer.githubName);

            fs.writeFile(filepath, fileContent, (err) => {
                this.logger.showGenerated('LICENSE', filepath);
                if (err) throw err;
            });
        }
        else {
            this.logger.showError('LICENSE already exists!');
            process.exit(1);
        }
    }

    private githubNameQuestion(): Promise<any> {
        return inquirer.prompt([{
            name: 'githubName',
            type: 'input',
            message: 'Please fill in your Github name',
        }]);
    }

    private fileContent(githubName: string): string {
        let currentYear = new Date().getFullYear();
        
        return `MIT License

Copyright (c) ${currentYear} ${githubName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
        `;
    }
}
