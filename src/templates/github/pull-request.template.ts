import { GithubPath } from '../../models/path';
import { FileName } from '../../models/file';
import { defaultTemplate } from '../default/default.template';

export function pullRequest() {
    const fileName = FileName.PULL_REQUEST;
    const filePath = GithubPath.PULL_REQUEST_TEMPLATE;

    const fileContent = (): string => {
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

    return defaultTemplate(fileName, fileContent(), filePath);
}
