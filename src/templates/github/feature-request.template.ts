import { GithubPath } from '../../models/path';
import { FileName } from '../../models/file';
import { defaultTemplate } from '../default/default.template';

export function featureRequest() {
    const fileName = FileName.FEATURE_REQUEST;
    const hasPath = true;
    const filePath = GithubPath.ISSUE_TEMPLATE;

    const fileContent = (): string => {
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

    return defaultTemplate(fileName, fileContent(), hasPath, filePath);
}
