import { injectable, inject } from 'inversify';
import { DefaultTemplate, GenerateFile } from '../default/default.template';

@injectable()
export class Contributing implements GenerateFile {
    private fileName = 'CONTRIBUTING.md';

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