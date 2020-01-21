import { injectable, inject } from 'inversify';
import { DefaultTemplate } from '../default/default.template';
import { FileName } from '../../models/file';

@injectable()
export class Buildspec {
    private fileName = FileName.BUILDSPEC;

    constructor(@inject('DefaultTemplate') private defaultTemplate: DefaultTemplate) {}

    public generateFile(): void {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent());
    } 

    private fileContent(): string {
        return `# Do not change version. This is the version of AWS buildspec, not the version of your buildspec file.
version: 0.2

phases:
    install:
    runtime-versions:
        nodejs: 10  
    commands:
        - echo Installing Mocha...
        - npm install -g mocha
    pre_build:
    commands:
        - echo Installing source NPM dependencies...
        - npm install
        - npm install unit.js
    build:
    commands:
        - echo Build started on 'date'
        - echo Compiling the Node.js code
        - mocha test.js
    post_build:
    commands:
        - echo Build completed on 'date'
# Include only the files required for your application to run.
# Do not use recursively include artifacts from node_modules directory as it will include unnecessary packages 
# used only for building and testing.
# ExpressJS apps will need other artifact directories included (bin/*, public/*, routes/*, views/* etc).
artifacts:
    files:
    - app.js
    - index.html
    - package.json
    - node_modules/async/*
    - node_modules/lodash/*
        
        `;
     }
}
