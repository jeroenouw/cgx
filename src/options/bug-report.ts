import fs from 'fs-extra';

import { injectable, inject } from 'inversify';
import { Logger } from '../utils/logger';
import { Checker } from '../utils/checker';

@injectable()
export class BugReport {
    constructor(@inject('Logger') private logger: Logger,
                @inject('Checker') private checker: Checker) {}

    public generateBugReport(): void {
        const fileName = 'bug_report.md';
        this.logger.showStartGenerating(fileName);

        this.checker.checkIfDirExist(`/.github/ISSUE_TEMPLATE`);

        const check = this.checker.checkExistence(`/.github/ISSUE_TEMPLATE/${fileName}`)
        if (!check) {
            const filepath: string = process.cwd() + `/.github/ISSUE_TEMPLATE/${fileName}`;
            const fileContent: string = this.fileContent();

            fs.writeFile(filepath, fileContent, (err) => {
                this.logger.showCreated(fileName, filepath);
                if (err) throw err;
            });
        }
        else {
            this.logger.showError(`${fileName} already exists!`);
            process.exit(1);
        }
    };

    private fileContent(): string {
        return `---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
    - OS: [e.g. iOS]
    - Browser [e.g. chrome, safari]
    - Version [e.g. 22]

**Smartphone (please complete the following information):**
    - Device: [e.g. iPhone6]
    - OS: [e.g. iOS8.1]
    - Browser [e.g. stock browser, safari]
    - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
        `;
     }
}
