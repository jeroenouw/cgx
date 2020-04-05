import { GitlabPath } from '../../models/path';
import { FileName } from '../../models/file';
import { defaultTemplate } from '../default/default.template';

export function mergeRequest() {
    const fileName = FileName.MERGE_REQUEST;
    const hasPath = true;
    const filePath = GitlabPath.MERGE_REQUEST_TEMPLATE;

    const fileContent = (): string => {
        return `# What does this implement/fix? Explain your changes.
…

## Does this close any currently open issues?
…


## Any relevant logs, error output, etc?
(Please put this in a code block, so it is more readable for reviewers )

## Any other comments?
...

## Where has this been tested?
**Browsers:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] IE 11
- [ ] Edge
- [ ] Opera
        `;
    }

    return defaultTemplate(fileName, fileContent(), hasPath, filePath);
}
