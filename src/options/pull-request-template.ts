import fs from 'fs-extra';

import { injectable, inject } from 'inversify';
import { Logger } from '../utils/logger';
import { Checker } from '../utils/checker';

@injectable()
export class PullRequestTemplate {
    constructor(@inject('Logger') private logger: Logger,
                @inject('Checker') private checker: Checker) {}

    public generatePullRequestTemplate(): void {
        const fileName = 'pull_request_template.md';
        this.logger.showStartGenerating(fileName);

        this.checker.checkIfDirExist(`/.github/PULL_REQUEST_TEMPLATE`);

        const check = this.checker.checkExistence(`/${fileName}`)
        if (!check) {
            const filepath: string = process.cwd() + `/.github/PULL_REQUEST_TEMPLATE/${fileName}`;
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
        return `* **Please check if the PR fulfills these requirements**
- [ ] The commit message follows our guidelines
- [ ] Tests for the changes have been added (for bug fixes / features)
- [ ] Docs have been added / updated (for bug fixes / features)


* **What kind of change does this PR introduce?** (Bug fix, feature, docs update, ...)



* **What is the current behavior?** (You can also link to an open issue here)



* **What is the new behavior (if this is a feature change)?**



* **Does this PR introduce a breaking change?** (What changes might users need to make in their application due to this PR?)



* **Other information**:
        `;
     }
}
