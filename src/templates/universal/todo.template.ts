import { injectable, inject } from 'inversify';
import { DefaultTemplate } from '../default/default.template';
import { FileName } from '../../models/file';

@injectable()
export class ToDo {
    private fileName = FileName.TODO;

    constructor(@inject('DefaultTemplate') private defaultTemplate: DefaultTemplate) {}

    public generateFile(): void {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent());
    }

    private fileContent(): string {
        return `### TODO

---

- [x] Add the README.md file in the root of your project.
- [ ] My next todo...
- [ ] Another todo...`;
     }
}