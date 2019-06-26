import { injectable, inject } from 'inversify';
import { DefaultTemplate } from '../default/default.template';
import { GithubPath } from '../../models/path';
import { FileName } from '../../models/file';

@injectable()
export class FeatureRequest {
    private fileName = FileName.FEATURE_REQUEST;
    private hasPath = true;
    private pathOfFile = GithubPath.ISSUE_TEMPLATE;

    constructor(@inject('DefaultTemplate') private defaultTemplate: DefaultTemplate) {}

    public generateFile(): void {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent(), this.hasPath, this.pathOfFile);
    }

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
