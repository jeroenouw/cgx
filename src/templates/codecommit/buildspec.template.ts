import { FileName } from '../../models/file';
import { defaultTemplate } from '../default/default.template';

export function buildspec() {
    const fileName = FileName.BUILDSPEC;

    const fileContent = (): string => {
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

    return defaultTemplate(fileName, fileContent());
}
