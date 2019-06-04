import fs from 'fs-extra';

import { injectable, inject } from 'inversify';
import { Logger } from '../utils/logger';
import { Checker } from '../utils/checker';

@injectable()
export class Contributing {
    constructor(@inject('Logger') private logger: Logger,
                @inject('Checker') private checker: Checker) {}

    public generateContributing(): void {
        const fileName = 'CONTRIBUTING.md';
        this.logger.showStartGenerating(fileName);

        const check = this.checker.checkExistence(`/${fileName}`)
        if (!check) {
            const filepath: string = process.cwd() + `/${fileName}`;
            const fileContent: string = this.fileContent();

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
