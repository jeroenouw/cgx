import fs from 'fs-extra';

import { injectable, inject } from 'inversify';
import { Logger } from '../utils/logger';
import { Checker } from '../utils/checker';

@injectable()
export class FeatureRequest {
    constructor(@inject('Logger') private logger: Logger,
                @inject('Checker') private checker: Checker) {}

    public generateFeatureRequest(): void {
        const fileName = 'feature_request.md';
        this.logger.showStartGenerating(fileName);

        this.checker.checkIfDirExist(`/.github/ISSUE_TEMPLATE`);

        const check = this.checker.checkExistence(`/${fileName}`)
        if (!check) {
            const filepath: string = process.cwd() + `/.github/ISSUE_TEMPLATE/${fileName}`;
            let fileContent: string = this.fileContent();

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
name: Feature request
about: Suggest an idea for this project
title: ''
labels: ''
assignees: ''

---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
        `;
     }
}
