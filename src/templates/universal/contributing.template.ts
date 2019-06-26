import { injectable, inject } from 'inversify';
import { DefaultTemplate } from '../default/default.template';
import { FileName } from '../../models/file';

@injectable()
export class Contributing {
    private fileName = FileName.CONTRIBUTING;

    constructor(@inject('DefaultTemplate') private defaultTemplate: DefaultTemplate) {}

    public generateFile(): void {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent());
    }

    private fileContent(): string {
        return `## Contributing

First fork this project.  

* git clone <your-forked-repo>
* npm install

* git checkout -b my-fix

#### fix some code...

* git commit -m "added this feature"
* git push origin my-fix

Lastly, open a pull request on Github.`;
     }
}