import { injectable, inject } from 'inversify';
import { GenerateFile, DefaultTemplate } from '../default/default.template';
import { GithubPath } from '../../models/path';

@injectable()
export class PullRequest implements GenerateFile {
    private fileName = 'pull_request_template.md';
    private hasPath = true;
    private pathOfFile = GithubPath.PULL_REQUEST_TEMPLATE;

    constructor(@inject('DefaultTemplate') private defaultTemplate: DefaultTemplate) {}

    public generateFile(): void {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent(), this.hasPath, this.pathOfFile);
    }

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
